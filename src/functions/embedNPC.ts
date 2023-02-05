import { NPC, GameContext } from "@ai-npc/npc3";
import {
  CommandInteraction,
  ButtonInteraction,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  InteractionReplyOptions,
} from "discord.js";
import { displayContext } from "../helpers/formats";

export type EmbedNpcOptions = {
  npcs: NPC[];
  interaction: ButtonInteraction | CommandInteraction;
  gameContext: GameContext;
};

export type EmbedNPCFunction = (
  options: EmbedNpcOptions
) => InteractionReplyOptions;

module.exports = (options: EmbedNpcOptions): InteractionReplyOptions => {
  const { npcs, interaction, gameContext } = options;
  const { embedify } = interaction.client.functions;
  let Embed: EmbedBuilder = embedify({
    color: "Random",
    description: displayContext(gameContext),
    fields: [
      {
        name: npcs[0].name,
        value: npcs[0].description,
        inline: false,
      },
      {
        name: npcs[1].name,
        value: npcs[1].description,
        inline: false,
      },
    ],
  });

  let row: any = new ActionRowBuilder();

  for (let i = 0; i <= 1; i++) {
    row.addComponents(
      new ButtonBuilder()
        .setLabel(`Talk with ${npcs[i].name}`)
        .setStyle(ButtonStyle.Primary)
        .setCustomId(`talk-${i}`)
    );
  }
  return {
    content: `<@${interaction.user.id}>`,
    embeds: [Embed],
    components: [row],
  };
};
