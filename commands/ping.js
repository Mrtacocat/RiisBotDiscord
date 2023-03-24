const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		await interaction.reply({ content: 'Pong!', ephemeral: true });
		const message = await interaction.fetchReply();
		console.log(`Interaction reply fetched: ${message.content} (ID: ${message.id}) from ${message.author.tag} in ${message.channel.name} in ${message.guild.name}`);
	},
};