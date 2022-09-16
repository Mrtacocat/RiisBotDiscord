const { SlashCommandBuilder } = require('discord.js');

module.exports = { 
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Replies with server info!'),
    async execute(interaction) {
        await interaction.reply(`Server name: ${interaction.guild.name}\nTotal users: ${interaction.guild.userCount}`);
    }
}