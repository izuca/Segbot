const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');
const ytdl = require('ytdl-core');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Toca uma música do YouTube.')
        .addStringOption(option =>
            option
                .setName('url')
                .setDescription('A URL do vídeo do YouTube')
                .setRequired(true)),
    async execute(interaction) {
        const url = interaction.options.getString('url');

        // Verifica se a URL é válida
        if (!ytdl.validateURL(url)) {
            return interaction.reply({ content: 'Coloca uma URL de verdade, por favor!'});
        }

        const voiceChannel = interaction.member.voice.channel;
        if (!voiceChannel) {
            return interaction.reply({ content: 'Entra em um canal antes de pedir a música, burro!'});
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
            await interaction.reply(`🎵 Tocando agora: ${url}`);
        } catch (error) {
            console.error(error);
            interaction.reply({ content: 'Mano deu merda aqui'});
        }
    },
};