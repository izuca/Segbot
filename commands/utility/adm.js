const {EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const getRandomImage = require('../../random-image')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('adm')
    .setDescription('Saiba quem é o ADM'),
	async execute(interaction) {
        const selectedImage = getRandomImage();
        const exampleEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Quem é o ADM Izuca?')
            .setDescription(`Caro ${interaction.user.username}, aqui está um exemplo de quem é o ADM Izuca 🦧`)
            .setImage(`${selectedImage}`)
            .setFooter({ text: 'A deidade do grupo, muito piedoso' });
            await interaction.reply({ embeds: [exampleEmbed]});   
	}
};
