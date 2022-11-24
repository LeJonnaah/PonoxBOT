const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("lyrics")
        .setDescription("Shows the lyrics of the current song"),
    run: async ({ client, interaction }) => {
        const queue = client.player.getQueue(interaction.guildId)

        if (!queue) return await interaction.editReply("There are no songs in the queue")

        const lyrics = await client.player.lyrics(queue.current.title)

        if (!lyrics) return await interaction.editReply("No lyrics found")

        await interaction.editReply(lyrics)
    }
}