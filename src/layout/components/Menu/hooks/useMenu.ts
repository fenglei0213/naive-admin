import { computed } from 'vue';
import { useI18n } from '@/hooks/web/useI18n';
import { isString } from '@/utils/is';
import { useProjectSettingStore } from '@/store/modules/projectSetting';

export function useMenu() {
  const settingStore = useProjectSettingStore();

  function getI18nTitle(title) {
    const { t } = useI18n();
    if (!isString(title) || (isString(title) && title.indexOf('.') === -1)) return title;
    return t(title);
  }

  function replaceI18nTitle(menus) {
    const repeat = (list) => {
      list.forEach((item) => {
        item.meta.title = getI18nTitle(item.meta.title);
        if (item.children) {
          repeat(item.children);
        }
      });
    };
    repeat(menus);
    return menus;
  }

  const getMenuInverted = computed(() => {
    if (settingStore.navTheme === 'light') return false;
    return true;
  });

  const getTopMenuInverted = computed(() => {
    if (settingStore.navTheme === 'header-dark') return true;
    return false;
  });

  return {
    replaceI18nTitle,
    getI18nTitle,
    getMenuInverted,
    getTopMenuInverted,
  };
}
