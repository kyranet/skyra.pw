import { InjectionKey } from 'vue';
import { createStore, Store, useStore as baseUseStore } from 'vuex';

export interface State {
	theme: 'light' | 'dark';
}

export const key: InjectionKey<Store<State>> = Symbol('skyra');

export const store = createStore<State>({
	state: {
		theme: 'light'
	}
});

export function useStore() {
	return baseUseStore(key);
}
