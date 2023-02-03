import {} from "discord.js";

module.exports = (content?: string): string => {
  if (!content) return undefined;
  return content.split("//n").join("\n");
};
