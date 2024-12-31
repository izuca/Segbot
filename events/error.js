const { GuildQueueEvent } = require('discord-player');

module.exports = {
	name: GuildQueueEvent.Error,
	async execute(queue, error) {
         console.error(`Erro emitido da fila: ${error}`);
         
	},
};