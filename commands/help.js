const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

const infoEmbed = {
    "type": "rich",
    "color": 0x00fff0,
    "title": `WALL·E Bot Help Page`,
    "url": 'https://mrtacocat.github.io/DiscordWEB/',
    "author": { name: 'WALL·E#7061', 
                iconURL: 'https://cdn.discordapp.com/avatars/537963608022188032/57576221dbe1eead2c6eee35e5f4c876.webp', 
                url: 'https://mrtacocat.github.io/DiscordWEB/' },
    "description": `WALL·E commands:`,
    "thumbnail": {url: 'https://cdn2.iconfinder.com/data/icons/walle/256/my_computer.png'},
    "fields": [ { name: '/help', value: 'Replies with help', inline: true },
                { name: '/ping', value: 'Replies with pong!', inline: true },
                { name: '/server', value: 'Replies with server info!', inline: true },
                { name: '/profile', value: 'Replies with your profile!', inline: true },
                { name: '\u200B', value: '\u200B' },
                { name: 'Version', value: '1.0.0', inline: true },
                { name: 'Language', value: 'JavaScript', inline: true },
                { name: 'Framework', value: 'Discord.js', inline: true }],
    "image": { url: 'https://cdn.discordapp.com/attachments/88210000000000000/88210000000000000/unknown.png' },
    "timestamp": new Date(),
    "footer": { text: 'Developed by MrTacoCat#6868', iconURL: 'https://cdn.discordapp.com/avatars/182532419335749632/fca1851401444b5a29aacab533bb64fc.webp' }
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Replies with help about the bot!'),
        async execute(interaction) {
            await interaction.reply({embeds: [infoEmbed]});
        },
};

    