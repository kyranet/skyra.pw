<template>
	<input type="checkbox" class="rounded-md text-green-600" :value="value" @change="$emit('update:value', getValue($event))" />
</template>

<script setup lang="ts">
defineProps<{ value: boolean }>();
defineEmits<(event: 'update:value', value: boolean) => void>();

function getValue(event: Event) {
	return (event.target as HTMLInputElement).checked;
}
</script>
