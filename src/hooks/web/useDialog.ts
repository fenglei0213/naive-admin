import { computed, ref } from 'vue';
import { createDiscreteApi, ConfigProviderProps, darkTheme, lightTheme } from 'naive-ui';

const themeRef = ref<'light' | 'dark'>('light');

const configProviderPropsRef = computed<ConfigProviderProps>(() => ({
  theme: themeRef.value === 'light' ? lightTheme : darkTheme,
}));

const { dialog } = createDiscreteApi(['dialog'], {
  configProviderProps: configProviderPropsRef,
});

export function useDialog() {
  function destroyAll() {
    dialog?.destroyAll();
  }

  function create(option) {
    dialog?.create(option);
  }

  function error(option) {
    dialog?.error(option);
  }

  function info(option) {
    dialog?.info(option);
  }

  function success(option) {
    dialog?.success(option);
  }

  function warning(option) {
    dialog?.warning(option);
  }

  return {
    destroyAll,
    create,
    error,
    info,
    success,
    warning,
  };
}
