const { SlashCommandBuilder } = require('discord.js');
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

        
        // // Verifica se a URL é válida
        // if (!ytdl.validateURL(url)) {
        //     return interaction.reply({ content: 'Coloca uma URL de verdade, por favor!'});
        // }

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
            // Conecta-se ao canal de voz
            const connection = joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: voiceChannel.guild.id,
                adapterCreator: voiceChannel.guild.voiceAdapterCreator,
            });

            // Cria o player de áudio
            const player = createAudioPlayer();

            // Cria o recurso de áudio
            const stream = ytdl(url, { filter: 'audioonly' });
            const resource = createAudioResource(stream);

            // Adiciona o recurso ao player
            player.play(resource);

            // Inscreve o player na conexão
            connection.subscribe(player);

            // Envia a resposta inicial do comando
            await interaction.reply({ content: `🎵 Tocando agora: ${url}`});
        } catch (error) {
            console.error(error);
            interaction.reply({ content: 'Mano deu merda aqui'});
        }
    },
};