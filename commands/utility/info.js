const {EmbedBuilder, SlashCommandBuilder } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
    .setName('info')
    .setDescription('Descubra mais sobre o Segurança do Grupo 2.0'),
	async execute(interaction) {
        const exampleEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('A serviço do bem-estar dos Membros do Grupo!')
            .setDescription(`Prazer ${interaction.user.username}! Sou o novo segurança do grupo e estou a seu dispor`)
            .setImage(`https://lh3.googleusercontent.com/pw/AP1GczN2GXEqFYxi8RfVHcxEWDB46G7ik37-BJ94yH4YDm2UOHCAaZEfuBLQC5v93aIkWVwTYd_6z5DSRolp0eFgCX6qFuRd8BfZpY6vkZAxGnw78zSzKvp76hwxfS4ezWv9macNSV06pxA8CtC-7UVz_cXaFg=w800-h800-s-no?authuser=0`)
            .setFooter({ text: 'Dica: jamais irrite o ADM' });
            await interaction.reply({ embeds: [exampleEmbed]});   
	}
};
