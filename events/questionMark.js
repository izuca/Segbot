const { Events } = require('discord.js');

module.exports = {
	name: Events.MessageCreate,
	execute(message) {
        if (message.content === '?' && !message.author.bot) 
            message.reply('??');
	},
};