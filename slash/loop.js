const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("loop")
        .setDescription("Loops the current song or queue")
        .addSubcommand((subcommand) =>
            subcommand
                .setName("song")
                .setDescription("Loops the current song")
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName("queue")
                .setDescription("Loops the current queue")
        ),
    run: async ({ client, interaction }) => {
        const queue = client.player.getQueue(interaction.guildId)

        if (!queue) return await interaction.editReply("There are no songs in the queue")

        if (interaction.options.getSubcommand() === "song") {
            queue.setRepeatMode(1)
            await interaction.editReply("Song looped")
        } else if (interaction.options.getSubcommand() === "queue") {
            queue.setRepeatMode(2)
            await interaction.editReply("Queue looped")
        }
    }
}