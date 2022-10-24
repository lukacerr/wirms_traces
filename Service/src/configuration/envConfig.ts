import dotenv from 'dotenv';

// * DOTENV init
dotenv.config();

// * Default export: get env var
export default (s: string) => process.env[s as keyof NodeJS.ProcessEnv];
