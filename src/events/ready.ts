import { NPC3 } from "@ai-npc/npc3";
import { Client, Events, GuildMember } from "discord.js";
import { BotEvent } from "../../types";
import BOT_CONFIG from "../config/bot";
import { ENVIRONMENT, OPENAI_API_KEY } from "../helpers/envs";

const event: BotEvent = {
  name: Events.ClientReady,
  once: true,
  async execute(client: Client) {
    console.log(`💪 Logged in as ${client.user?.tag}`);
    client.npc3 = new NPC3({ openaiAPIKey: OPENAI_API_KEY });
    console.log(`💪 NPC3 initialized`);

    if (ENVIRONMENT === "development") {
      const guild = await client.guilds.fetch(BOT_CONFIG.guildId);
      client.emit(
        "guildMemberAdd",
        (await guild?.members.fetch("777676813517455370")) as GuildMember
      );
    }
  },
};

export default event;
