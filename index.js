const keep_alive = require("./keep_alive.js");
const blogCommand = require('./commands/blog.js');
const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.once(Events.ClientReady, c => {
	console.log(`準備OKです! ${c.user.tag}がログインします。`);
});
// client.login(token);
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === blogCommand.data.name) {
        try {
            await blogCommand.execute(interaction);
        } catch (e) {
            console.log(e);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({
                    content: 'コマンド実行時エラー',
                    ephemeral: true
                });
            } else {
                await interaction.reply({
                    content: 'コマンド実行時エラー',
                    ephemeral: true
                });
            }
        }
    } else {
        console.error(`${interaction.commandName}というコマンドには対応していません。`);
    }
});

client.login(token);