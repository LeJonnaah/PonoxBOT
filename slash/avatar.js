const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder().setName("avatar").setDescription("Displays the avatar of the mentioned user"),
    run: async ({ client, interaction }) => {
        const user = interaction.options.getUser("user") || interaction.user

        await interaction.editReply(user.displayAvatarURL({ dynamic: true, size: 4096 }))
    }
}