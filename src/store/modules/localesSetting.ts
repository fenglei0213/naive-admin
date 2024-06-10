import type { LocaleSetting, LocaleType } from '/#/config';

import { defineStore } from 'pinia';
import { store } from '@/store';

import { localeSetting } from '@/settings/localeSetting';

const lsLocaleSetting = localeSetting as LocaleSetting;

export const useLocalesStore = defineStore({
  id: 'app-language-setting',
  state: (): LocaleSetting => ({
    showPicker: lsLocaleSetting.showPicker,
    locale: lsLocaleSetting.locale,
    fallback: lsLocaleSetting.fallback,
    availableLocales: lsLocaleSetting.availableLocales,
  }),
  persist: true,
  getters: {
    getShowPicker(): boolean {
      return !!this.showPicker;
    },
    getLocale(): LocaleType {
      return this.locale;
    },
  },
  actions: {
    /**
     * 设置语言
     */
    setLocale(value: Partial<LocaleType>) {
      this.locale = value;
    },
  },
});

// 需要在安装程序之外使用
export function useLocalesStoreWithOut() {
  return useLocalesStore(store);
}
