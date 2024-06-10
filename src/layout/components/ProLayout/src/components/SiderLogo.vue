<template>
  <a href="/">
    <img src="~@/assets/images/logo.png" alt="logo" />
    <h1 v-if="!isSubNav && !isCollapsed">{{ props.title }}</h1>
  </a>
</template>

<script lang="ts" setup>
  import { defaultSettings, PureSettings } from '../defaultSettings';
  import { LogoRender } from '../types';

  import { useSettingStore } from '../hooks/useSettingStore';
  import { computed } from 'vue';

  const { isCollapsed, getNavMode } = useSettingStore();

  const isSubNav = computed(() => {
    return getNavMode() === 'vertical-sub';
  });

  const props = defineProps({
    logo: {
      type: [Object, String, Function] as PropType<LogoRender>,
      default: () => undefined,
    },
    title: {
      type: String as PropType<PureSettings['title']>,
      default: () => defaultSettings.title,
    },
  });
</script>
