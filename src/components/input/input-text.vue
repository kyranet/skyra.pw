<template>
	<input type="text" class="rounded-md text-gray-800" :value="value" @input="$emit('update:value', getValue($event))" />
</template>

<script setup lang="ts">
defineProps<{ value: string }>();
defineEmits<(event: 'update:value', value: string) => void>();

function getValue(event: Event) {
	return (event.target as HTMLInputElement).value;
}
</script>
