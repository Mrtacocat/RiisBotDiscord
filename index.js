const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token, gptAPI, orgAPI } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');


// Create a new client instance
const client = new Client({ intents: [
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.MessageContent,
] });

client.commands = new Collection();

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));


// Setup OpenAI
const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({
	organization: orgAPI,
	apiKey: gptAPI,
});

const openai = new OpenAIApi(configuration);

// uncomment this to test the openai
/* client.on('messageCreate', async (message) => {
	try {
		// prevent infinite loops
		if (message.author.bot) return;
		const response = await openai.createCompletion({
			model: 'text-davinci-003',
			prompt: message.content,
			temperature: 0.9,
			max_tokens: 150,
			top_p: 1,
			frequency_penalty: 0.0,
			presence_penalty: 0.6,
			stop: [' Human:', ' AI:'],
		});
		message.reply(`${response.data.choices[0].text}`);
	}
	catch {
		console.log('Error');
	}
}); */

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	}
	else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	}
	else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

client.login(token);