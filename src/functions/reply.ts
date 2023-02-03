import {} from "discord.js";
import ErrorEmbed from "../components/embeds/Error";
import SuccessEmbed from "../components/embeds/Success";

export type ReplyFunction = {
  error: ({
    interaction,
    message,
  }: {
    interaction: any;
    message?: string;
  }) => Promise<void>;
  success: ({
    interaction,
    message,
    fields,
  }: {
    interaction: any;
    message?: string;
    fields?: any[];
  }) => Promise<void>;
};

module.exports = {
  error: async ({
    interaction = undefined,
    message = undefined,
  }: {
    interaction: any;
    message?: string;
  }): Promise<void> => {
    let embed = ErrorEmbed({ message: message });
    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
  success: async ({
    interaction = undefined,
    message = undefined,
    fields = undefined,
  }: {
    interaction: any;
    message?: string;
    fields?: any[];
  }): Promise<void> => {
    let embed = SuccessEmbed({
      message: message,
      fields: fields,
    });
    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
} as ReplyFunction;
