const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("loop")
        .setDescription("Repite la canción actual o la cola")
        .addSubcommand((subcommand) =>
            subcommand
                .setName("song")
                .setDescription("Repite la canción actual")
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName("queue")
                .setDescription("Repite la cola")
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName("off")
                .setDescription("Desactiva el loop")
        ),
    run: async ({ client, interaction }) => {
        const queue = client.player.getQueue(interaction.guildId)

        if (!queue) return await interaction.editReply("No hay canciones en la cola")

        if (interaction.options.getSubcommand() === "song") {
            await queue.setRepeatMode(1)
            await interaction.editReply("Repetición de canción activada")
        } else if (interaction.options.getSubcommand() === "queue") {
            await queue.setRepeatMode(2)
            await interaction.editReply("Repetición de cola activada")
        } else if (interaction.options.getSubcommand() === "off") {
            await queue.setRepeatMode(0)
            await interaction.editReply("Repetición desactivada")
        }
    }
}