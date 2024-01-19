import { config } from 'dotenv';
import { dirname } from 'node:path';
import { fileURLToPath } from 'url';


// Load config from .env
config();

export const API_PREFIX = process.env.API_PREFIX || '/api';
export const TOKEN = process.env.TOKEN;
export const CLIENT_ID = process.env.CLIENT_ID;
export const GUILD_ID = process.env.GUILD_ID;
export const __dirname = dirname(fileURLToPath(import.meta.url));
