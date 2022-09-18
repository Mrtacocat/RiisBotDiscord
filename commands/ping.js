const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    run: async ({interaction}) => {
        let embed = new EmbedBuilder()
        
        embed
        .setColor(0xE37800)
        .setTitle(`pong!`)
        .setTimestamp(new Date())
        
    await interaction.editReply({
        embed: [embed]
    });

    },
};