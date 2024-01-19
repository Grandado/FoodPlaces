import { config } from 'dotenv';
import { dirname } from 'node:path';
import { fileURLToPath } from 'url';
import { join } from 'node:path';
import { readdirSync } from 'node:fs';

// Load config from .env
config();

function pathFunction(path) {
  return readdirSync(path).filter((file) => file.endsWith('.js'));
}

export const API_PREFIX = process.env.API_PREFIX || '/api';
export const TOKEN = process.env.TOKEN;
export const CLIENT_ID = process.env.CLIENT_ID;
export const GUILD_ID = process.env.GUILD_ID;
export const __dirname = dirname(fileURLToPath(import.meta.url));
export const commandsPath = join(__dirname, 'commands', 'utility');
export const commandFiles = pathFunction(commandsPath);
export const eventsPath = join(__dirname, 'events');
export const eventFiles = pathFunction(eventsPath);
