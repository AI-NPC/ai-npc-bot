import { EmbedBuilder } from "discord.js";

const ErrorEmbed = ({
  message = undefined,
}: {
  message?: string;
}): EmbedBuilder => {
  let string: string =
    "❌ " + message ? message : "Something wrong happened. Try again later...";
  return new EmbedBuilder().setDescription(string).setColor("#ff0000");
};

export default ErrorEmbed;
