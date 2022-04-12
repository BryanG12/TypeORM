import { DataSource } from 'typeorm';
import { User } from './entities/User';
import dotenv from "dotenv"


dotenv.config()

export const AppDateSource = new DataSource({
  type: 'postgres',
  host: process.env.CONNECTION_TYPEORM_HOST,
  username: process.env.CONNECTION_TYPEORM_USERNAME,
  password: process.env.CONNECTION_TYPEORM_PASSWORD,
  port: Number(process.env.CONNECTION_TYPEORM_PORT),
  database: process.env.CONNECTION_TYPEORM_DATABASE,
  entities: [User],
  logging: true,
  synchronize: true,
})