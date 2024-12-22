
const { AttachmentBuilder,EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const getRandomImage = require('../../random-image')
let typeImage = 0;

// inside a command, event listener, etc.
module.exports = {
    data: new SlashCommandBuilder()
    .setName('adm')
    .setDescription('Saiba quem é o ADM'),
	async execute(interaction) {
        const selectedImage = getRandomImage();
        if(!selectedImage.endsWith('.gif')){
            const image = new AttachmentBuilder(selectedImage);
            const attachedImage = `attachment://${image}`;  // não esta sendo definido no setImage
            typeImage = 1;
        } 
        const exampleEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Quem é o ADM Izuca?')
            .setDescription(`Caro ${interaction.user.username}, aqui está um exemplo de quem é o ADM Izuca 🦧`)
            .setImage(`${typeImage === 0 ? selectedImage : attachedImage}`)
            .setFooter({ text: 'A deidade do grupo, muito piedoso' });
        await interaction.reply({ embeds: [exampleEmbed], file: [image] });
	},
};
