import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();

// Function to handle user login
export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    console.log('🔍 Login Attempt:', username); // Debugging

    // Check if the user exists
    const user = await User.findOne({ where: { username } });

    if (!user) {
      console.warn('⚠️ User not found:', username);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.warn('⚠️ Incorrect password for:', username);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: '1h' }
    );

    console.log('✅ Login Successful:', username);
    return res.json({ token, user: { id: user.id, username: user.username } });

  } catch (error) {
    console.error('❌ Server Error During Login:', error);
    return res.status(500).json({ message: 'Server error during login' });
  }
};

// POST /login - Login a user
router.post('/login', login);

export default router;
