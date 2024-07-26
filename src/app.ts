// src/app.ts
import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import { connectToDatabase } from './config/database';  // Importação corrigida
import { errorHandler } from './middleware/errorHandler';
import routes from './routes';

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', routes);

// Middleware de tratamento de erros
app.use(errorHandler);

app.listen(PORT, async () => {
  await connectToDatabase();
  console.log(`Servidor rodando na porta ${PORT}`);
});
