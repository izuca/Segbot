const { GuildQueueEvent } = require('discord-player');

module.exports = {
	name: GuildQueueEvent.PlayerError,
	async execute(queue, error) {
         console.error(`Erro emitido do player: ${error.message}`);
         
	},
};