// src/controllers/userController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getUserByEmail, createUser, getUserById, updateUserById } from '../dao/userDao';
import { getBadgesByUserEmail } from '../dao/badgeDao';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, fullName, occupation, country, phoneNumber } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser({ email, password: hashedPassword, fullName, occupation, country, phoneNumber });
    res.status(201).json(user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET as string, { expiresIn: process.env.JWT_EXPIRATION });
    res.json({ token, tipoUsuario: 'UC' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
};

export const getUserInfo = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user || typeof req.user === 'string') {
      throw new Error('User not authenticated');
    }

    const email = (req.user as jwt.JwtPayload).email as string;
    const user = await getUserById(email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
      email: user.email,
      fullName: user.fullName,
      occupation: user.occupation,
      country: user.country,
      phoneNumber: user.phoneNumber,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
};

export const getUserBadgesController = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string;
    const badges = await getBadgesByUserEmail(email);
    res.json(badges);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
};

export const updateUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user || typeof req.user === 'string') {
      throw new Error('User not authenticated');
    }

    const email = (req.user as jwt.JwtPayload).email as string;
    const { fullName, occupation, country, phoneNumber } = req.body;

    const user = await getUserById(email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const updatedUser = await updateUserById(email, { fullName, occupation, country, phoneNumber });
    res.json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
};
