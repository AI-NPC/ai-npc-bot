import { SlashCommandBuilder } from "discord.js";
import { Command } from "../../types";
import { NPC } from "@ai-npc/npc3";
import { randomGameContext } from "../helpers/utils";
import BOT_CONFIG from "../config/bot";

export const command: Command = {
  name: "create",
  data: new SlashCommandBuilder()
    .setName("create")
    .setDescription("create 2 NPCs within a random game context"),
  async execute(interaction) {
    const { npc3, functions } = interaction.client;

    try {
      if (interaction.channel.parent.id !== BOT_CONFIG.parents.tests)
        throw new Error("This command can only be used in the tests category");
      let gameContext = randomGameContext();
      await interaction.deferReply();
      let npcs: NPC[] = await npc3.getTwoNPCs({
        gameContext: gameContext,
      });
      let payload = functions.embedNPC({
        npcs,
        interaction,
        gameContext,
      });
      await interaction.followUp(payload);
    } catch (err) {
      functions.reply.error({
        interaction: interaction,
        message: err.message,
      });
    }
  },
};
