import { Sequelize } from 'sequelize-typescript';
import { User } from '../models/user-model';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  database: 'movies',
  storage: './src/db/database.sqlite',
  models: [User],
});
