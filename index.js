const Discord = require('discord.js');
const { Client, GatewayIntentBits } = require('discord.js')
const dotenv = require('dotenv');
const {REST} = require('@discordjs/rest');
const {Routes} = require('discord-api-types/v9');
const fs = require('fs');
const {Player} = require('discord-player');

dotenv.config();
const TOKEN = process.env.TOKEN;

const LOAD_SLASH = process.argv[2] === 'load';

const CLIENT_ID = "1036704040689610752"
const GUILD_ID = "414053547982848000"

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
    ]
})

client.slashCommands = new Discord.Collection();
client.player = new Player(client, {
    ytdlOptions: {
        quality: 'highestaudio',
        highWaterMark: 1 << 25
    }
});

let commands = [];

const slashFiles = fs.readdirSync('./slash').filter(file => file.endsWith('.js'));

for (const file of slashFiles) {
    const slashCmd = require(`./slash/${file}`);
    client.slashCommands.set(slashCmd.data.name, slashCmd);
    if (LOAD_SLASH) commands.push(slashCmd.data.toJSON());
}

if (LOAD_SLASH) {
    const rest = new REST({ version: '9' }).setToken(TOKEN);
    console.log("Loading slash commands...");

    (async () => {
        try {
            console.log('Started refreshing application (/) commands.');

            await rest.put(
                Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
                { body: commands },
            );

            console.log('Successfully reloaded application (/) commands.');
        } catch (error) {
            console.error(error);
        }
    })();
} else {
    client.on('ready', () => {
        console.log(`Logged in as ${client.user.tag}!`);
        });
    client.on('interactionCreate', async interaction => {
        async function handleCommand () {
            if (!interaction.isCommand()) return;

            const slashCmd = client.slashCommands.get(interaction.commandName);
            if (!slashCmd) interaction.reply("Command not found");
            await interaction.deferReply();
            await slashCmd.run({client, interaction});
        }
        handleCommand();
});
client.login(TOKEN);
}