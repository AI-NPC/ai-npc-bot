import { NPC3 } from "@ai-npc/npc3";
import {
  Collection,
  SlashCommandBuilder,
  CommandInteraction,
  ButtonInteraction,
  StringSelectMenuInteraction,
} from "discord.js";
import { ReplyFunction } from "./src/functions/reply";
import { EmbedifyFunction } from "./src/functions/embedify";
import { EmbedNPCFunction } from "./src/functions/embedNPC";

export interface BotEvent {
  name: string;
  once?: boolean | false;
  execute: (...args: any) => void;
}

export interface BotFunctions {
  reply: ReplyFunction;
  parseTxt: (txt: string) => string;
  embedify: EmbedifyFunction;
  embedNPC: EmbedNPCFunction;
}

export interface Command {
  name: string;
  data: SlashCommandBuilder | any;
  execute: (interaction: CommandInteraction) => Promise<void>;
}

export interface Button {
  id: string;
  execute: (interaction: ButtonInteraction) => Promise<void>;
}

export interface Select {
  id: string;
  execute: (interaction: StringSelectMenuInteraction) => Promise<void>;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CLIENT_ID: string;
      TOKEN: string;
      OPENAI_API_KEY: string;
    }
  }
}

declare module "discord.js" {
  export interface Client {
    commands: Collection<string, Command>;
    functions: BotFunctions;
    npc3: NPC3;
  }
}
