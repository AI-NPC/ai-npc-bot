type BotConfig = {
  guildId: string;
  name: string;
  emoji: string;
  channels: any;
  testChannels: any;
  roles: any;
  links: any;
  messages: any;
  parents: any;
};

const BOT_CONFIG: BotConfig = {
  guildId: "1069550778706034798",
  name: "ai-npc",
  emoji: "<:ainpc:1070706223978131496>",
  channels: {
    welcome: "1070425792510709760",
    aTest: "1070422574141550665",
  },
  parents: {
    tests: "1069620312519479326",
  },
  roles: {
    alphaTester: "1070413968646086656",
  },
  links: {
    docs: "https://docs.ai-npc.com",
  },
  testChannels: {
    welcome: "1069620594389307422",
  },
  messages: {
    serverDescription: `<#1070423068926808074> to learn more about our project and mission
        <#1070415755688022136> is the place to ask if you got any questions
        <#1071195508036616324> to chat with other members of the community
        <#1071195508036616324> to engage in meaningful discussions about AI
        `,
    docs: (guildName: string, emoji: string) =>
      `If you're looking to test **${guildName}** ${emoji}, you can use the \`\`/create\`\` command in any of the <#1070422574141550665> channels. This will create two NPCs for you to chat with in a random game context. We encourage you to give it a try and let us know your thoughts!`,
  },
};

export default BOT_CONFIG;
