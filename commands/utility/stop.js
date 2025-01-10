const { SlashCommandBuilder } = require('discord.js');
const { useQueue } = require('discord-player');
 
module.exports = {
   data: new SlashCommandBuilder()
    .setName('stop') 
    .setDescription('Para de tocar música.'),
    
   async execute(interaction) {
        // Get the current queue
        const queue = useQueue();
        
        if (!queue) {
            return interaction.reply('Nem tem fila pra parar de tocar música.');
        }
        
        //Stop the music
        queue.stop;
        
        // Send a confirmation message
        return interaction.reply('Parei de tocar.');
    }
};