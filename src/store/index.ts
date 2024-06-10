import type { App } from 'vue';
import { createPinia, getActivePinia, defineStore } from 'pinia';
import piniaPersist from 'pinia-plugin-persistedstate';

const store = createPinia();

export function setupStore(app: App<Element>) {
  store.use(piniaPersist);
  app.use(store);
}

// storeIds 对应 src\store\modules 中模块 id
export function resetStore() {
  const storeIds = ['app-user', 'app-async-route'];
  const activePinia = getActivePinia();
  if (activePinia) {
    Object.entries(activePinia.state.value).forEach(([name, state]) => {
      if (storeIds.includes(name)) {
        const definition = defineStore(name, state);
        const _store = definition(activePinia);
        _store.$reset();
      }
    });
  }
}

export { store };
