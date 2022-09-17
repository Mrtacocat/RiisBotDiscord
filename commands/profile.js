const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('profile')
        .setDescription('Replies with your profile!'),
        
    run: async ({interaction}) => {
        let embed = new EmbedBuilder()

        embed
        .setColor(0xE37800)
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
        .setTitle(`${interaction.user.username}'s Profile`)
        .setDescription(`User info:`)
        .addFields({ name: 'Username', value: `${interaction.user.username}`, inline: true },
                    { name: 'Joined at', value: `${interaction.member.joinedAt}`, inline: true },
                    { name: 'Roles', value: `${interaction.member.roles.cache.map(role => role.toString()).join(' ')}`})
        .setTimestamp(new Date())
        
        await interaction.editReply({
            embeds: [embed]
        })
    },
};
