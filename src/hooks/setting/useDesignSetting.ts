import { computed } from 'vue';
import { useDesignSettingWithOut } from '@/store/modules/designSetting';

export function useDesignSetting() {
  const designStore = useDesignSettingWithOut();

  const getDarkTheme = computed(() => designStore.darkTheme);

  const getAppTheme = computed(() => designStore.appTheme);

  const getAppThemeList = computed(() => designStore.appThemeList);

  return {
    getDarkTheme,
    getAppTheme,
    getAppThemeList,
  };
}
