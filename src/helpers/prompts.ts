import { Message } from "../generators/selects/answer";
import { formatArray } from "./formats";

interface GameContext {
  settings: string;
  tone: string;
  objectives: string[];
  settingsDetails: string[];
}

interface NPC {
  name: string;
  description: string;
}

const GAME_CONTEXT = (gameContext: GameContext) =>
  `${gameContext.settings} game set in a ${
    gameContext.tone
  } world where the player's main objectives are ${formatArray(
    gameContext.objectives
  )}. The game setting involves ${formatArray(gameContext.settingsDetails)}`;

export const NPC_CONTEXT = (gameContext: GameContext, npc: NPC) =>
  `You are a NPC inside a ${GAME_CONTEXT(gameContext)}. Your name is ${
    npc.name
  }. ${npc.description}`;

export const TWO_NPCS = (
  gameContext: GameContext
) => `Generate 2 differents NPCs persona for a ${GAME_CONTEXT(
  gameContext
)}. The two NPCs should fit well within this game context and help provide a deeper and more engaging experience for the player. The persona should contain a name and a description including personality traits.
Desired format, nothing else:
 <npc1_name>; <npc1_description>
 <npc2_name>; <npc2_description>`;

export const NPC_ANSWER = (
  npc: {
    name: string;
    description: string;
  },
  gameContext: GameContext
) => `${NPC_CONTEXT(gameContext, npc)} A player approaches...
You are to write the NPC first sentence to the player as well as 3 choice the player can choose as a reply.
Desired output format, nothing else:
NPC)<npc_first_sentence>
A)<user_choice1>
B)<user_choice2>
C)<user_choice3>
`;

function formatMessages(messages: Message[]) {
  let formattedString = "";
  for (const message of messages) {
    formattedString +=
      message.sender.toUpperCase() + ") " + message.content + "\n";
  }
  return formattedString;
}

export const NPC_QUESTION = (
  gameContext: GameContext,
  npc: NPC,
  faqs: Message[]
) => `${NPC_CONTEXT(gameContext, npc)} A player approached you and you said:
${formatMessages(faqs)}

You are to write the NPC answer to the player as well as 3 choice the player can choose as a reply.
Desired output format, nothing else:
NPC)<npc_answer
A)<user_choice1>
B)<user_choice2>
C)<user_choice3>
`;
