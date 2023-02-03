import { NPC3 } from "@ai-npc/npc3";
import { Client, Events, GuildMember } from "discord.js";
import { BotEvent } from "../../types";
import { OPENAI_API_KEY } from "../helpers/envs";

const event: BotEvent = {
  name: Events.ClientReady,
  once: true,
  execute(client: Client) {
    console.log(`💪 Logged in as ${client.user?.tag}`);
    client.npc3 = new NPC3({ openaiAPIKey: OPENAI_API_KEY });
    console.log(`💪 NPC3 initialized`);

    // const guild = client.guilds.cache.get("1069550778706034798");
    // client.emit(
    //   "guildMemberAdd",
    //   guild?.members.cache.get("777676813517455370") as GuildMember
    // );
  },
};

export default event;
