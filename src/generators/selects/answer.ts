import { TEST_GAME_CONTEXT } from "./../../helpers/constants";
import { Button, Select } from "../../../types";
import {
  ColorResolvable,
  ButtonInteraction,
  EmbedBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuInteraction,
  EmbedField,
} from "discord.js";
import { NPC_ANSWER, NPC_QUESTION } from "../../helpers/prompts";
import { extractNPCAnswer } from "../../helpers/formats";

export type Message = {
  sender: "npc" | "player";
  content: string;
};

async function embedAnswer(
  npc: { name: string; description: string },
  answer: { npc: string; choices: string[] },
  color: ColorResolvable,
  interaction: StringSelectMenuInteraction,
  messages: Message[]
) {
  let Embed = new EmbedBuilder()
    .setColor(color)
    .setDescription(`${npc.description}`)
    .setAuthor({
      name: npc.name,
    });

  messages?.forEach((message: Message) => {
    Embed.addFields({
      name: message.sender === "npc" ? npc.name : interaction.user.tag,
      value: message.content,
    });
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
  id: "answer",
  async execute(interaction) {
    try {
      console.log("shrek");
      await interaction.deferReply();
      let id = interaction.customId;

      let discordAnswer = interaction.values[0];
      let retrievedEmbed = interaction.message.embeds[0];
      let npc = {
        name: retrievedEmbed.author.name,
        description: retrievedEmbed.description,
      };
      if (["answer"].includes(id)) id = "answer";
      let messages: Message[] = [];
      // retrieve messages from embed
      const { fields } = retrievedEmbed;
      fields?.forEach((field: EmbedField) => {
        messages.push({
          sender: field.name === npc.name ? "npc" : "player",
          content: field.value,
        });
      });
      let prompt = NPC_QUESTION(TEST_GAME_CONTEXT, npc, messages);
      const output = await interaction.client.npc3.generateAnswer({
        prompt: prompt,
      });
      let answer = extractNPCAnswer(output);
      messages.push({ sender: "player", content: discordAnswer });
      messages.push({ sender: "npc", content: answer.npc });

      console.log(prompt);
      console.log(output);
      console.log(answer);
      embedAnswer(
        npc,
        answer,
        interaction.message.embeds[0].color,
        interaction,
        messages
      );
    } catch (err) {
      console.log(err);
    }
  },
} as Select;
