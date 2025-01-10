const { Events } = require('discord.js');
const { useMainPlayer } = require('discord-player')
module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		const player = useMainPlayer();
		console.log(`Ready! Logged in as ${client.user.tag}`);

		client.user.setActivity('administrando o grupo 🦧');

		console.log(player.scanDeps());

		player.on('debug',console.log);
		player.events.on('debug', (queue, message) => console.log(`[DEBUG ${queue.guild.id}] ${message}`)); 
	},
};