import { Client, Collection, IntentsBitField } from "discord.js";
import { Command } from "../types";
import { join } from "path";
import { readdirSync } from "fs";
import { TOKEN } from "./helpers/envs";

const intents = new IntentsBitField(3276799);
const client = new Client({ intents });

client.commands = new Collection<string, Command>();

const handlersDir = join(__dirname, "./handlers");
readdirSync(handlersDir).forEach((handler) => {
  require(`${handlersDir}/${handler}`)(client);
});

client.login(TOKEN);
