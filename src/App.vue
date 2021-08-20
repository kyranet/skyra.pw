<template>
	<div id="container" class="min-h-full grid grid-layout bg-gray-50 dark:bg-gray-800 dark:text-gray-100 lg:custom-scroll">
		<app-navbar />
		<div>
			<div>
				<router-view />
			</div>
			<app-footer />
		</div>
	</div>
</template>

<script setup lang="ts">
import AppFooter from './components/sections/app-footer.vue';
import AppNavbar from './components/sections/app-navbar.vue';
// import { useStore } from './store';

// const store = useStore();
// void store.dispatch('init');
</script>

<style>
.grid-layout {
	grid-template-rows: auto 1fr;
}
.grid-layout-container {
	grid-template-rows: 1fr auto;
}
</style>
