import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { Command } from "../../types";

export const command: Command = {
  name: "help",
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Display all usable commands"),
  execute: async (interaction) => {
    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setAuthor({ name: "AI-NPC3" })
          .setDescription(`🏓 Pong! \n 📡 Ping: ${interaction.client.ws.ping}`)
          .setColor("#ff8e4d"),
      ],
    });
  },
};
