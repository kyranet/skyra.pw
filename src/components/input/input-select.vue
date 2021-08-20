<template>
	<select class="text-gray-800 rounded-md" :value="value" @input="$emit('update:value', getValue($event))">
		<option v-for="option in options" :key="option.name" :value="option.value">{{ option.name }}</option>
	</select>
</template>

<script setup lang="ts">
defineProps<{ value: string; options: readonly Option[] }>();
defineEmits<(event: 'update:value', value: string) => void>();

function getValue(event: Event) {
	return (event.target as HTMLInputElement).value;
}

export interface Option {
	name: string;
	value: string;
}
</script>
