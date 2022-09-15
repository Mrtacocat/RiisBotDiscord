const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

const profileEmbed = {
    "type": "rich",
    "color": 0x00fff0,
    //"title": `${interaction.user.username}'s Profile`
    "image":  { name: `${interaction.user.username}'s Profile` },
                
}


module.exports = {
    data: new SlashCommandBuilder()
        .setName('profile')
        .setDescription('Replies with your profile!'),
    async execute(interaction) {
        await interaction.reply({embeds: [profileEmbed]});
    },
};
