import 'dotenv/config';
import chalk from 'chalk';
import mongoose from 'mongoose';
import Logger from '../utils/winston.utils';
import Status from '../utils/status-codes-messages.utils';

export default class Database {
  public static init() {
    const mongoURI: string = process.env.MONGODB_URI
      ? process.env.MONGODB_URI
      : 'mongodb://127.0.0.1:27017/boilerdatabase';
    mongoose.set('strictQuery', false);
    mongoose.connect(mongoURI);

    // Listen for MongoDB connection events
    mongoose.connection.on('connected', () => {
      Logger.info('MongoDB Connect: ' + Status.DB_LOGS.DB_CONNECTED_SYNC_SUCCESS_MSG);
      console.log(chalk.green.bold('Server successfully connected with MongoDB!'));
    });

    mongoose.connection.on('error', (err) => {
      console.log(chalk.red.bold('MongoDB connection disconnected due to network issue'));
      Logger.error('MongoDB connection disconnected due to network issue');
    });

    mongoose.connection.on('disconnected', () => {
      console.log(chalk.red.bold('Server not connected with MongoDB!'));
      Logger.error('MongoDB Disconnect: ' + Status.DB_LOGS.DB_NOT_CONNECTED_MSG);
    });
  }
}
