const { SlashCommandBuilder } = require('@discordjs/builders');
const { createAudioPlayer, createAudioResource, joinVoiceChannel, AudioPlayerStatus } = require('@discordjs/voice');
const ytdl = require('ytdl-core');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Plays a YouTube video in your voice channel')
		.addStringOption(option =>
			option.setName('url')
				.setDescription('The YouTube video URL')
				.setRequired(true)),
	async execute(interaction) {
		const url = interaction.options.getString('url');
		const voiceChannel = interaction.member.voice.channel;
		if (!voiceChannel) return await interaction.editReply('You need to be in a voice channel to use this command!');
		const connection = joinVoiceChannel({
			channelId: voiceChannel.id,
			guildId: voiceChannel.guild.id,
			adapterCreator: voiceChannel.guild.voiceAdapterCreator,
		});
		const player = createAudioPlayer();
		connection.subscribe(player);
		const resource = createAudioResource(ytdl(url, { filter: 'audioonly' }));
		player.play(resource);
		player.on(AudioPlayerStatus.Idle, () => connection.destroy());
		return await interaction.editReply(`Now Playing: ${url}`);
	},
};