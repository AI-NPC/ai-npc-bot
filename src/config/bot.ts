type BotConfig = {
  guildId: string;
  name: string;
  emoji: string;
  channels: any;
  roles: any;
  links: any;
};

const BOT_CONFIG: BotConfig = {
  guildId: "1069550778706034798",
  name: "ai-npc",
  emoji: "<:ainpc:1070706223978131496>",
  channels: {
    welcome: "1070706223978131496", //"1069620384393076756",
  },
  roles: {
    alphaTester: "1070413968646086656",
  },
  links: {
    docs: "https://docs.ai-npc.com",
  },
};

export default BOT_CONFIG;
