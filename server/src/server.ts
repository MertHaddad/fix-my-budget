import app from './app';
import dotenv from 'dotenv';
import logger from './config/logger';
import { sequelize } from './config/db-config';

dotenv.config();
const port = process.env.PORT || 8181;

(async () => {
  await sequelize
    .sync({ force: true })
    .then(() => {
      logger.info('Database connected');
    })
    .catch((err) => {
      logger.error('Database connection error', err);
    });

  app.listen(port, () => {
    logger.info(
      `Starting Fix My Budget Server on port ${port} ${new Date().toLocaleString()}`
    );
  });
})();
