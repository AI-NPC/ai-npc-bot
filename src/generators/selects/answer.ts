import { getContextFromEmbedAuthor } from "./../../helpers/utils";
import { Button, Select } from "../../../types";
import {
  ColorResolvable,
  EmbedBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuInteraction,
  EmbedField,
  ButtonBuilder,
  ButtonStyle,
} from "discord.js";

export type Message = {
  sender: "npc" | "player";
  content: string;
};

async function embedAnswer(
  npc: { name: string; description: string },
  choices: string[],
  color: ColorResolvable,
  interaction: StringSelectMenuInteraction,
  messages: Message[],
  npcUrl: string
) {
  let Embed = new EmbedBuilder().setColor(color).setAuthor({
    name: interaction.message.embeds[0].author.name,
  });

  messages?.forEach((message: Message) => {
    Embed.addFields({
      name: message.sender === "npc" ? npc.name : interaction.user.tag,
      value: message.content + "\n",
    });
  });

  const row: any = new ActionRowBuilder().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId("answer")
      .setPlaceholder(`Answer to ${npc.name}...`)
      .addOptions(
        choices.map((choice, index: number) => ({
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
      .setURL(npcUrl)
  );

  await interaction.followUp({
    content: `<@${interaction.user.id}>`,
    embeds: [Embed],
    components: [row, buttonRow],
  });
}

module.exports = {
  id: "answer",
  async execute(interaction) {
    try {
      await interaction.deferReply();
      let id = interaction.customId;
      let discordAnswer = interaction.values[0];
      let retrievedEmbed = interaction.message.embeds[0];
      const contextId = retrievedEmbed.author.name;
      let retrievedContext = await getContextFromEmbedAuthor(
        contextId,
        interaction
      );
      const { gameContext, npc, npcUrl } = retrievedContext;

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
      messages.push({ sender: "player", content: discordAnswer });
      const approach = await interaction.client.npc3.discuss({
        gameContext: gameContext,
        npc: npc,
        history: messages,
      });
      messages.push({ sender: "npc", content: approach.message });
      embedAnswer(
        npc,
        approach.choices,
        interaction.message.embeds[0].color,
        interaction,
        messages,
        npcUrl
      );
    } catch (err) {
      console.log(err);
    }
  },
} as Select;
