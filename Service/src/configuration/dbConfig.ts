import mongoose, { ConnectOptions } from 'mongoose';
import envConfig from 'configuration/envConfig';

export const MONGO_CONFIG: ConnectOptions = {};

export const CONNECTION_STRING = envConfig('CUSTOM_CONNECTION_STRING')
  ?? 'mongodb+srv://'
    + `${envConfig('DB_USER')}:${envConfig('DB_PASSWORD')}`
    + `@${envConfig('DB_CLUSTER')}.mongodb.net`
    + `/${envConfig('DB_ENVIRONMENT')}`
    + `?${envConfig('DB_SETTINGS')}`;

export default mongoose;
