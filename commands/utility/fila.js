const { SlashCommandBuilder } = require('discord.js');
const { useQueue, useTimeline } = require('discord-player');
 
module.exports = {
    data: new SlashCommandBuilder()
      .setName('fila') // Command name
      .setDescription('Mostra a fila de músicas.'), // Command description
    async execute(interaction) {
        const queue = useQueue();
        const timeline = useTimeline();

        if (!queue) {
          return interaction.reply('Não tem fila ativa.');
        }
       
        // Get the current track
        const currentTrack = timeline.track;
        
        // Get the upcoming tracks
        const upcomingTracks = queue.tracks.data.slice(0, 5);
        
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