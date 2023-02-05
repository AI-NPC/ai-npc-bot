import {
  EmbedBuilder,
  EmbedFooterOptions,
  EmbedField,
  EmbedAuthorOptions,
  ColorResolvable,
} from "discord.js";

export type EmbedifyOptions = {
  title?: string;
  description?: string;
  color?: ColorResolvable;
  fields?: EmbedField[];
  thumbnail?: string;
  image?: string;
  author?: EmbedAuthorOptions;
  footer?: EmbedFooterOptions;
  timestamp?: Date | number;
};
export type EmbedifyFunction = (options: EmbedifyOptions) => EmbedBuilder;

module.exports = (options: EmbedifyOptions): EmbedBuilder => {
  const embed = new EmbedBuilder();
  if (options.title) embed.setTitle(options.title);
  if (options.description) embed.setDescription(options.description);
  embed.setColor(options.color ? options.color : "Random");
  if (options.fields)
    options.fields.forEach((field) =>
      embed.addFields({
        name: field.name,
        value: field.value,
        inline: field.inline,
      })
    );
  if (options.thumbnail) embed.setThumbnail(options.thumbnail);
  if (options.image) embed.setImage(options.image);
  if (options.footer) embed.setFooter(options.footer);
  if (options.author) embed.setAuthor(options.author);

  if (options.timestamp) embed.setTimestamp(options.timestamp);
  return embed;
};
