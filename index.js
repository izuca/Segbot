// Require the necessary discord.js classes
require('dotenv').config()
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { Player } = require('discord-player');
const { YoutubeiExtractor } = require("discord-player-youtubei");
const { GuildQueueEvent } = require( 'discord-player');
const token = process.env.DISCORD_TOKEN
const fs = require('node:fs');
const path = require('node:path');

// Create a new client instance
const client = new Client({ intents:[
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.MessageContent,
	GatewayIntentBits.GuildVoiceStates
]});

// Initialize the Player
const player = new Player(client);

// Load the extractors
async function loadExtractors() {
    // await player.extractors.loadDefault();
	await player.extractors.register(YoutubeiExtractor, {});
}

// Call the function to load extractors
loadExtractors().catch(console.error);

// Reading Commans Folder
client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

// Reading Events Folder
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// Handle the event when a track starts playing
player.events.on(GuildQueueEvent.PlayerStart, async (queue, track) => {
  // Get the metadata stored on the queue
  const { channel } = queue.metadata;
  // Send a message to the channel
  await channel.send(`Tocando: ${track.title}`);
});
 
// Handle the event when a track finishes playing
player.events.on(GuildQueueEvent.PlayerFinish, async (queue, track) => {
  // Get the metadata stored on the queue
  const { channel } = queue.metadata;
  // Send a message to the channel
  await channel.send(`Cabei de Tocar ${track.title}`);
});

// Log in to Discord with your client's token
client.login(token);
