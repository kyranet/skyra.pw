import type { TransformedLoginData } from '@config/types/ApiData';
import React, { memo, PropsWithChildren } from 'react';
import type { ValuesType } from 'utility-types';
import SelectMany, { SelectManyProps } from './SelectMany';

export interface SelectChannelsProps extends Omit<SelectManyProps, 'values' | 'name'> {
	guild: ValuesType<NonNullable<TransformedLoginData['transformedGuilds']>>;
}

const SelectChannels = ({ label, value, guild, onChange, tooltipTitle, ...props }: PropsWithChildren<SelectChannelsProps>) => (
	<SelectMany
		{...props}
		name={value.length}
		label={label}
		value={value}
		onChange={onChange}
		tooltipTitle={tooltipTitle}
		values={guild.channels
			.filter((c) => c.type === 'GUILD_TEXT' || c.type === 'GUILD_NEWS')
			.sort((c1, c2) => c1.rawPosition - c2.rawPosition)
			.map((c) => ({ name: c.name, value: c.id }))}
	/>
);

export default memo(SelectChannels);
