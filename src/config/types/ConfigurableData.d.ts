import type { ReactNode } from 'react';

export namespace Suggestions {
	export interface OnAction {
		description: string;

		key: `suggestionsOnAction${'Dm' | 'RePost' | 'HideAuthor'}`;

		title: string;
	}

	export interface Emoji {
		defaultId: string;

		defaultImage: `https://cdn.discordapp.com/emojis/${string}.${'gif' | 'png'}`;

		defaultName: string;

		description: string;

		key: `suggestionsEmojis${'DownVote' | 'UpVote'}`;

		title: string;
	}
}

export namespace Roles {
	export interface Role {
		key: `roles${
			| 'Admin'
			| 'Initial'
			| 'Moderator'
			| 'Muted'
			| 'RestrictedReaction'
			| 'RestrictedEmbed'
			| 'RestrictedAttachment'
			| 'RestrictedEmoji'
			| 'RestrictedVoice'
			| 'Public'
			| 'RemoveInitial'
			| 'Dj'
			| 'Subscriber'}`;

		name: string;

		tooltip: string;
	}
}

export namespace Moderation {
	export interface Message {
		description: string;

		key: `messages${
			| 'AnnouncementEmbed'
			| 'ModerationDm'
			| 'ModerationReasonDisplay'
			| 'ModerationMessageDisplay'
			| 'ModerationAutoDelete'
			| 'ModeratorNameDisplay'}`;

		name: string;
	}
}

export namespace Messages {
	export interface Message {
		key: `messages${'Farewell' | 'Greeting' | 'JoinDM'}`;

		name: string;

		placeholder?: string;

		tooltipText: NonNullable<ReactNode>;
	}
}

export namespace Events {
	export interface Event {
		description: string;

		key: `events${'BanAdd' | 'BanRemove' | 'TwemojiReactions'}`;

		title: string;
	}
}

export namespace DisableCommands {
	export interface Command {
		category: string;

		description: string;

		isEnabled: boolean;

		name: string;
	}
}

export namespace General {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	export type Form = {
		prefix: string;
	};
}

export namespace CustomCommands {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	export type Form = {
		id: string;
		content: string;
		color: string;
		embed: boolean;
	};
}

export namespace Channels {
	export interface Channel {
		description: string;

		key:
			| `channels${'Announcements' | 'Greeting' | 'Farewell' | 'Spam'}`
			| `channelsLogs${
					| 'ChannelCreate'
					| 'ChannelDelete'
					| 'ChannelUpdate'
					| 'EmojiCreate'
					| 'EmojiDelete'
					| 'EmojiUpdate'
					| 'Image'
					| 'MemberAdd'
					| 'MemberRemove'
					| 'MemberNickNameUpdate'
					| 'MemberUserNameUpdate'
					| 'MemberRolesUpdate'
					| 'MessageDelete'
					| 'MessageDeleteNsfw'
					| 'MessageUpdate'
					| 'MessageUpdateNsfw'
					| 'Moderation'
					| 'Prune'
					| 'Reaction'
					| 'RoleCreate'
					| 'RoleDelete'
					| 'RoleUpdate'
					| 'ServerUpdate'}`;

		name: string;
	}

	export interface IgnoreChannel {
		description: string;

		key: `channelsIgnore${'All' | 'MessageDeletes' | 'MessageEdits' | 'ReactionAdds'}`;

		name: string;
	}
}

export namespace Selfmod {
	type SelfmodKeyHelper<P1 extends string[]> = `selfmod${Capitalize<P1[0]>}${P1[1] extends string ? Capitalize<P1[1]> : ''}${P1[2] extends string
		? Capitalize<P1[2]>
		: ''}`;

	type Split<S extends string> = string extends S ? string[] : S extends '' ? [] : S extends `${infer T}.${infer U}` ? [T, ...Split<U>] : [S];

	export type Union =
		| SelfmodKeyHelper<Split<'capitals.thresholdDuration'>>
		| SelfmodKeyHelper<Split<'capitals.thresholdMaximum'>>
		| SelfmodKeyHelper<Split<'capitals.maximum'>>
		| SelfmodKeyHelper<Split<'capitals.minimum'>>
		| SelfmodKeyHelper<Split<'invites.thresholdMaximum'>>
		| SelfmodKeyHelper<Split<'invites.thresholdDuration'>>
		| SelfmodKeyHelper<Split<'links.thresholdMaximum'>>
		| SelfmodKeyHelper<Split<'links.thresholdDuration'>>
		| SelfmodKeyHelper<Split<'messages.thresholdMaximum'>>
		| SelfmodKeyHelper<Split<'messages.thresholdDuration'>>
		| SelfmodKeyHelper<Split<'newlines.thresholdMaximum'>>
		| SelfmodKeyHelper<Split<'newlines.thresholdDuration'>>
		| SelfmodKeyHelper<Split<'newlines.maximum'>>
		| SelfmodKeyHelper<Split<'reactions.thresholdMaximum'>>
		| SelfmodKeyHelper<Split<'reactions.thresholdDuration'>>
		| SelfmodKeyHelper<Split<'filter.thresholdMaximum'>>
		| SelfmodKeyHelper<Split<'filter.thresholdDuration'>>;
}
