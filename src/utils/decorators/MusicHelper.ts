import { Inhibit } from "./Inhibit";
import { createEmbed } from "../createEmbed";

export function isMusicQueueExists(): any {
    return Inhibit(message => {
        if (message.guild?.queue === null) return message.channel.send(createEmbed("warn", "There is nothing playing."));
    });
}

export function isSameVoiceChannel(): any {
    return Inhibit(message => {
        if (!message.guild?.me?.voice.channel) return undefined;
        const botVoiceChannel = message.guild.queue?.voiceChannel?.id ?? message.guild.me.voice.channel.id;
        if (message.member?.voice.channel?.id !== botVoiceChannel) {
            return message.channel.send(
                createEmbed("warn", "You need to be in the same voice channel as mine")
            );
        }
    });
}

export function isUserInTheVoiceChannel(): any {
    return Inhibit(message => {
        if (!message.member?.voice.channel) {
            return message.channel.send(
                createEmbed("warn", "I'm sorry, but you need to be in a voice channel to do that")
            );
        }
    });
}

export function isValidVoiceChannel(): any {
    return Inhibit(message => {
        const voiceChannel = message.member?.voice.channel;
        if (voiceChannel?.id === message.guild?.me?.voice.channel?.id) return undefined;
        if (!voiceChannel?.joinable) {
            return message.channel.send(createEmbed("error", "I'm sorry, but I can't connect to your voice channel, make sure I have the proper permissions!"));
        }
        if (!voiceChannel.speakable) {
            voiceChannel.leave();
            return message.channel.send(createEmbed("error", "I'm sorry, but I can't speak in this voice channel. make sure I have the proper permissions!"));
        }
    });
}
