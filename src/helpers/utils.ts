import { Interaction } from "discord.js";
import { parseContext } from "./formats";
import { GameContext, NPC } from "@ai-npc/npc3";
import { DETAILS, OBJECTIVES, SETTINGS, TONES } from "./constants";

export const getContextFromEmbedAuthor = async (
  author: string,
  interaction: Interaction
): Promise<{ gameContext: GameContext; npc: NPC; npcUrl: string }> => {
  const tmp = author.split("-");
  const [npcId, messageWithContextId] = tmp;
  console.log(messageWithContextId);
  let retrievedMessage = await interaction.channel.messages.fetch(
    messageWithContextId
  );
  if (!retrievedMessage) throw new Error("Message not found");
  const { embeds } = retrievedMessage;
  if (!embeds || embeds.length === 0) throw new Error("Embed not found");
  console.log(parseContext(embeds[0].description));
  return {
    gameContext: parseContext(embeds[0].description),
    npc: {
      name: embeds[0].fields[npcId].name,
      description: embeds[0].fields[npcId].value,
    },
    npcUrl: retrievedMessage.url,
  };
};

export const randomGameContext = (): GameContext => {
  const setting = SETTINGS[Math.floor(Math.random() * SETTINGS.length)];
  const tone = TONES[Math.floor(Math.random() * TONES.length)];
  const objectives = [];
  for (let i = 0; i < 3; i++) {
    let pick: string = null;
    while (pick === null || objectives.includes(pick)) {
      pick = OBJECTIVES[Math.floor(Math.random() * OBJECTIVES.length)];
    }
    objectives.push(pick);
  }
  const details = [];
  for (let i = 0; i < 3; i++) {
    let pick: string = null;
    while (pick === null || details.includes(pick)) {
      pick = DETAILS[Math.floor(Math.random() * DETAILS.length)];
    }
    details.push(pick);
  }

  return {
    setting,
    tone,
    objectives,
    details,
  };
};
