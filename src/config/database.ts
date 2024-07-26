// src/config/database.ts
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const {
  HOST,
  USER,
  PASSWORD,
  DATABASE,
  PORT_DATABASE_CONNECTION,
  SSL
} = process.env;

const sequelize = new Sequelize(
  DATABASE as string,
  USER as string,
  PASSWORD as string,
  {
    host: HOST,
    port: Number(PORT_DATABASE_CONNECTION),
    dialect: 'mysql',
    dialectOptions: SSL === 'REQUIRED' ? {
      ssl: {
        rejectUnauthorized: false, // Aceita certificados autoassinados
      }
    } : {},
  }
);

export default sequelize;

export const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
};
