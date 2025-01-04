const { SlashCommandBuilder } = require('discord.js');
const { useQueue } = require('discord-player');
 
module.exports = {
    data: new SlashCommandBuilder()
      .setName('tocando') // Command name
      .setDescription('Mostra o som tocando agora.'), // Command description
    async execute(interaction) {
      // Get the current queue
      const queue = useQueue();

      if (!queue) {
        return interaction.reply('Tem nadica de nada tocando.');
      }
      console.log(queue);
      // Get the currently playing song
      const currentSong = queue.currentTrack;
     
      // Check if there is a song playing
      if (!currentSong) {
        return interaction.reply('Sem som tocando.');
      }
     
      // Send the currently playing song information
      return interaction.reply(`Tô tocando: ${currentSong.name}, que merda de som hein!`);
    }
};
