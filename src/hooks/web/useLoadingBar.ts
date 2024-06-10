import { computed, ref } from 'vue';
import { createDiscreteApi, ConfigProviderProps, darkTheme, lightTheme } from 'naive-ui';
import { useDesignSetting } from '@/hooks/setting/useDesignSetting';

const designStore = useDesignSetting();
const appTheme = designStore.getAppTheme;

const themeRef = ref<'light' | 'dark'>('light');

const configProviderPropsRef = computed<ConfigProviderProps>(() => ({
  theme: themeRef.value === 'light' ? lightTheme : darkTheme,
}));

const { loadingBar } = createDiscreteApi(['loadingBar'], {
  configProviderProps: configProviderPropsRef,
  loadingBarProviderProps: {
    loadingBarStyle: {
      loading: { background: appTheme.value },
    },
  },
});

export function useLoadingBar() {
  function start() {
    loadingBar?.start();
  }

  function finish() {
    loadingBar?.finish();
  }

  return {
    start,
    finish,
  };
}
