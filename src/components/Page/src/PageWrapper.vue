<template>
  <n-spin
    :show="getLoading"
    class="page-wrapper"
    :class="{ 'footer-space': showFooter && getShowFooter }"
  >
    <div class="mb-4 n-layout-page-header" v-if="title || content || $slots.headerContent">
      <n-card :bordered="false" :title="title">
        {{ content }}
        <slot name="headerContent"></slot>
      </n-card>
    </div>
    <div class="page-wrapper-content" :style="contentStyle" :class="contentClass">
      <slot></slot>
    </div>
    <PageFooter v-if="showFooter && getShowFooter" :style="getFooterWidth">
      <template #left>
        <slot name="leftFooter"></slot>
      </template>
      <template #right>
        <slot name="rightFooter"></slot>
      </template>
    </PageFooter>
  </n-spin>
</template>

<script lang="ts" setup>
  import { computed, useSlots } from 'vue';
  import { basicProps } from './wrapperProps';
  import PageFooter from './PageFooter.vue';
  import { useSettingStore } from '@/layout/components/ProLayout/src/hooks/useSettingStore';
  import { useProjectSettingStore } from '@/store/modules/projectSetting';

  const props = defineProps({ ...basicProps });

  const slots = useSlots();

  const { isSubNav, isHorizontal } = useSettingStore();

  const settingStore = useProjectSettingStore();

  const getShowFooter = computed(() => slots?.leftFooter || slots?.rightFooter);

  const getLoading = computed(() => props.loading);

  const getFooterWidth = computed(() => {
    const collapsed = settingStore.collapsedNav;
    const partionNavWidth = settingStore.partionNavWidth;
    const partionNavMinWidth = settingStore.partionSubNavWidth;
    const partionSubNavMinWidth = settingStore.partionSubNavMinWidth;
    const minWidth = settingStore.navMode === 'vertical-sub' ? partionNavWidth : 64;
    const w = isSubNav.value ? partionNavWidth : collapsed ? minWidth : settingStore.navWidth;
    const partionSubNavWidth = collapsed ? partionSubNavMinWidth : partionNavMinWidth;
    if (isSubNav.value) {
      const subW = collapsed
        ? partionNavWidth + partionSubNavMinWidth + 2
        : partionSubNavWidth + w + 2;
      return {
        width: `calc(100% - ${subW}px)`,
      };
    }
    if (isHorizontal.value) {
      return {
        width: '100%',
      };
    }
    return {
      width: `calc(100% - ${w}px)`,
    };
  });
</script>

<style lang="less" scoped>
  .page-wrapper {
    position: relative;

    .mb-4 {
      margin-bottom: 1rem;
    }
  }

  .footer-space {
    padding-bottom: 64px;
  }
</style>
