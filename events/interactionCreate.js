/* eslint-disable no-mixed-spaces-and-tabs */
const { Events } = require('discord.js');
const ytdl = require('ytdl-core');
const { createAudioPlayer, createAudioResource, joinVoiceChannel, AudioPlayerStatus } = require('@discordjs/voice');


module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}


		if (interaction.commandName === 'play') {
			// Get the user's voice channel
			const voiceChannel = interaction.member.voice.channel;
			if (!voiceChannel) {
			  return interaction.reply({ content: 'You need to be in a voice channel to use this command!', ephemeral: true });
			}

			const connection = joinVoiceChannel({
			  	channelId: voiceChannel.id,
			  	guildId: voiceChannel.guild.id,
			  	adapterCreator: voiceChannel.guild.voiceAdapterCreator,
			});

			const url = interaction.options.getString('url');
			const stream = ytdl(url, { filter: 'audioonly' });
			const resource = createAudioResource(stream);
			const player = createAudioPlayer();

			connection.subscribe(player);
			player.play(resource);

			player.on(AudioPlayerStatus.Idle, () => {
				connection.destroy();
			});

			await interaction.reply(`Now playing: ${url}`);
		}

		try {
			await command.execute(interaction);
		}
		catch (error) {
			console.error(`Error executing ${interaction.commandName}`);
			console.error(error);
		}
	},
};