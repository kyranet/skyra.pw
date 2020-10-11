/**
 * Copyright 2019-2020 Antonio Román
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as Resolver from './structures/color';

export const REGEXP = {
	B10: /^\d{1,8}$/,
	HEX: /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/i,
	HEX_EXEC: /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/i,
	HSL: /^hsl\(\d{1,3},\s?\d{1,3},\s?\d{1,3}\)$/i,
	HSL_EXEC: /^hsl\((\d{1,3}),\s?(\d{1,3}),\s?(\d{1,3})\)$/i,
	RANDOM: /^(?:r|random)$/i,
	RGB: /^rgba?\(\d{1,3},\s?\d{1,3},\s?\d{1,3}(?:,.+)?\)$/i,
	RGB_EXEC: /^rgba?\((\d{1,3}),\s?(\d{1,3}),\s?(\d{1,3})(?:,.+)?\)$/i
};

export function parse(input: string): Resolver.ColorHandler {
	if (REGEXP.RANDOM.test(input)) return generateRandom();
	const output = HEX(input) || B10(input) || RGB(input) || HSL(input);

	if (output === null) throw `${input} is not a supported type.`;
	return output;
}

function generateBetween(max: number, min: number): number {
	return Math.floor(Math.random() * (max - min)) + 1 + min;
}

export function luminance(r: number, g: number, b: number): number {
	return 0.299 * r ** 2 + 0.587 * g ** 2 + 0.114 * b ** 2;
}

export function hexConcat(r: number, g: number, b: number) {
	return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

function generateRandom() {
	return new Resolver.HSL(generateBetween(360, 0), generateBetween(100, 75), generateBetween(100, 65));
}

function HEX(input: string) {
	if (!REGEXP.HEX.test(input)) return null;
	let raw = REGEXP.HEX_EXEC.exec(input)![1];
	if (raw.length === 3)
		raw = raw
			.split('')
			.map(char => char + char)
			.join('');
	return new Resolver.HEX(raw.substring(0, 2), raw.substring(2, 4), raw.substring(4, 6));
}

function RGB(input: string) {
	if (!REGEXP.RGB.test(input)) return null;
	const raw = REGEXP.RGB_EXEC.exec(input)!;
	return new Resolver.RGB(parseInt(raw[1], 10), parseInt(raw[2], 10), parseInt(raw[3], 10));
}

function HSL(input: string) {
	if (!REGEXP.HSL.test(input)) return null;
	const raw = REGEXP.HSL_EXEC.exec(input)!;
	return new Resolver.HSL(parseInt(raw[1], 10), parseInt(raw[2], 10), parseInt(raw[3], 10));
}

function B10(input: string) {
	if (!REGEXP.B10.test(input)) return null;
	return new Resolver.B10(input);
}
