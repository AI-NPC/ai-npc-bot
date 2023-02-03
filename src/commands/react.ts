import { SlashCommandBuilder } from "discord.js";
import { Command } from "../../types";

export const command: Command = {
  name: "react",
  data: new SlashCommandBuilder()
    .setName("react")
    .setDescription("Envoie un message avec une réaction"),
  async execute(interaction) {
    const message = await interaction.reply({
      content: "",
      fetchReply: true,
    });
    await message.react("👋");
  },
};
