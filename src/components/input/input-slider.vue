<template>
	<input type="range" :value="value" @change="$emit('update:value', getValue($event))" />
</template>

<script setup lang="ts">
defineProps<{ value: number }>();
defineEmits<(event: 'update:value', value: number) => void>();

function getValue(event: Event) {
	return (event.target as HTMLInputElement).valueAsNumber;
}
</script>
