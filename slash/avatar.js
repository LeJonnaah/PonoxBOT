const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("avatar")
        .setDescription("Shows the avatar of the user")
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("The user you want to see the avatar of")
                .setRequired(true)
        ),
    run: async ({ client, interaction }) => {
        const user = interaction.options.getUser("user")

        await interaction.editReply(user.displayAvatarURL({ dynamic: true }))
    }
}