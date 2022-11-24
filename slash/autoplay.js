const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("autoplay")
    .setDescription("Toggles autoplay on or off")
    .addBooleanOption((option) => option.setName("toggle").setDescription("Turn autoplay on or off")),
    run: async ({ client, interaction }) => {
        const queue = client.player.getQueue(interaction.guildId)
        if (!queue) return await interaction.editReply("There are no songs in the queue")

        const toggle = interaction.options.getBoolean("toggle")
        if (toggle === undefined) return await interaction.editReply("Please specify true or false")

        queue.set("autoplay", toggle)
        await interaction.editReply(`Autoplay has been ${toggle ? "enabled" : "disabled"}`)
    }
}