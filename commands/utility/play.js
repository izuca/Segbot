const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, StreamType } = require('@discordjs/voice');
const { useMainPlayer } = require('discord-player');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Toca uma música do YouTube.')
        .addStringOption(option =>
            option
                .setName('url')
                .setDescription('A URL Música a ser tocada')
                .setRequired(true)),
    async execute(interaction) {
        const url = interaction.options.getString('url');
        const player = useMainPlayer();
       

        const voiceChannel = interaction.member.voice.channel;
        if (!voiceChannel) {
            return interaction.reply({ content: 'Entra em um canal antes de pedir a música, burro!'});
        }
        
        // Check if the bot is already playing in a different voice channel
        if (interaction.guild.members.me.voice.channel && interaction.guild.members.me.voice.channel !== voiceChannel) {
            return interaction.reply('Já tô tocando em outro canal.');
        }
        
        // Check if the bot has permission to join the voice channel
        if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.Connect)) {
            return interaction.reply('Aqui eu não entro!');
        }
        
        // Check if the bot has permission to speak in the voice channel
        if (!interaction.guild.members.me.permissionsIn(voiceChannel).has(PermissionsBitField.Flags.Speak)) {
            return interaction.reply('Me censuraram!');
        }
        try {
            // Play the song in the voice channel
            const result = await player.play(voiceChannel, url, {
                nodeOptions: {
                    metadata: { channel: interaction.channel }, // Store text channel as metadata on the queue
                },
            });
   
            // Reply to the user that the song has been added to the queue         
            await interaction.reply({ content: `${result.track.title} foi adicionado à fila!`});
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Mano deu merda aqui'});
        }
    },
};