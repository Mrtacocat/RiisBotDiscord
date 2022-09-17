const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Replies with help about the bot!'),
        
    run: async ({interaction}) => {
        let embed = new EmbedBuilder()

        embed
        .setColor(0xE37800)
        .setTitle(`WALL·E Bot Help Page`)
        .setURL('https://mrtacocat.github.io/DiscordWEB/')
        .setAuthor({    name: 'WALL·E#7061', 
                        iconURL: 'https://cdn.discordapp.com/avatars/537963608022188032/57576221dbe1eead2c6eee35e5f4c876.webp'})
        .setDescription(`WALL·E commands:`)
        .addFields({ name: '/help', value: 'Replies with help', inline: false },
                    { name: '/ping', value: 'Replies with pong!', inline: false },
                    { name: '/server', value: 'Replies with server info!', inline: false },
                    { name: '/profile', value: 'Replies with your profile!', inline: false },
                    { name: '\u200B', value: '\u200B' },
                    { name: 'Version', value: '1.0.0', inline: true },
                    { name: 'Language', value: 'JavaScript', inline: true },
                    { name: 'Framework', value: 'Discord.js', inline: true })
        //.setImage({ url: 'https://cdn.discordapp.com/attachments/88210000000000000/88210000000000000/unknown.png' })
        .setTimestamp(new Date())
        //.setFooter({ text: 'Developed by MrTacoCat#6868', iconURL: 'https://cdn.discordapp.com/avatars/182532419335749632/fca1851401444b5a29aacab533bb64fc.webp' })
                    
        await interaction.editReply({
            embeds: [embed]
        })
        },
};

    