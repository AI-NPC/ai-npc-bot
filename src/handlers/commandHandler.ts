import { Client } from "discord.js";
import { readdirSync } from "fs";
import { join } from "path";
import { REST, Routes } from "discord.js";
import { APP_ID, TOKEN } from "../helpers/envs";
import { Command } from "../../types";

module.exports = async (client: Client) => {
  const slashCommandsDir = join(__dirname, "../commands");
  const body = [];

  readdirSync(slashCommandsDir).forEach((file) => {
    if (!file.endsWith(".js")) return;

    const command: Command = require(`${slashCommandsDir}/${file}`).command;

    client.commands.set(command.name, command);
    body.push(command.data.toJSON());
    console.log(`🌠 Successfully added command ${file}`);
  });

  const rest = new REST({ version: "10" }).setToken(TOKEN);

  try {
    await rest.put(Routes.applicationCommands(APP_ID), {
      body: body,
    });
    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
};
