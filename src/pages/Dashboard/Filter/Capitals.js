import React, { Fragment } from 'react';
import { MenuItem, Typography } from '@material-ui/core';

import Select from 'components/Select/Select';
import SelectBoolean from 'components/Select/SelectBoolean';
import SelectDuration from 'components/Select/SelectDuration';

import Slider from 'components/Slider';
import SimpleGrid from 'components/SimpleGrid';
import Section from 'components/Section';
import { bitwiseSet, bitwiseHas } from 'meta/util';

const CapitalsFilterPage = props => {
	const { capitals } = props.guildSettings.selfmod;

	return (
		<Fragment>
			<Section title="Capital Letters Filter">
				<SimpleGrid>
					<SelectBoolean
						title={`Filter ${capitals.enabled ? 'Enabled' : 'Disabled'}`}
						onChange={bool => props.patchGuildData({ selfmod: { capitals: { enabled: bool } } })}
						currentValue={capitals.enabled}
						description="Whether or not this system should be enabled."
					/>
					<SelectBoolean
						title={`Alerts ${bitwiseHas(capitals.softAction, 0b100) ? 'Enabled' : 'Disabled'}`}
						onChange={bool =>
							props.patchGuildData({ selfmod: { capitals: { softAction: bitwiseSet(capitals.softAction, 0b100, bool) } } })
						}
						currentValue={bitwiseHas(capitals.softAction, 0b100)}
						description="Toggle message alerts in the channel the infraction took place."
					/>
					<SelectBoolean
						title={`Logs ${bitwiseHas(capitals.softAction, 0b010) ? 'Enabled' : 'Disabled'}`}
						onChange={bool =>
							props.patchGuildData({ selfmod: { capitals: { softAction: bitwiseSet(capitals.softAction, 0b010, bool) } } })
						}
						currentValue={bitwiseHas(capitals.softAction, 0b010)}
						description="Toggle message logs in the moderation logs channel."
					/>
					<SelectBoolean
						title={`Deletes ${bitwiseHas(capitals.softAction, 0b001) ? 'Enabled' : 'Disabled'}`}
						onChange={bool =>
							props.patchGuildData({ selfmod: { capitals: { softAction: bitwiseSet(capitals.softAction, 0b001, bool) } } })
						}
						currentValue={bitwiseHas(capitals.softAction, 0b001)}
						description="Toggle message deletions."
					/>
				</SimpleGrid>
			</Section>
			<Section title="Punishments">
				<SimpleGrid direction="row" justify="flex-start">
					<Select
						title="Action"
						helperText="The action to perform as punishment"
						value={capitals.hardAction}
						onChange={e => props.patchGuildData({ selfmod: { capitals: { hardAction: e.target.value } } })}
					>
						<MenuItem value={0}>None</MenuItem>
						<MenuItem value={1}>Warning</MenuItem>
						<MenuItem value={2}>Kick</MenuItem>
						<MenuItem value={3}>Mute</MenuItem>
						<MenuItem value={4}>Softban</MenuItem>
						<MenuItem value={5}>Ban</MenuItem>
					</Select>
					<SelectDuration
						value={capitals.hardActionDuration}
						min={1000}
						onChange={duration => props.patchGuildData({ selfmod: { capitals: { hardActionDuration: duration } } })}
					></SelectDuration>
				</SimpleGrid>
				<Typography>Maximum Threshold</Typography>
				<Slider
					value={capitals.thresholdMaximum}
					onChange={(_, e) => props.patchGuildData({ selfmod: { capitals: { thresholdMaximum: e } } })}
					aria-labelledby="Capitals selfmod filter maximum threshold slider"
					valueLabelDisplay="auto"
					min={0}
					max={60}
				/>
				<Typography>Threshold Duration</Typography>
				<Slider
					value={capitals.thresholdDuration}
					onChange={(_, e) => props.patchGuildData({ selfmod: { capitals: { thresholdDuration: e } } })}
					aria-labelledby="Capitals selfmod filter threshold duration slider"
					valueLabelDisplay="auto"
					min={0}
					max={120}
				/>
			</Section>
			<Section title="Options">
				<Typography>Minimum Characters</Typography>
				<Slider
					value={capitals.minimum}
					onChange={(_, e) => props.patchGuildData({ selfmod: { capitals: { minimum: e } } })}
					aria-labelledby="Capitals selfmod filter minimum characters slider"
					valueLabelDisplay="auto"
					min={5}
					max={2000}
				/>
				<Typography>Maximum Uppercase Characters (%)</Typography>
				<Slider
					value={capitals.maximum}
					onChange={(_, e) => props.patchGuildData({ selfmod: { capitals: { maximum: e } } })}
					aria-labelledby="Capitals selfmod filter maximum uppercase characters slider"
					valueLabelDisplay="auto"
					min={10}
					max={100}
				/>
			</Section>
		</Fragment>
	);
};

export default CapitalsFilterPage;
