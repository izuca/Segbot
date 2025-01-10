const { SlashCommandBuilder } = require('discord.js');
const { useQueue } = require('discord-player');
 
module.exports = {
    data: new SlashCommandBuilder()
      .setName('fila') // Command name
      .setDescription('Mostra a fila de músicas.'), // Command description
    async execute(interaction) {
        const queue = useQueue();
 
        if (!queue) {
          return interaction.reply('Não tem fila ativa.');
        }
       
        // Get the current track
        const currentTrack = queue.current;
       
        // Get the upcoming tracks
        const upcomingTracks = queue.tracks.slice(0, 5);
       
        // Create a message with the current track and upcoming tracks
        const message = [
          `**Tocando agora:** ${currentTrack.title} - ${currentTrack.author}`,
          '',
          '**Próximas músicas:**',
          ...upcomingTracks.map((track, index) => `${index + 1}. ${track.title} - ${track.author}`),
        ].join('\n');
       
        // Send the message
        return interaction.reply(message);
    }
};