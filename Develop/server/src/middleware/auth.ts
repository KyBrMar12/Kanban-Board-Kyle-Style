import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface JwtPayload {
  id: number;
  username: string;
}

// Middleware to authenticate JWT token
export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.warn('⚠️ Unauthorized request: No token provided');
    res.status(401).json({ message: 'Unauthorized: No token provided' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as JwtPayload;
    req.body.user = { id: decoded.id, username: decoded.username };
    console.log('✅ Token Verified for user:', decoded.username);
    next();
    return;
  } catch (error) {
    console.error('❌ Invalid token:', error);
    res.status(403).json({ message: 'Forbidden: Invalid or expired token' });
    return;
  }
};

// Function to generate a new JWT token for a user
export const generateToken = (user: { id: number; username: string }): string => {
  return jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET_KEY as string,
    { expiresIn: '1h' }
  );
};
