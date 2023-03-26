const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const { Configuration, OpenAIApi } = require('openai');
const { gptAPI, orgAPI } = require('../config.json');

const configuration = new Configuration({
	organization: orgAPI,
	apiKey: gptAPI,
});

const openai = new OpenAIApi(configuration);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('image-generate')
		.setDescription('Generate an image with GPT-3')
		.addStringOption(option => option.setName('prompt').setDescription('Prompt to send to GPT-3').setRequired(true))
		.setDMPermission(false),
	async execute(interaction) {
		await interaction.deferReply();

		const prompt = interaction.options.getString('prompt');

		try {
			const response = await openai.createImage({
				prompt: `${prompt}`,
				n: 1,
				size: '1024x1024',
			});

			const image = response.data.data[0].url;

			const embed = new EmbedBuilder();
			embed.setTitle(`Here's your image of a \`\`\`${prompt}\`\`\``);
			embed.setImage(image);
			embed.setTimestamp();
			embed.setFooter({ text: 'Bot developed by MrTacoCat#6868' });

			await interaction.editReply({ embeds: [embed] });
		}
		catch (e) {
			console.log(e);
			if (e.response.status == 400) {
				return await interaction.editReply({ content: 'Response failed: The prompt was too long. Please shorten it.' });
			}
			return await interaction.editReply({ content: 'Response failed:' + e.response });
		}
	},
};

