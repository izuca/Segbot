const { GuildQueueEvent } = require('discord-player');

module.exports = {
	name: GuildQueueEvent.PlayerStart,
	async execute(queue, track) {
		 // Get the metadata stored on the queue
         const { channel } = queue.metadata;
         // Send a message to the channel
         await channel.send(`Tocando: ${track.title}`);
	},
};