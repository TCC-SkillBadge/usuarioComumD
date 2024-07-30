import { Request, Response } from 'express';
import { register, login, getInfo, getUserBadges } from '../services/userService';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const user = await register(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const token = await login(req.body);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in user', error });
  }
};

export const getUserInfo = async (req: Request, res: Response) => {
  try {
    const userInfo = await getInfo(req.query.email as string);
    res.status(200).json(userInfo);
  } catch (error) {
    res.status(500).json({ message: 'Error getting user info', error });
  }
};

export const getUserBadgesController = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string;
    console.log(`Recebida requisição para obter badges do usuário: ${email}`);
    const badges = await getUserBadges(email);
    res.status(200).json(badges);
  } catch (error) {
    console.error('Erro no getUserBadgesController:', error);
    res.status(500).json({ message: 'Error getting user badges', error });
  }
};
