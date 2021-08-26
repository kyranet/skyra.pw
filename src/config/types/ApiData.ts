import type { ChannelTypeString } from '@sapphire/discord.js-utilities';
import type { LoginData } from '@sapphire/plugin-api';
import type { Guild } from 'discord.js';

export interface TransformedLoginData extends LoginData {
	transformedGuilds?: OauthFlattenedGuild[];
}

interface FlattenedGuild
	extends Pick<
		Guild,
		| 'afkChannelId'
		| 'afkTimeout'
		| 'applicationId'
		| 'approximateMemberCount'
		| 'approximatePresenceCount'
		| 'available'
		| 'banner'
		| 'defaultMessageNotifications'
		| 'description'
		| 'widgetEnabled'
		| 'explicitContentFilter'
		| 'features'
		| 'icon'
		| 'id'
		| 'joinedTimestamp'
		| 'mfaLevel'
		| 'name'
		| 'ownerId'
		| 'partnered'
		| 'preferredLocale'
		| 'premiumSubscriptionCount'
		| 'premiumTier'
		| 'splash'
		| 'systemChannelId'
		| 'vanityURLCode'
		| 'verificationLevel'
		| 'verified'
	> {
	channels: FlattenedGuildChannel[];

	emojis: FlattenedEmoji[];

	manageable: boolean;

	permissions?: number;

	roles: FlattenedRole[];

	skyraIsIn: boolean;
}

interface FlattenedEmoji {
	animated: boolean;

	available: boolean;

	id: string;

	managed: boolean;

	name: string;

	require_colons: boolean;

	roles: any[];
}

interface FlattenedRole {
	color: number;

	guildId: string;

	hoist: boolean;

	id: string;

	managed: boolean;

	mentionable: boolean;

	name: string;

	permissions: string;

	rawPosition: number;
}

interface FlattenedChannel {
	createdTimestamp: number;

	id: string;

	type: ChannelTypeString;
}

interface FlattenedGuildChannel extends FlattenedChannel {
	bitrate?: number;

	guildId: string;

	name: string;

	nsfw?: boolean;

	parentId: string | null;

	permissionOverwrites?: [string, { id: string; type: string; deny: number; allow: number }][];

	rateLimitPerUser?: number;

	rawPosition: number;

	topic?: string | null;

	type: ChannelTypeString;

	userLimit?: number;
}

export interface FlattenedNewsChannel extends FlattenedGuildChannel {
	nsfw: boolean;

	topic: string | null;

	type: 'GUILD_NEWS';
}

export interface FlattenedTextChannel extends FlattenedGuildChannel {
	nsfw: boolean;

	rateLimitPerUser: number;

	topic: string | null;

	type: 'GUILD_TEXT';
}

export interface FlattenedVoiceChannel extends FlattenedGuildChannel {
	bitrate: number;

	type: 'GUILD_VOICE';

	userLimit: number;
}

export interface FlattenedDMChannel extends FlattenedChannel {
	recipient: string;

	type: 'DM';
}

interface FlattenedUser {
	avatar: string | null;

	discriminator: string;

	flags: number;

	id: string;

	locale: string;

	mfa_enabled: boolean;

	premium_type: number;

	public_flags: number;

	username: string;
}

export interface FlattenedMember {
	guildId: string;

	id: string;

	joinedTimestamp: number | null;

	premiumSinceTimestamp: number | null;

	roles: FlattenedRole[];

	user: FlattenedUser;
}

export interface FlattenedCommand {
	category: string;

	description: string;

	extendedHelp: ExtendedHelp;

	guarded: boolean;

	name: string;

	permissionLevel: number;

	preconditions: Preconditions;
}

export interface Preconditions {
	entries: PreconditionsEntry[];

	mode: number;

	runCondition: number;
}

export interface PreconditionsEntry {
	entries: PreconditionEntryEntry[];

	mode: number;

	runCondition: number;
}

export interface PreconditionEntryEntry {
	context: unknown;

	name: string;
}

interface ExtendedHelp {
	examples?: (null | string)[];

	explainedUsage?: [string, string][];

	extendedHelp?: string;

	possibleFormats?: [string, string][];

	reminder?: string;

	usages?: string[];
}

interface PartialOauthFlattenedGuild extends Omit<FlattenedGuild, 'joinedTimestamp' | 'ownerId' | 'region' | 'features'> {
	joinedTimestamp: FlattenedGuild['joinedTimestamp'] | null;

	ownerId: FlattenedGuild['ownerId'] | null;
}

interface OauthFlattenedGuild extends PartialOauthFlattenedGuild {
	manageable: boolean;

	permissions: number;

	skyraIsIn: boolean;
}
