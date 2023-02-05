import {
  EmbedBuilder,
  SlashCommandBuilder,
  PermissionFlagsBits,
  ActionRowBuilder,
  ButtonStyle,
  ButtonBuilder,
} from "discord.js";
import { Command } from "../../types";
import BOT_CONFIG from "../config/bot";

export const command: Command = {
  name: "docs",
  data: new SlashCommandBuilder()
    .setName("docs")
    .setDescription("Send some docs button")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction) {
    const { embedify } = interaction.client.functions;
    let embed: EmbedBuilder = embedify({
      description: BOT_CONFIG.messages.docs(
        interaction.guild.name,
        BOT_CONFIG.emoji
      ),
    });

    const row: any = new ActionRowBuilder();
    row.addComponents(
      new ButtonBuilder()
        .setURL(BOT_CONFIG.links.docs)
        .setLabel("Read the documentation")
        .setStyle(ButtonStyle.Link)
        .setEmoji("📖"),
      new ButtonBuilder()
        .setLabel("Click here to test")
        .setCustomId("create")
        .setStyle(ButtonStyle.Primary)
        .setEmoji("🧠")
    );

    const message = await interaction.reply({
      content: "",
      embeds: [embed],
      components: [row],
      fetchReply: true,
    });
    await message.react(BOT_CONFIG.emoji);
  },
};
