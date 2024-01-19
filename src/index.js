import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import {
  TOKEN,
  __dirname,
  commandsPath,
  commandFiles,
  eventsPath,
  eventFiles,
} from './const.js';
import {
  Client,
  Collection,
  /* Events, */ GatewayIntentBits,
} from 'discord.js';

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.commands = new Collection();

commandFiles.forEach(async (file) => {
  const filePath = join('file:', commandsPath, file);
  const { default: command } = await import(filePath);
  // Set a new item in the Collection with the key as the command name and the value as the exported module
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(
      `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
    );
  }
});

for (const file of eventFiles) {
  const filePath = join('file:', eventsPath, file);
  const { default: event } = await import(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

client.login(TOKEN);
