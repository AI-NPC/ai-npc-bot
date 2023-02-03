import {
  ChannelType,
  Events,
  GuildMember,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  AnyComponentBuilder,
} from "discord.js";
import { BotEvent } from "../../types";
import BOT_CONFIG from "../config/bot";

const event: BotEvent = {
  name: Events.GuildMemberAdd,
  once: true,
  execute(member: GuildMember) {
    try {
      const { guild } = member;

      let channel = guild.channels.cache.get(BOT_CONFIG.channels.welcome);
      if (!channel || channel.type !== ChannelType.GuildText)
        throw new Error("Channel not found");

      let embed = member.client.functions.embedify({
        description: `
        We're thrilled to have you join our community of AI enthusiasts. Our server offers a variety of channels for you to explore, including:

        <#1070423068926808074> to learn more about our project and mission
        <#1070415755688022136> is the place to ask if you got any questions
        <#1071195508036616324> to chat with other members of the community
        <#1071195508036616324> to engage in meaningful discussions about AI

        If you're looking to test **${guild.name}** ${BOT_CONFIG.emoji}, you can use the \`\`/create\`\` command in any of the <#1070422574141550665> channels. This will create two NPCs for you to chat with in a random game context. We encourage you to give it a try and let us know your thoughts!

        We're excited to have you be a part of our community, and we can't wait to see what discussions and interactions arise!`,
        author: {
          name: member.user.username,
        },
        thumbnail: member.user.displayAvatarURL({ extension: "jpg" }),
      });

      let row: any = new ActionRowBuilder().setComponents(
        new ButtonBuilder()
          .setURL(BOT_CONFIG.links.docs)
          .setLabel("Read the documentation")
          .setStyle(ButtonStyle.Link)
          .setEmoji("📖")
      );

      let alphaTester = guild.roles.cache.get(BOT_CONFIG.roles.alphaTester);
      if (alphaTester) member.roles.add(alphaTester);

      channel.send({
        content: `Welcome to **${guild.name}** ${BOT_CONFIG.emoji}, <@${member.user.id}>!`,
        embeds: [embed],
        components: [row],
      });
    } catch (error) {
      console.error(error);
    }
  },
};

export default event;

// emoji list
// book: 📖
