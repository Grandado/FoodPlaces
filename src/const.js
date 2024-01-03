import { config } from 'dotenv';

// Load config from .env
config();

export const API_PREFIX = process.env.API_PREFIX || '/api';
export const TOKEN = process.env.TOKEN;
