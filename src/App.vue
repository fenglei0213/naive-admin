<template>
  <n-config-provider
    :date-locale="getDateLocale"
    :locale="getLocale"
    :theme="getDarkTheme"
    :theme-overrides="getThemeOverrides"
  >
    <AppProvider>
      <router-view />
    </AppProvider>
  </n-config-provider>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { darkTheme, dateZhCN, zhCN, enUS, dateEnUS } from 'naive-ui';
  import { AppProvider } from '@/components/Application';
  import { useDesignSettingStore } from '@/store/modules/designSetting';
  import { useProjectSetting } from '@/hooks/setting/useProjectSetting';
  import { useLocalesStore } from '@/store/modules/localesSetting';
  import { lighten } from '@/utils';

  const designStore = useDesignSettingStore();
  const { getBorderRadius } = useProjectSetting();
  const localesStore = useLocalesStore();
  const locale = localesStore.getLocale;

  const getLocale = computed(() => (locale === 'zh_CN' ? zhCN : enUS));

  const getDateLocale = computed(() => (locale === 'zh_CN' ? dateZhCN : dateEnUS));

  const getDarkTheme = computed(() => (designStore.darkTheme ? darkTheme : undefined));

  /**
   * @type import('naive-ui').GlobalThemeOverrides
   */
  const getThemeOverrides = computed(() => {
    const appTheme = designStore.appTheme;
    const lightenStr = lighten(designStore.appTheme, 6);
    return {
      common: {
        primaryColor: appTheme,
        primaryColorSuppl: appTheme,
        primaryColorHover: lightenStr,
        primaryColorPressed: lightenStr,
      },
      LoadingBar: {
        colorLoading: appTheme,
      },
      Layout: {
        colorEmbedded: '#f5f7f9',
      },
      Spin: {
        color: appTheme,
      },
      Card: {
        borderRadius: `${getBorderRadius.value}px`,
      },
    };
  });
</script>
