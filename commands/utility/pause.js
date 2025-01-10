const { SlashCommandBuilder } = require('discord.js');
const { useQueue, useTimeline } = require('discord-player');
 
module.exports = {
    data: new SlashCommandBuilder()
      .setName('pausa') // Command name
      .setDescription('Pausa ou resume o som.'), // Command description
    async execute(interaction) {
      // Get the current queue
      const timeline = useTimeline();
 
      if (!timeline) {
        return interaction.reply('Nem tem música tocando.');
      }
     
      // Invert the pause state
      const wasPaused = timeline.paused;
     
      wasPaused ? timeline.resume() : timeline.pause();
     
      // If the timeline was previously paused, the queue is now back to playing
      return interaction.reply(`A música está ${wasPaused ? 'tocando' : 'pausada'}.`);
    }
};
