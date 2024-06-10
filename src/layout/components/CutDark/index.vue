<script lang="ts" setup>
  import { nextTick, watch } from 'vue';
  import { Sunny, SunnyOutline } from '@vicons/ionicons5';
  import { useDesignSettingStore } from '@/store/modules/designSetting';
  import { cloneDeep } from 'lodash-es';
  import { useProjectSettingStore } from '@/store/modules/projectSetting';

  const designStore = useDesignSettingStore();
  const settingStore = useProjectSettingStore();

  watch(
    () => designStore.darkTheme,
    (to) => {
      settingStore.navTheme = to ? 'header-dark' : 'light';
    },
  );

  function enableTransitions() {
    return (
      'startViewTransition' in document &&
      window.matchMedia('(prefers-reduced-motion: no-preference)').matches
    );
  }

  async function toggleDarkness({ clientX: x, clientY: y }: MouseEvent) {
    const isDark = cloneDeep(designStore.darkTheme);
    const htmlRoot = document.getElementById('htmlRoot');
    if (!enableTransitions()) {
      if (!htmlRoot) return;
      if (!isDark) htmlRoot.setAttribute('data-theme', 'dark');
      else htmlRoot.setAttribute('data-theme', 'light');

      designStore.setDarkTheme(!isDark);
      return;
    }

    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${Math.hypot(
        Math.max(x, innerWidth - x),
        Math.max(y, innerHeight - y),
      )}px at ${x}px ${y}px)`,
    ];
    // @ts-ignore
    await document?.startViewTransition(async () => {
      if (!htmlRoot) return;
      if (!isDark) htmlRoot.setAttribute('data-theme', 'dark');
      else htmlRoot.setAttribute('data-theme', 'light');
      designStore.setDarkTheme(!isDark);
      await nextTick();
    }).ready;

    document.documentElement.animate(
      { clipPath: isDark ? clipPath.reverse() : clipPath },
      {
        duration: 300,
        easing: 'ease-in',
        pseudoElement: `::view-transition-${isDark ? 'old' : 'new'}(root)`,
      },
    );
  }
</script>

<template>
  <n-tooltip trigger="hover">
    <template #trigger>
      <n-button strong circle secondary type="tertiary" @click="toggleDarkness">
        <n-icon :size="18" v-if="designStore.getDarkTheme" :component="Sunny" />
        <n-icon :size="18" v-else :component="SunnyOutline" />
      </n-button>
    </template>
    {{ designStore.getDarkTheme ? '切换亮色模式' : '切换暗色模式' }}
  </n-tooltip>
</template>
