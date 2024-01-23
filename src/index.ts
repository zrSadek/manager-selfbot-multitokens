import { Client } from "discord.js-selfbot-v13";
import type { 
    ClientOptions,
    Message
} from "discord.js-selfbot-v13";
import { 
    Client as Discord,
    SlashCommandBuilder 
} from "discord.js";
import { 
    joinVoiceChannel,
    DiscordGatewayAdapterCreator
} from "@discordjs/voice"
import { 
    readFileSync,
    writeFileSync,
    existsSync
} from "fs";
import ("colors");

export const token: string = 'Your bot token here', service: string = 'dvwp', prefix: string = '!', url: string = 'https://discord.gg/';
export const ownersID: string[] = ['Owners'], guildID: string = 'guild id', afkID: string = 'Your afk channel id (voc)';

const bot = new Discord({
    intents: 3276795
});

const options = {
    autoRedeemNitro: false,
    checkUpdate: false,
    DMSync: true,
    syncStatus: true,
    patchVoice: true,
} as ClientOptions;

const promises: Client[] = [];
const users: string[] = JSON.parse(readFileSync('./users.json', 'utf-8'));
bot.on("ready", async () => {
    console.log(`${bot.user?.username} is connected !`.magenta);

    for (const user of users) {
        let client: Client = new Client(options);
        client.login(user)
            .catch(() => {
                users.pop(user);
                console.log(`[Users]: Failed to connect ${user} `.red);
                return;
            });
        promises.push(client);
        
        client.on("ready", async () => {
            if(!existsSync(`./src/databases/${client.user?.id}.json`)) writeFileSync(`./src/databases/${client.user?.id}.json`, JSON.stringify(databasetemplate))
            console.log(`[Users]: ${client.user?.globalName} ready on ${service}!`.magenta);
            const support = client.guilds.cache.get(guildID);
            if(support) joinVoiceChannel({
                    channelId: afkID,
                    guildId: guildID,
                    selfDeaf: false,
                    selfMute: false,
                    adapterCreator: support?.voiceAdapterCreator as DiscordGatewayAdapterCreator
                });
        });

        client.on("messageCreate", async (message: Message) => {
            const data = JSON.parse(readFileSync(`./src/databases/${client.user?.id}.json`, 'utf8'));
            if(message.author.id != client.user?.id || !message.content.startsWith(data.prefix)) return;
            /* 

            */
        })

    };
    /*
    setInterval(() => {
        bot.user?.setActivity(`${service} - ${promises.filter((user) => user.isReady).length} users`);
    }, 10000);
    */
    fetch(`https://discord.com/api/v10/applications/${bot.user?.id}/commands`, {
        method: 'PUT', 
        headers: {
            Authorization : `Bot ${token}`,
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(commands)
    }).finally(() => console.log("Slashs loaded".cyan));
});

bot.on("interactionCreate", async (interaction) => {
    const { guildId } = interaction;
    if(guildId != guildID) return
    if(interaction.isCommand() || interaction.isChatInputCommand()) {
        const { commandName } = interaction;
        if(commandName == 'users') {
            const filtered = promises.filter((user) => user.isReady);
            await interaction.deferReply({
                ephemeral: true
            });
            if(filtered.length == 0) {
                await interaction.followUp({
                    content: '0 users'
                })
                return;
            }
            
            users.push(user.token);
            writeFileSync(jsonPath, JSON.stringify(users));
            
            await interaction.followUp({ 
                content: String(filtered.map((user, index) => `${index + 1} - ${user.user?.globalName} / ${user.user?.id}`))
            });
        }
        if(commandName == 'disconnect') {
            const userId = interaction.options.get('user')?.value;
            await interaction.deferReply({ 
                ephemeral: true
            });
            if(interaction.user.id != userId || !ownersID.includes(interaction.user.id)) {
                await interaction.followUp(`You are not allowed to perform this action`)
                return;
            }
            const user = promises.find((user) => user.user?.id == userId);
            user?.removeAllListeners().destroy();
            users.pop(user.token);
            writeFileSync(jsonPath, JSON.stringify(users));
            await interaction.followUp({
                content: 'This user has been disconnected and removed from the database'
            });

        }
        if(commandName == 'proxy') {
            const userId = interaction.options.get('user')?.value;
            await interaction.deferReply({ 
                ephemeral: true
            });
            if(interaction.user.id != userId || !ownersID.includes(interaction.user.id)) {
                await interaction.followUp(`You are not allowed to perform this action`)
                return;
            }
            const user = promises.find((user) => user.user?.id == userId);
            const proxys = (readFileSync('./proxys.txt', 'utf8')).trim().split("\n").map(line => line.trim().toLowerCase());
            const index = Math.floor(Math.random() * proxys.length);
            const proxy = String(proxys.splice(index, 1)[0]);
            writeFileSync('./proxys.txt', proxys.join("\n"));
            user?.options.proxy == proxy;
            await interaction.followUp(`${user?.user?.displayName} new Proxy ${proxy}`);
        }
    } else if(interaction.isAutocomplete()) {
        const { commandName } = interaction;
        if(commandName == 'proxy' || commandName == 'disconnect') {
            const value = interaction.options.getFocused();
            const choices = promises.map((user) => ({
                name: String(`${user.user?.globalName} / ${user.user?.id}`),
                value: String(user.user?.id)
            }));
            const filtered = choices.filter(choice => choice.name.startsWith(value));
            await interaction.respond(
                filtered.map(choice => ({ name: choice.name, value: choice.value })),
            );
        }

    }
})

const commands = [
    new SlashCommandBuilder()
        .setName('users')
        .setDescription('Get all users'),
    new SlashCommandBuilder()
        .setName('proxy')
        .setDescription('Update proxy')
        .addStringOption(string => string
            .setName('user')
            .setDescription('ID')
            .setRequired(true)
            .setAutocomplete(true)),

    new SlashCommandBuilder()
        .setName('disconnect')
        .setDescription('Disconnect a user')
        .addStringOption(string => string
            .setName('user')
            .setDescription('ID')
            .setRequired(true)
            .setAutocomplete(true)),

    new SlashCommandBuilder()
        .setName('connect')
        .setDescription('Connect a user')
        .addStringOption(string => string
            .setName('user')
            .setDescription('Token')
            .setRequired(true)),
].map((command => command.toJSON()));

const databasetemplate = {
    proxy: "False",
    prefix: prefix,
}

bot.login(token);