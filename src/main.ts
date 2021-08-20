import { createApp } from 'vue';
import VueTippy from 'vue-tippy';

import App from './App.vue';
import { store, key } from './store';
import router from './router';

import './styles/index.css';

const app = createApp(App);
app.use(store, key);
app.use(router);
app.use(VueTippy);
app.mount('#app');
