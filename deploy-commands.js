const { REST, Routes } = require('discord.js');
const blogCommand = require('./commands/blog.js');
const { applicationId, guildId, token } = require('./config.json');
const commands = [blogCommand.data.toJSON()];
const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        await rest.put(
			Routes.applicationGuildCommands(applicationId, guildId),
			{ body: commands },
		);
        console.log('サーバー固有のコマンドが登録されました！');
    } catch (error) {
        console.error('コマンドの登録中にエラーが発生しました:', error);
    }
})();