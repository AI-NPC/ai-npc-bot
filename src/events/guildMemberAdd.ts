import {
  ChannelType,
  Events,
  GuildMember,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Channel,
} from "discord.js";
import { BotEvent } from "../../types";
import BOT_CONFIG from "../config/bot";
import { ENVIRONMENT } from "../helpers/envs";

const event: BotEvent = {
  name: Events.GuildMemberAdd,
  once: true,
  async execute(member: GuildMember) {
    try {
      const { guild } = member;
      let channel: Channel;
      if (ENVIRONMENT === "development") {
        channel = await guild.channels.fetch(BOT_CONFIG.testChannels.welcome);
      } else channel = await guild.channels.fetch(BOT_CONFIG.channels.welcome);

      if (!channel || channel.type !== ChannelType.GuildText)
        throw new Error("Channel not found");

      let embed = member.client.functions.embedify({
        description: `
        We're thrilled to have you join our community of AI enthusiasts. Our server offers a variety of channels for you to explore, including:

       ${BOT_CONFIG.messages.serverDescription}

        ${BOT_CONFIG.messages.docs(guild.name, BOT_CONFIG.emoji)}

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
          .setEmoji("📖"),
        new ButtonBuilder()
          .setLabel("Click here to test")
          .setCustomId("create")
          .setStyle(ButtonStyle.Primary)
          .setEmoji("🧠")
      );

      let alphaTester = await guild.roles.fetch(BOT_CONFIG.roles.alphaTester);
      if (alphaTester) await member.roles.add(alphaTester);

      await channel.send({
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
