const { Events, MessageFlags } = require('discord.js');
const { useMainPlayer } = require('@discord-player');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);
		const player = useMainPlayer();
		const data = {
			guild: interaction.guild,
		};

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		try {
			await player.context.provide(data, () => command.execute(interaction)); 
			// await command.execute(interaction);
		} catch (error) {
			console.error(error);
			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({ content: 'Fala Português, Alienígena FDP!', flags: MessageFlags.Ephemeral });
			} else {
				await interaction.reply({ content: 'Fala Português, Alienígena FDP!', flags: MessageFlags.Ephemeral });
			}
		}
	},
};