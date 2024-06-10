<template>
  <RouterView>
    <template #default="{ Component, route }">
      <transition :name="getTransitionName" appear mode="out-in">
        <keep-alive v-if="keepAliveComponents.length" :include="keepAliveComponents">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
        <component :is="Component" v-else :key="route.fullPath" />
      </transition>
    </template>
  </RouterView>
</template>

<script lang="ts" setup>
  import { computed, unref } from 'vue';
  import { useAsyncRouteStore } from '@/store/modules/asyncRoute';
  import { useProjectSetting } from '@/hooks/setting/useProjectSetting';

  const { getIsPageAnimate, getPageAnimateType } = useProjectSetting();
  const asyncRouteStore = useAsyncRouteStore();

  // 需要缓存的路由组件
  const keepAliveComponents = computed(() => [
    'ParentView',
    ...asyncRouteStore.keepAliveComponents,
  ]);

  const getTransitionName = computed(() => {
    return unref(getIsPageAnimate) ? unref(getPageAnimateType) : '';
  });
</script>

<style lang="less" scoped></style>
