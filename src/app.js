import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import { API_PREFIX, TOKEN } from './const.js';
import { Client, GatewayIntentBits, REST, Routes } from 'discord.js';

const app = express();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: false }));

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (msg) => {
  console.log(`Logged in as ${client.user.id}!`);
  var userID = `PONG as ${client.user.id}! This is where you create Custom Logic add user interact with DB and other features you want your Bot to Have. To Customize the PRJ download Code Customize it and Deploy it to Cloud`;

  if (msg.content === 'ping') {
    msg.reply(userID);
  }

  if (msg.content === 'Create Insta Post') {
    msg.reply(
      'Now my Dope Container will fetch Thangz and Do Cool Dope THings' + ip
    );
  }
});

client.login(TOKEN);

app.use(API_PREFIX, routes);

export default app;
