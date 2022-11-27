const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("lyrics")
        .setDescription("Displays lyrics for the currently playing song")
        .addStringOption((option) =>
            option.setName("song").setDescription("The song to search for").setRequired(false)
        ),
    run: async ({ client, interaction }) => {
        const queue = client.player.getQueue(interaction.guildId)

        if (!queue) return await interaction.editReply("There are no songs in the queue")

        const song = queue.current

        const lyrics = await client.player.lyrics(song.title)

        await interaction.editReply({
            embeds: [new EmbedBuilder()
                .setTitle(song.title)
                .setDescription(lyrics)
            ],
        })
    },
}