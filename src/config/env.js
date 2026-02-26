import dotenv from 'dotenv';
import path from 'path';

// Declaração para utilizar a vairável de ambiente, mas caso ela não seja definida, realiza fallback e utiliza o valor 'development' por padrão
const envFile = `.env.${process.env.NODE_ENV || 'development'}`;

dotenv.config({
  path: path.resolve(process.cwd(), envFile)
});

export const env = process.env.NODE_ENV;

export const dbConfig = {
  client: process.env.DB_CLIENT,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  name: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
};