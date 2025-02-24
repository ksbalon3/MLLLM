const { Client, GatewayIntentBits } = require('discord.js');
const noblox = require('noblox.js');
require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async message => {
  if (message.content.startsWith('!roblox')) {
    const args = message.content.split(' ');
    const username = args[1];

    if (!username) {
      message.reply('Please provide a Roblox username.');
      return;
    }

    try {
      const userId = await noblox.getIdFromUsername(username);
      const userInfo = await noblox.getPlayerInfo(userId);

      message.reply(`Username: ${userInfo.username}\nDisplay Name: ${userInfo.displayName}\nStatus: ${userInfo.status}\nFriends: ${userInfo.friendCount}`);
    } catch (error) {
      message.reply('An error occurred while fetching the Roblox user information.');
      console.error(error);
    }
  }
});

client.login(process.env.DISCORD_TOKEN);

// Initialize noblox.js
noblox.setCookie(process.env.ROBLOX_COOKIE).then(() => {
  console.log('Logged into Roblox!');
}).catch(console.error);