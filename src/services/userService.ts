import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { getUserByEmail, createUser, getUserById } from '../dao/userDao';
import { getBadgesByUserEmail } from '../dao/badgeDao';
import axios from 'axios';

export const register = async (userData: any) => {
  const { email, password, fullName, occupation, country } = userData;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await createUser({ email, password: hashedPassword, fullName, occupation, country });
  return user;
};

export const login = async (loginData: any) => {
  const { email, password } = loginData;
  const user = await getUserByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid credentials');
  }
  const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET as string, { expiresIn: process.env.JWT_EXPIRATION });
  return token;
};

export const getInfo = async (email: string) => {
  const user = await getUserById(email);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

export const getUserBadges = async (email: string) => {
  return await getBadgesByUserEmail(email);
};

export const getUserSkills = async (email: string) => {
  const response = await axios.get(`http://skills-service/api/skills?email=${email}`);
  return response.data;
};
