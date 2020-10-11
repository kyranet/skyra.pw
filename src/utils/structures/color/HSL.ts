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

/* eslint-disable import/first */
import { ColorHandler } from './index';

export class HSL implements ColorHandler {
	public h: number;
	public s: number;
	public l: number;

	/**
	 * HSL Parser.
	 * @param h Hue. (0 - 360)
	 * @param s Saturation. (0 - 100)
	 * @param l Lightness. (0 - 100)
	 */
	public constructor(h: number | string, s: number | string, l: number | string) {
		this.h = Number(h);
		this.s = Number(s);
		this.l = Number(l);

		this.check();
	}

	public check() {
		if (this.h < 0 || this.h > 360) throw `Invalid Hue range. Must be between 0 and 360, and it is ${this.h}`;
		if (this.s < 0 || this.s > 100) throw `Invalid Saturation range. Must be between 0 and 100, and it is ${this.s}`;
		if (this.l < 0 || this.l > 100) throw `Invalid Lightness range. Must be between 0 and 100, and it is ${this.l}`;
	}

	public get Hex() {
		return this.Rgb.Hex;
	}

	public get Rgb() {
		const h = this.h / 360;
		const s = this.s / 100;
		const l = this.l / 100;
		/* Parse HSL to RGB */
		let r: number | undefined = undefined;
		let g: number | undefined = undefined;
		let b: number | undefined = undefined;

		if (s === 0) {
			/* Achromatic */
			r = l;
			g = l;
			b = l;
		} else {
			const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
			const p = 2 * l - q;
			r = HSL.hue2rgb(p, q, h + 1 / 3);
			g = HSL.hue2rgb(p, q, h);
			b = HSL.hue2rgb(p, q, h - 1 / 3);
		}
		// eslint-disable-next-line @typescript-eslint/no-use-before-define
		return new RGB(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255));
	}

	public get Hsl() {
		return this;
	}

	public get B10() {
		return this.Hex.B10;
	}

	public toString() {
		return String(`hsl(${this.h}, ${this.s}, ${this.l})`);
	}

	public static hue2rgb(p: number, q: number, t: number) {
		if (t < 0) t += 1;
		if (t > 1) t -= 1;
		if (t < 1 / 6) return p + (q - p) * 6 * t;
		if (t < 1 / 2) return q;
		if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
		return p;
	}
}

import { RGB } from './RGB';
