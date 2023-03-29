const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('testcommand')
		.setDescription('Test command')
		.setDMPermission(false),
	async execute(interaction) {
		await interaction.deferReply();

		const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('primary')
					.setLabel('Upscale')
					.setStyle(ButtonStyle.Primary),
			);

		await interaction.editReply({ content: 'Test command', components: [row] });
	},
};
