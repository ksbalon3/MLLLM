const Discord = require('discord.js');
const noblox = require('noblox.js');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Print environment variables to verify they are loaded correctly
console.log('DISCORD_TOKEN:', process.env.DISCORD_TOKEN);
console.log('ROBLOX_COOKIE:', process.env.ROBLOX_COOKIE);

const client = new Discord.Client();
const token = process.env.DISCORD_TOKEN;
const robloxCookie = process.env.ROBLOX_COOKIE;

if (!token || !robloxCookie) {
  console.error('Missing DISCORD_TOKEN or ROBLOX_COOKIE in environment variables.');
  process.exit(1);
}

client.once('ready', () => {
  console.log('Discord bot is online!');
  noblox.setCookie(robloxCookie)
    .then(() => {
      console.log('Logged into Roblox!');
    })
    .catch(console.error);
});

client.on('message', async message => {
  if (message.content === '!userinfo') {
    try {
      const robloxUser = await noblox.getPlayerInfo({ userId: message.author.id });
      message.channel.send(`Roblox Username: ${robloxUser.username}\nRoblox ID: ${robloxUser.userId}`);
    } catch (error) {
      console.error('Failed to fetch Roblox user info:', error);
      message.channel.send('Failed to fetch Roblox user info.');
    }
  }
});

client.login(token)
  .catch(error => {
    console.error('Failed to login to Discord:', error);
    process.exit(1);
  });