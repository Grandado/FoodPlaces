import { REST, Routes } from 'discord.js';
import {
  TOKEN,
  CLIENT_ID,
  GUILD_ID,
  __dirname,
  commandsPath,
  commandFiles,
} from '../const.js';
import { join } from 'node:path';

const commands = [];

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
commandFiles.forEach(async (file) => {
  const filePath = join('file:', commandsPath, file);
  const { default: command } = await import(filePath);
  if ('data' in command && 'execute' in command) {
    commands.push(command.data.toJSON());
  } else {
    console.log(
      `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
    );
  }
});

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(TOKEN);

rest
  .put(Routes.applicationCommands(CLIENT_ID), { body: [] })
  .then(console.log('Successfully deleted all application commands.'))
  .then(async () => {
    try {
      console.log(
        `Started refreshing ${commands.length} application (/) commands.`
      );
      const data = await rest.put(Routes.applicationCommands(CLIENT_ID), {
        body: commands,
      });
      console.log(
        `Successfully reloaded ${data.length} application (/) commands.`
      );
    } catch (error) {
      console.error(error);
    }
  })
  .catch(console.error);

// and deploy your commands!
/* (async () => {
  try {
    try {
      // delete all existing commands before deploying new ones,
      await rest.put(Routes.applicationCommands(CLIENT_ID), { body: [] });
      console.log('Successfully deleted all application commands.');
    } catch (error) {
      throw error;
    }

    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    // The put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(Routes.applicationCommands(CLIENT_ID), {
      body: commands,
    });

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
})(); */
