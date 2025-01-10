const { SlashCommandBuilder } = require('discord.js');
const { useQueue } = require('discord-player');
 
module.exports = {
   data: new SlashCommandBuilder()
    .setName('skip') 
    .setDescription('Pula o som atual'),
    
   async execute(interaction) {
        // Get the current queue
        const queue = useQueue();
        
        if (!queue) {
            return interaction.reply('Nem tem fila pra pular música.');
        }
        
        if (!queue.isPlaying()) {
            return interaction.reply('Não tem música tocando.');
        }
        
        // Skip the current track
        queue.node.skip();
        
        // Send a confirmation message
        return interaction.reply('O som atual foi pulado.');
    }
};