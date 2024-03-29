import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { readdirSync } from 'node:fs';
import express from 'express';
import routes from './routes/index.js';
import { API_PREFIX, TOKEN } from './const.js';
import { Client, Collection, Events, GatewayIntentBits } from 'discord.js';

const __dirname = dirname(fileURLToPath(new URL('.', import.meta.url)));

const app = express();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds /* 
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent, */,
  ],
});

client.commands = new Collection();

const foldersPath = join(__dirname, 'commands');
const commandFolders = readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = join(foldersPath, folder);
  const commandFiles = readdirSync(commandsPath).filter((file) =>
    file.endsWith('.js')
  );

  for (const file of commandFiles) {
    const filePath = join('file://', commandsPath, file);
    const { default: command } = await import(filePath);

    console.log(command);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    /* if ('data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    } */
  }
}

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: false }));

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on(Events.InteractionCreate, (interaction) => {
  console.log(interaction);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: 'There was an error while executing this command!',
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: 'There was an error while executing this command!',
        ephemeral: true,
      });
    }
  }
});

client.login(TOKEN);

app.use(API_PREFIX, routes);

export default app;
