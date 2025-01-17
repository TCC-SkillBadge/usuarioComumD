// src/dao/userDao.ts
import User from '../models/User';

export const getUserByEmail = async (email: string) => {
  return await User.findOne({ where: { email } });
};

export const createUser = async (userData: any) => {
  return await User.create(userData);
};

export const getUserById = async (email: string) => {
  return await User.findByPk(email);
};

export const updateUserById = async (email: string, updatedData: any) => {
  await User.update(updatedData, { where: { email } });
  return await User.findByPk(email);
};
