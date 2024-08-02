import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getUserByEmail, updateUserById } from '../dao/userDao';
import { sendPasswordResetEmail } from '../services/emailService';

export const requestPasswordReset = async (req: Request, res: Response) => {
  const { email } = req.body;
  
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const resetToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    const resetLink = `http://localhost:${process.env.FRONTEND_PORT}/reset-password/${resetToken}`;

    // Enviar o e-mail de redefinição de senha
    await sendPasswordResetEmail(email, resetLink);

    res.json({ message: 'Password reset email sent' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;
    const email = decoded.email;
    
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await updateUserById(email, { password: hashedPassword });

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
};
