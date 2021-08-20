<template>
	<h1>Hello!</h1>
	<input-switch v-model:value="checked" />
	{{ checked ? 'Checked!' : 'Unchecked!' }}

	<br />

	<input-text v-model:value="text" />
	{{ text }}

	<br />

	<input-slider v-model:value="slider" :min="0" :max="100" />
	{{ slider }}

	<br />

	<input-select
		v-model:value="city"
		:options="[
			{ name: 'Madrid', value: 'madrid' },
			{ name: 'Cochin,KL', value: 'cochin' },
			{ name: 'Mumbai,MH', value: 'mumbai' }
		]"
	/>
	{{ city }}
</template>

<script setup lang="ts">
import { ref } from 'vue';
import InputSwitch from '~/components/input/input-switch.vue';
import InputText from '~/components/input/input-text.vue';
import InputSlider from '~/components/input/input-slider.vue';
import InputSelect from '~/components/input/input-select.vue';

const checked = ref(false);
const text = ref('');
const slider = ref(0);
const city = ref('');
</script>
