const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

function profileEmbed(interaction)  {
    return{
        "type": "rich",
        "color": 0xE37800,
        "title": `${interaction.user.username}'s Profile`,
        "description": `User info:`,
        "thumbnail": {url: 'https://cdn2.iconfinder.com/data/icons/walle/256/my_computer.png'},
        "fields": [ { name: 'Username', value: `${interaction.user.username}`, inline: true },
                    { name: 'Discriminator', value: `${interaction.user.discriminator}`, inline: true },
                    { name: 'ID', value: `${interaction.user.id}`, inline: true },
                    { name: 'Bot', value: `${interaction.user.bot}`, inline: true },
                    { name: 'Avatar', value: `${interaction.user.displayAvatarURL({ dynamic: true })}`, inline: true },
                    { name: 'Created at', value: `${interaction.user.createdAt}`, inline: true },
                    { name: 'Joined at', value: `${interaction.member.joinedAt}`, inline: true },
                    //{ name: 'Status', value: `${interaction.user.presence.status}`, inline: true },
                    //{ name: 'Activity', value: `${interaction.user.presence.activities[0]}`, inline: true },
                    { name: 'Roles', value: `${interaction.member.roles.cache.map(role => role.toString()).join(' ')}`, inline: true },
                    { name: '\u200B', value: '\u200B' },
                    { name: 'Version', value: '1.0.0', inline: true },
                    { name: 'Language', value: 'JavaScript', inline: true },
                    { name: 'Framework', value: 'Discord.js', inline: true }],
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
