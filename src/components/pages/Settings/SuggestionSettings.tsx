import { ConfigurableEmojis, ConfigurableSuggestionActions } from '@config/SettingsDataEntries';
import { useGuildDataContext } from '@contexts/Settings/GuildDataContext';
import { useGuildSettingsChangesContext } from '@contexts/Settings/GuildSettingsChangesContext';
import { useGuildSettingsContext } from '@contexts/Settings/GuildSettingsContext';
import PageHeader from '@layout/Settings/PageHeader';
import Section from '@layout/Settings/Section';
import SimpleGrid from '@material/SimpleGrid';
import SelectBoolean from '@selects/SelectBoolean';
import SelectChannel from '@selects/SelectChannel';
import SelectEmoji from '@selects/SelectEmoji';
import { EmojiRegexExtractId } from '@utils/constants';
import { handleResetKey } from '@utils/util';
import React, { FC, memo, useMemo } from 'react';

const SuggestionSettings: FC = () => {
	const { guildData } = useGuildDataContext();
	const { guildSettings } = useGuildSettingsContext();
	const { guildSettingsChanges, setGuildSettingsChanges } = useGuildSettingsChangesContext();

	const findEmoji = useMemo(() => (id: string) => guildData.emojis.find((e) => e.id === id)!, [guildData.emojis]);
	const tagToId = useMemo(() => (tag: string) => tag.replace(EmojiRegexExtractId, '$1'), []);
	const idToTag = useMemo(() => (id: string, name: string, animated: boolean) => `${animated ? 'a' : ''}:${name}:${id}`, []);

	return (
		<>
			<PageHeader title="Suggestion system" subtitle="Here you can configure what Skyra will do with suggestions people make in your server" />

			<Section title="Channel">
				<SimpleGrid
					direction="row"
					justifyContent="flex-start"
					gridItemProps={{
						xs: 12,
						sm: 12,
						md: 4,
						lg: 4,
						xl: 4
					}}
				>
					<SelectChannel
						value={guildSettings.suggestionsChannel}
						label="Suggestions Channel"
						onReset={() => handleResetKey(guildSettingsChanges, setGuildSettingsChanges, 'suggestionsChannel')}
						onChange={(newChannel) =>
							setGuildSettingsChanges({
								suggestionsChannel: newChannel
							})
						}
						guild={guildData}
						ButtonProps={{
							fullWidth: true,
							sx: {
								minHeight: {
									lg: 'inherit',
									md: 60,
									xs: 'inherit'
								},
								display: 'flex',
								textAlign: 'left',
								alignItems: 'center',
								justifyContent: 'space-between'
							}
						}}
					/>
				</SimpleGrid>
			</Section>

			<Section title="Actions">
				<SimpleGrid>
					{ConfigurableSuggestionActions.map(({ title, key, description }, index) => (
						<SelectBoolean
							key={index}
							title={title}
							description={description}
							currentValue={guildSettings[key]}
							onChange={(event) =>
								setGuildSettingsChanges({
									[key]: event.target.checked
								})
							}
						/>
					))}
				</SimpleGrid>
			</Section>

			<Section title="Emojis">
				<SimpleGrid
					direction="row"
					justifyContent="flex-start"
					gridItemProps={{
						xs: 12,
						sm: 12,
						md: 4,
						lg: 4,
						xl: 4
					}}
				>
					{ConfigurableEmojis.map(({ title, description, key, defaultImage, defaultName, defaultId }, index) => (
						<SelectEmoji
							key={index}
							tooltipTitle={description}
							value={tagToId(guildSettings[key])}
							defaultImage={defaultImage}
							defaultName={defaultName}
							defaultId={defaultId}
							onReset={() => handleResetKey(guildSettingsChanges, setGuildSettingsChanges, key)}
							onChange={(emojiID: typeof guildSettings[typeof key] | null) => {
								if (emojiID) {
									const emojiData = findEmoji(emojiID);
									return setGuildSettingsChanges({
										[key]: idToTag(emojiID, emojiData.name, emojiData.animated)
									});
								}

								return setGuildSettingsChanges({
									[key]: idToTag(defaultId, defaultName, false)
								});
							}}
							guild={guildData}
							label={title}
							ButtonProps={{
								fullWidth: true,
								sx: {
									minHeight: {
										lg: 'inherit',
										md: 60,
										xs: 'inherit'
									},
									display: 'flex',
									textAlign: 'left',
									alignItems: 'center',
									justifyContent: 'space-between'
								}
							}}
						/>
					))}
				</SimpleGrid>
			</Section>
		</>
	);
};

export default memo(SuggestionSettings);
