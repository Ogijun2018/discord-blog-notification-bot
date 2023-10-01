const { SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('blog')
        .setDescription('blogコマンドでブログ当番を回します。')
        .addUserOption(option => 
            option.setName('target')
                .setDescription('次のブログ当番をメンションで指定してください。')
                .setRequired(true)
        ),
    execute: async function (interaction) {
        const target = interaction.options.getUser('target');
        const gasUrl = 'https://script.google.com/macros/s/AKfycbyYEQk4TFWwkKYreAPtbStWRdpPUrLpYowdzZ1En_Pu3qyAsZyjGhbhVivWuEYS3XjPlA/exec';
        const response = await fetch(gasUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `userId=${target.id}`
        });
        // response from GAS (not used)
        const text = await response.text();
        await interaction.reply(`ブログ更新を受け付けました。${target.username}さん、よろしくお願いします。`);
	},
};