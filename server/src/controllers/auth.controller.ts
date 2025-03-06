import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.model';

// Register a new user
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, grade } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = new User({
      name,
      email,
      password,
      grade,
    });

    // Save user to database
    await user.save();

    // Generate JWT token
    const jwtSecret = process.env.JWT_SECRET || 'your_super_secret_key_change_in_production';
    const token = jwt.sign(
      { userId: user._id, name: user.name, email: user.email },
      jwtSecret,
      { expiresIn: '30d' }
    );

    // Return token and user (without password)
    const userWithoutPassword = {
      _id: user._id,
      name: user.name,
      email: user.email,
      grade: user.grade,
    };

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// Login user
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const jwtSecret = process.env.JWT_SECRET || 'your_super_secret_key_change_in_production';
    const token = jwt.sign(
      { userId: user._id, name: user.name, email: user.email },
      jwtSecret,
      { expiresIn: '30d' }
    );

    // Return token and user (without password)
    const userWithoutPassword = {
      _id: user._id,
      name: user.name,
      email: user.email,
      grade: user.grade,
    };

    res.json({
      message: 'Login successful',
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// Verify token
export const verifyToken = (req: Request, res: Response) => {
  // If we've reached this point, the auth middleware has already verified the token
  res.json({ isValid: true, user: req.user });
}; 