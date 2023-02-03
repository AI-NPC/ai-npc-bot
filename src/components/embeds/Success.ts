import { EmbedBuilder } from "discord.js";
import BOT_CONFIG from "../../config/bot";

const SuccessEmbed = ({
  message = `Command done successfully! Thanks for using ${BOT_CONFIG.emoji}`,
  fields = [],
}: {
  message: string;
  fields?: any[];
}) => {
  let embed = new EmbedBuilder()
    .setDescription("✅ " + message)
    .setColor("Green");

  if (!(fields?.length > 0)) return embed;
  for (let i = 0; i < fields?.length; i++) {
    embed.addFields([
      {
        name: fields[i].name,
        value: fields[i].value,
      },
    ]);
  }
  return embed;
};

export default SuccessEmbed;
