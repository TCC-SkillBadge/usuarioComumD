import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import * as fs from 'fs';

dotenv.config();

const { HOST, USER, PASSWORD, DATABASE, PORT_DATABASE_CONNECTION, SSL } = process.env;

export const sequelize = new Sequelize({
  database: DATABASE,
  username: USER,
  password: PASSWORD,
  host: HOST,
  port: Number(PORT_DATABASE_CONNECTION),
  dialect: 'mysql',
  dialectOptions: {
    ssl: {
      rejectUnauthorized: true,
      ca: fs.readFileSync('./src/certificates/ca.pem').toString()
    }
  }
});

export const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
};
