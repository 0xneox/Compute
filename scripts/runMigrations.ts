
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from '../src/config/logger';

dotenv.config();

const runMigrations = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    logger.info('Connected to MongoDB');

    // Add your migration logic here
    // For example:
    // await db.collection('users').updateMany({}, { $set: { newField: 'defaultValue' } });

    logger.info('Migrations completed successfully');
  } catch (error) {
    logger.error('Error running migrations:', error);
  } finally {
    await mongoose.connection.close();
  }
};

runMigrations();