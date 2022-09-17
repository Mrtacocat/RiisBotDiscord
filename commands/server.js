const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = { 
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Replies with server info!'),
    run: async ({interaction}) => {
        let embed = new EmbedBuilder()

        embed
        .setColor(0xE37800)
        .setTitle(`${interaction.guild.name}'s Info`)
        .setDescription(`Server info:`)
        .setThumbnail(interaction.guild.iconURL())
        .addFields({ name: 'Server Name', value: `${interaction.guild.name}`, inline: true },
                    { name: 'Server Member Count', value: `${interaction.guild.memberCount}`, inline: true },
                    { name: 'Server Boost Count', value: `${interaction.guild.premiumSubscriptionCount}`, inline: true },
                    { name: 'Server Boost Level', value: `${interaction.guild.premiumTier}`, inline: true },
                    { name: 'Server Created At', value: `${interaction.guild.createdAt}`, inline: true })
        .setTimestamp(new Date())

        await interaction.editReply({
            embeds: [embed]
        })
    }
}