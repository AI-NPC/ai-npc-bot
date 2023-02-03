import {
  SlashCommandBuilder,
  PermissionFlagsBits,
  Attachment,
  ChannelType,
  AttachmentBuilder,
  EmbedBuilder,
} from "discord.js";
import { Command } from "../../types";
import BOT_CONFIG from "../config/bot";
import { join } from "path";

export const command: Command = {
  name: "embed",
  data: new SlashCommandBuilder()
    .setName("embed")
    .setDescription("Send an embed to a channel")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addChannelOption((option) => {
      return option
        .setName("channel")
        .setDescription("The channel where the message will be sent")
        .setRequired(true);
    })

    .addStringOption((option) => {
      return option
        .setName("description")
        .setDescription("The embed description")
        .setRequired(true);
    })
    .addStringOption((option) => {
      return option
        .setName("message")
        .setDescription("The message (not embeded)")
        .setRequired(false);
    })
    .addStringOption((option) => {
      return option
        .setName("id")
        .setDescription("The message id to edit")
        .setRequired(false);
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

      let id = interaction.options.get("id")?.value?.toString() || undefined;
      let retrievedMessage = await channel.messages.fetch(id);
      if (id && !retrievedMessage) throw new Error("Message to edit found");

      let message = options.get("message")?.value?.toString() || undefined;

      let description = options.get("description").value.toString();
      if (!description || description.length <= 0)
        throw new Error("Description is required");

      let files: Attachment[] = [];
      for (let i = 0; i <= 3; i++) {
        let file = options.get(`file${i}`);
        if (file) files.push(file.attachment);
      }
      let file = new AttachmentBuilder(
        join(__dirname, "../assets/imgs/icon.png")
      );
      let embed = client.functions.embedify({
        description: client.functions.parseTxt(description),
        author: {
          name: interaction.user.username + ` from ${BOT_CONFIG.name}`,
          iconURL: interaction.user.displayAvatarURL({ extension: "jpg" }),
        },
        thumbnail: "attachment://icon.png",
      });

      let payload = {
        content: message ? client.functions.parseTxt(message) : "",
        embeds: [embed],
        files: [file],
      };

      let filesPayload = {
        content: "",
        files: files,
      };

      if (id && retrievedMessage) {
        await retrievedMessage.edit(payload);
      } else {
        await channel.send(payload);
        await channel.send(filesPayload);
      }

      await client.functions.reply.success({
        interaction: interaction,
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
