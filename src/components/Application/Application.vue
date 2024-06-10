<template>
  <NConfigProvider :theme-overrides="getThemeOverrides">
    <n-loading-bar-provider>
      <n-dialog-provider>
        <n-notification-provider>
          <n-message-provider>
            <slot></slot>
          </n-message-provider>
        </n-notification-provider>
      </n-dialog-provider>
    </n-loading-bar-provider>
  </NConfigProvider>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { useDesignSetting } from '@/hooks/setting/useDesignSetting';
  import {
    NConfigProvider,
    NDialogProvider,
    NNotificationProvider,
    NMessageProvider,
    NLoadingBarProvider,
  } from 'naive-ui';

  /**
   * @type import('naive-ui').GlobalThemeOverrides
   */
  const getThemeOverrides = computed(() => {
    const designStore = useDesignSetting();
    const appTheme = designStore.getAppTheme;
    return {
      Common: {
        primaryColor: appTheme.value,
      },
      LoadingBar: {
        colorLoading: appTheme.value,
      },
    };
  });
</script>
