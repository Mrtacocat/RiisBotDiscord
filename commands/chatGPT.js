const { gptAPI, orgAPI } = require('../config.json');
const { Configuration, OpenAIApi } = require('openai');
const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('@discordjs/builders');

const configuration = new Configuration({
	organization: orgAPI,
	apiKey: gptAPI,
});

const openai = new OpenAIApi(configuration);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('chatgpt')
		.setDescription('Chat with GPT-3')
		.addStringOption(option => option.setName('question').setDescription('Message to send to GPT-3').setRequired(true))
		.setDMPermission(false),
	async execute(interaction) {
		await interaction.deferReply();

		const question = interaction.options.getString('question');


		try {
			const response = await openai.createCompletion({
				model: 'text-davinci-003',
				max_tokens: 2048,
				temperature: 0.5,
				prompt: question,
			// eslint-disable-next-line semi
			})

			const embed = new EmbedBuilder();
			// eslint-disable-next-line semi
			embed.setDescription(`\`\`\`${response.data.choices[0].text}\`\`\``)

			await interaction.editReply({ embeds: [embed] });
		}
		catch (e) {
			console.log(e);
			return await interaction.editReply({ content: 'Response failed:' + e.response });
		}
	},
};
