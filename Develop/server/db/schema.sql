-- Create the users table if it does not exist
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the tickets table if it does not exist
CREATE TABLE IF NOT EXISTS tickets (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    status VARCHAR(255) NOT NULL CHECK (status IN ('To Do', 'In Progress', 'Done')),
    description TEXT NOT NULL,
    assignedUserId INTEGER REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create an index for faster lookups on tickets
CREATE INDEX IF NOT EXISTS idx_tickets_status ON tickets(status);

-- Create an index for faster user lookup by username
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);

-- Seed a test user (if needed, ensure the password is already hashed)
-- To insert a hashed password, use bcrypt in Node.js:
-- node -e "console.log(require('bcrypt').hashSync('testpassword', 10))"

INSERT INTO users (username, password)
VALUES ('testuser', '$2b$10$.tJ8WiCYQhHxT9svr0nqdupAI1DYuke2xNFGZ7FrYjDV9/BzKzjgq')
ON CONFLICT (username) DO NOTHING;
