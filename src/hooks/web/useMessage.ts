import { computed, ref } from 'vue';
import { createDiscreteApi, ConfigProviderProps, darkTheme, lightTheme } from 'naive-ui';

const themeRef = ref<'light' | 'dark'>('light');

const configProviderPropsRef = computed<ConfigProviderProps>(() => ({
  theme: themeRef.value === 'light' ? lightTheme : darkTheme,
}));

const { message } = createDiscreteApi(['message'], {
  configProviderProps: configProviderPropsRef,
});

export function useMessage() {
  function destroyAll() {
    message?.destroyAll();
  }

  function create(content, option?) {
    message?.create(content, option);
  }

  function error(content, option?) {
    message?.error(content, option);
  }

  function info(content, option?) {
    message?.info(content, option);
  }

  function loading(content, option?) {
    message?.loading(content, option);
  }

  function success(content, option?) {
    message?.success(content, option);
  }

  function warning(content, option?) {
    message?.warning(content, option);
  }

  return {
    destroyAll,
    create,
    error,
    info,
    loading,
    success,
    warning,
  };
}
