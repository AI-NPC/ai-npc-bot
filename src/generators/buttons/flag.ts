import { NPC, Approach } from "@ai-npc/npc3";
import { Button } from "../../../types";
import { ButtonInteraction, ChannelType } from "discord.js";
import BOT_CONFIG from "../../config/bot";

module.exports = {
  id: "flag",
  async execute(interaction: ButtonInteraction) {
    const { client, guild } = interaction;
    const { embedify } = client.functions;
    const retrievedEmbed = interaction.message.embeds[0];
    let flagChannel = await guild.channels.fetch(BOT_CONFIG.testChannels.flag);

    if (!flagChannel || flagChannel.type !== ChannelType.GuildText)
      throw new Error("Channel not found");

    const thanks = embedify({
      description: `Thank you for flagging this content. We will review it as soon as possible.`,
      color: "Green",
    });

    await interaction.reply({
      ephemeral: true,
      embeds: [thanks],
    });
    await flagChannel.send({
      content: `**New flag** from ${interaction.user.id} in ${interaction.channelId}:
      ${interaction.message.url}
      `,
      embeds: [retrievedEmbed],
    });
  },
} as Button;
