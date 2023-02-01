import { ButtonInteraction } from "./../../node_modules/discord.js/typings/index.d";
import {
  Events,
  Interaction,
  InteractionType,
  CommandInteraction,
} from "discord.js";
import { BotEvent, Button, Command, Select } from "../../types";

const event: BotEvent = {
  name: Events.InteractionCreate,
  once: false,
  async execute(interaction) {
    console.log(interaction.type);
    if (!interaction) return;
    if (interaction.type === InteractionType.ApplicationCommand) {
      const command: Command = interaction.client.commands.get(
        interaction.commandName
      );
      if (!command) return;
      await command.execute(interaction);
    } else if (interaction.type === InteractionType.ModalSubmit) {
      const command = require(`../generators/modals/${interaction.customId}.js`);
      if (!command) return;
      await command.execute(interaction);
    } else if (interaction.isButton()) {
      let id = interaction.customId;
      if (id.includes("talk")) id = "talk";
      let button: Button = require(`../generators/buttons/${id}.js`);
      console.log(button?.id);
      if (button) await button.execute(interaction);
    } else if (interaction.type === InteractionType.MessageComponent) {
      let id = interaction.customId;
      let select: Select = require(`../generators/selects/${id}.js`);
      if (select) await select.execute(interaction);
    }
  },
};

export default event;
