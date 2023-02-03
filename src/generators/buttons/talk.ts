import { NPC, Approach } from "@ai-npc/npc3";
import { Button } from "../../../types";
import {
  ColorResolvable,
  ButtonInteraction,
  EmbedBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  ButtonBuilder,
  ButtonStyle,
} from "discord.js";
import { getContextFromEmbedAuthor } from "../../helpers/utils";

async function embedAnswer(
  npc: NPC,
  approach: Approach,
  color: ColorResolvable,
  interaction: ButtonInteraction,
  contextId: string
) {
  let Embed = new EmbedBuilder()
    .setColor(color)
    .setAuthor({
      name: contextId,
    })
    .addFields({
      name: npc.name,
      value: approach.message,
    });

  const row: any = new ActionRowBuilder().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId("answer")
      .setPlaceholder(`Answer to ${npc.name}...`)
      .addOptions(
        approach.choices.map((choice) => ({
          label: choice || "Failed to generate answer",
          value: choice || "Failed to generate answer",
          description:
            Math.random() > 0.5 ? "Select this answer" : "Answer this",
        }))
      )
  );

  const buttonRow: any = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setStyle(ButtonStyle.Link)
      .setLabel(`${npc.name} profile`)
      .setURL(interaction.message.url)
  );

  await interaction.followUp({
    content: `<@${interaction.user.id}>`,
    embeds: [Embed],
    components: [row, buttonRow],
  });
}

module.exports = {
  id: "talk",
  async execute(interaction: ButtonInteraction) {
    const { client } = interaction;
    let npcId = Number(interaction.customId.split("-")[1]);

    let npc = {
      name: interaction.message.embeds[0].fields[npcId].name,
      description: interaction.message.embeds[0].fields[npcId].value,
    };
    let contextId = `${npcId}-${interaction.message.id}`;
    await interaction.deferReply();
    let data: any = await getContextFromEmbedAuthor(contextId, interaction);
    const approach: Approach = await client.npc3.approach({
      gameContext: data.gameContext,
      npc: data.npc,
    });
    await embedAnswer(
      npc,
      approach,
      interaction.message.embeds[0].color,
      interaction,
      contextId
    );
  },
} as Button;
