import {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  CommandInteraction,
} from "discord.js";
import { Command } from "../../types";
import { NPC, GameContext } from "@ai-npc/npc3";
import { displayContext } from "../helpers/formats";
import { randomGameContext } from "../helpers/utils";

async function embedNPC(
  npcs: NPC[],
  interaction: CommandInteraction,
  gameContext: GameContext
) {
  let Embed = new EmbedBuilder()
    .setColor("Random")
    .setDescription(displayContext(gameContext))
    .addFields({
      name: npcs[0].name,
      value: npcs[0].description,
    })
    .addFields({
      name: npcs[1].name,
      value: npcs[1].description,
    });

  const row: any = new ActionRowBuilder();

  for (let i = 0; i <= 1; i++) {
    row.addComponents(
      new ButtonBuilder()
        .setLabel(`Talk with ${npcs[i].name}`)
        .setStyle(ButtonStyle.Primary)
        .setCustomId(`talk-${i}`)
    );
  }
  await interaction.followUp({
    content: `<@${interaction.user.id}>`,
    embeds: [Embed],
    components: [row],
  });
}

export const command: Command = {
  name: "create",
  data: new SlashCommandBuilder()
    .setName("create")
    .setDescription("create 2 NPCs within a random game context"),
  async execute(interaction) {
    await interaction.deferReply();
    let gameContext = randomGameContext();
    let npcs: NPC[] = await interaction.client.npc3.getTwoNPCs({
      gameContext: gameContext,
    });
    await embedNPC(npcs, interaction, gameContext);
  },
};
