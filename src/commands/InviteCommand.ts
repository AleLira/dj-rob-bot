import { BaseCommand } from "../structures/BaseCommand";
import { DefineCommand } from "../utils/decorators/DefineCommand";
import { createEmbed } from "../utils/createEmbed";
import { disableInviteCmd } from "../config";
import { Message } from "discord.js";

@DefineCommand({
    name: "invite",
    description: "Send the bot's invite link",
    usage: "{prefix}invite",
    disable: disableInviteCmd
})
export class InviteCommand extends BaseCommand {
    public async execute(message: Message): Promise<void> {
        message.channel.send(
            createEmbed("info")
                .addField("Discord bot invite link", `[Click here](${await this.client.generateInvite({ permissions: 53857345 })})`)
        ).catch(e => this.client.logger.error("PLAY_CMD_ERR:", e));
    }
}
