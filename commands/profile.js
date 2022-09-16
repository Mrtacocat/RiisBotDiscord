const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

function profileEmbed(interaction)  {
    return{
        "type": "rich",
        "color": 0xE37800,
        "title": `${interaction.user.username}'s Profile`,
        "description": `User info:`,
        "thumbnail": {url: `${interaction.user.displayAvatarURL({ dynamic: true })}`},
        "fields": [ { name: 'Username', value: `${interaction.user.username}`, inline: true },
                    { name: 'Created at', value: `${interaction.user.createdAt}`, inline: true },
                    { name: 'Joined at', value: `${interaction.member.joinedAt}`, inline: true },
                    //{ name: 'Status', value: `${interaction.user.presence.status}`, inline: true },
                    //{ name: 'Activity', value: `${interaction.user.presence.activities[0]}`, inline: true },
                    { name: 'Roles', value: `${interaction.member.roles.cache.map(role => role.toString()).join(' ')}`}],
        "timestamp": new Date(),
        "footer": { text: 'Developed by MrTacoCat#6868', iconURL: 'https://cdn.discordapp.com/avatars/182532419335749632/fca1851401444b5a29aacab533bb64fc.webp' }
    

    }               
}


module.exports = {
    data: new SlashCommandBuilder()
        .setName('profile')
        .setDescription('Replies with your profile!'),
    async execute(interaction) {
        await interaction.reply({embeds: [profileEmbed(interaction)]})
    },
};
