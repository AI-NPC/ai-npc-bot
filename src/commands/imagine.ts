import { TWO_NPCS } from "../helpers/prompts";
import {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  CommandInteraction,
} from "discord.js";
import { Command } from "../../types";
import {
  objs,
  settings,
  settingsDetails,
  TEST_GAME_CONTEXT,
  tone,
} from "../helpers/constants";

function extractNPC(paragraph: string) {
  const objects = [];
  const lines = paragraph.split("\n");
  for (const line of lines) {
    if (line.length > 0) {
      const [name, description] = line.split(";");
      objects.push({ name: name, description: description });
    }
  }
  return objects;
}

async function embedNPC(
  npc: { name: string; description: string },
  interaction: CommandInteraction
) {
  let Embed = new EmbedBuilder()
    .setColor("Random")
    .setDescription(`${npc.description}`)
    .setAuthor({
      name: npc.name,
    });

  const row: any = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setLabel(`Talk with ${npc.name}`)
      .setStyle(ButtonStyle.Primary)
      .setCustomId(`talk-${npc.name}`)
  );
  await interaction.followUp({
    embeds: [Embed],
    components: [row],
  });
}

export const command: Command = {
  name: "imagine",
  data: new SlashCommandBuilder()
    .setName("imagine")
    .setDescription("Imagine 1 NPC within a context"),
  async execute(interaction) {
    console.log("running");
    let prompt = TWO_NPCS(TEST_GAME_CONTEXT);
    await interaction.deferReply();
    //  let prompt = `You are a scenario writer for a video game. You are tasked with writing a persona for a new NPC. You have been given the following information about the game context of the NPC:\n\n${context}\n\nYou are to write a persona for this NPC in a JSON format with the name of the NPC and some personality traits.`;
    const output = await interaction.client.npc3.generateAnswer({
      prompt: prompt,
    });
    let npcs = extractNPC(output);
    console.log(npcs);
    await embedNPC(npcs[0], interaction);
    await embedNPC(npcs[1], interaction);
  },
};
