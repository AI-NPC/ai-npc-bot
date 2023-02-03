import {
  SlashCommandBuilder,
  PermissionFlagsBits,
  Attachment,
  ChannelType,
} from "discord.js";
import { Command } from "../../types";

export const command: Command = {
  name: "send",
  data: new SlashCommandBuilder()
    .setName("send")
    .setDescription("send a message to a channel")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addChannelOption((option) => {
      return option
        .setName("channel")
        .setDescription("The channel where the message will be sent")
        .setRequired(true);
    })
    .addStringOption((option) => {
      return option
        .setName("message")
        .setDescription("The message to send the channel")
        .setRequired(true);
    })
    .addAttachmentOption((option) => {
      return option
        .setName("file0")
        .setDescription("Any attached file")
        .setRequired(false);
    })
    .addAttachmentOption((option) => {
      return option
        .setName("file1")
        .setDescription("Any attached file")
        .setRequired(false);
    })
    .addAttachmentOption((option) => {
      return option
        .setName("file2")
        .setDescription("Any attached file")
        .setRequired(false);
    }),
  async execute(interaction) {
    const { client, guild } = interaction;
    try {
      const { options } = interaction;
      let channel = options.get("channel").channel;
      if (!channel) channel = interaction.channel;
      channel = guild.channels.cache.get(channel.id);
      if (channel.id !== interaction.channel.id && !channel)
        throw new Error("Channel not found");
      if (channel.type !== ChannelType.GuildText)
        throw new Error("Channel is not a text channel");

      let content = options.get("message").value.toString();
      if (!content || content.length <= 0) throw new Error("Message is empty");

      let files: Attachment[] = [];
      for (let i = 0; i <= 3; i++) {
        let file = options.get(`file${i}`);
        if (file) files.push(file.attachment);
      }
      await client.functions.reply.success({
        interaction: interaction,
      });

      await channel.send({
        content: `${content.split("//n").join("\n")}`,
        files: files,
      });
    } catch (error) {
      console.error(error);
      await client.functions.reply.error({
        interaction: interaction,
        message: error.message,
      });
    }
  },
};

// emoji list:
// success: ✅
// error: ❌
