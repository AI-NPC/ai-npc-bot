import { randomGameContext } from "./../../helpers/utils";
import { NPC, Approach } from "@ai-npc/npc3";
import { Button } from "../../../types";
import {
  ButtonInteraction,
  ChannelType,
  InteractionReplyOptions,
} from "discord.js";
import BOT_CONFIG from "../../config/bot";
import SuccessEmbed from "../../components/embeds/Success";

module.exports = {
  id: "create",
  async execute(interaction: ButtonInteraction) {
    const { npc3, functions } = interaction.client;
    try {
      await interaction.deferReply({ ephemeral: true });
      let gameContext = randomGameContext();
      let npcs: NPC[] = await npc3.getTwoNPCs({
        gameContext: gameContext,
      });
      let payload: InteractionReplyOptions = functions.embedNPC({
        npcs,
        interaction,
        gameContext,
      });
      let channel = await interaction.client.channels.fetch(
        BOT_CONFIG.channels.aTest
      );
      if (!channel || channel.type !== ChannelType.GuildText)
        throw new Error("Channel not found");

      await interaction.followUp({
        ephemeral: true,
        embeds: [
          SuccessEmbed({
            message: `NPCs created in <#${BOT_CONFIG.channels.aTest}>`,
          }),
        ],
        content: "",
      });
      channel.send({
        content: payload.content,
        embeds: payload.embeds,
        components: payload.components,
      });
    } catch (err) {
      console.error(err);
      functions.reply.error({
        interaction: interaction,
        message: err.message,
      });
    }
  },
} as Button;
