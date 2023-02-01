import { TEST_GAME_CONTEXT } from "./../../helpers/constants";
import { Button } from "../../../types";
import {
  ColorResolvable,
  ButtonInteraction,
  EmbedBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
} from "discord.js";
import { NPC_ANSWER } from "../../helpers/prompts";
import { extractNPCAnswer } from "../../helpers/formats";

async function embedAnswer(
  npc: { name: string; description: string },
  answer: { npc: string; choices: string[] },
  color: ColorResolvable,
  interaction: ButtonInteraction
) {
  let Embed = new EmbedBuilder()
    .setColor(color)
    .setDescription(`${npc.description}`)
    .setAuthor({
      name: npc.name,
    })
    .addFields({
      name: npc.name,
      value: answer.npc,
    });

  const row: any = new ActionRowBuilder().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId("answer")
      .setPlaceholder(`Answer to ${npc.name}...`)
      .addOptions(
        answer.choices.map((choice, index: number) => ({
          label: choice || "Failed to generate answer",
          value: choice || "Failed to generate answer",
          description:
            Math.random() > 0.5 ? "Select this answer" : "Answer this",
        }))
      )
  );

  await interaction.followUp({
    embeds: [Embed],
    components: [row],
  });
}

module.exports = {
  id: "talk",
  async execute(interaction: ButtonInteraction) {
    let id = interaction.customId;
    let npc = {
      name: interaction.message.embeds[0].author.name,
      description: interaction.message.embeds[0].description,
    };
    if (["talk"].includes(id)) id = "talk";
    let prompt = NPC_ANSWER(npc, TEST_GAME_CONTEXT);
    await interaction.deferReply();

    const output = await interaction.client.npc3.generateAnswer({
      prompt: prompt,
    });
    console.log(prompt);
    console.log(output);
    let answer = extractNPCAnswer(output);
    console.log(answer);

    embedAnswer(npc, answer, interaction.message.embeds[0].color, interaction);
  },
} as Button;
