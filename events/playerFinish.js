const { GuildQueueEvent } = require('discord-player');

module.exports = {
	name: GuildQueueEvent.PlayerFinish,
	async execute(queue, track) {
		 // Get the metadata stored on the queue
         const { channel } = queue.metadata;
         // Send a message to the channel
         await channel.send(`Cabei de tocar ${track.title}`);
	},
};