<template>
  <div
    class="partion-title"
    :class="{
      'partion-title-light': getNavTheme === 'light' || getDarkTheme,
    }"
    v-if="!isCollapsed"
  >
    <h2 class="mt-0 title">{{ props.title }}</h2>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { useThemeVars } from 'naive-ui';
  import { useDesignSetting } from '@/hooks/setting/useDesignSetting';
  import { useProjectSetting } from '@/hooks/setting/useProjectSetting';
  import { useSettingStore } from '@/layout/components/ProLayout/src/hooks/useSettingStore';
  import { defaultSettings, PureSettings } from '@/layout/components/ProLayout/src/defaultSettings';

  const { getNavTheme } = useProjectSetting();
  const { getDarkTheme } = useDesignSetting();
  const { isCollapsed } = useSettingStore();

  const props = defineProps({
    title: {
      type: String as PropType<PureSettings['title']>,
      default: () => defaultSettings.title,
    },
  });

  const themeVars = useThemeVars();

  const getBgColor = computed(() => {
    let isLight = getNavTheme.value === 'light';
    return getDarkTheme.value ? themeVars.value.cardColor : isLight ? '#FFFFFF' : '#18181c';
  });

  const getColor = computed(() => {
    let isLight = getNavTheme.value === 'light';
    return isLight ? themeVars.value.textColor1 : '#FFFFFF';
  });
</script>

<style lang="less" scoped>
  .partion-title {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 57px;
    overflow: hidden;
    white-space: nowrap;
    background: v-bind(getBgColor);
    color: v-bind(getColor);
    transition: all 0.2s ease-in-out;
    padding-bottom: 1px;
    box-sizing: border-box;

    h2 {
      transition: all 0.2s ease-in-out;
      font-size: 16px;
      font-weight: 600;
    }

    img {
      width: auto;
      height: 32px;
    }

    .title {
      margin-bottom: 0;
    }
  }

  .partion-title-light {
    border-bottom: 1px solid var(--n-border-color);
  }
</style>
