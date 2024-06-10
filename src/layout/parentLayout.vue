<template>
  <div class="ParentView">
    <RouterView>
      <template #default="{ Component, route }">
        <transition :name="getTransitionName" appear mode="out-in">
          <keep-alive :include="cacheList" :exclude="notCacheName">
            <component :is="Component" :key="route.fullPath" />
          </keep-alive>
        </transition>
      </template>
    </RouterView>
  </div>
</template>
<script lang="ts">
  export default {
    name: 'ParentView',
  };
</script>
<script lang="ts" setup>
  import { computed, ref, unref } from 'vue';
  import { useRoute } from 'vue-router';
  import { useAsyncRouteStore } from '@/store/modules/asyncRoute';
  import { useProjectSetting } from '@/hooks/setting/useProjectSetting';

  const { getIsPageAnimate, getPageAnimateType } = useProjectSetting();

  const getTransitionName = computed(() => {
    return unref(getIsPageAnimate) ? unref(getPageAnimateType) : '';
  });

  // 当前路由
  const currentRoute = useRoute();

  const notCacheName: any = ref([
    currentRoute.meta && currentRoute.meta.notCache ? currentRoute.name : '',
  ]);

  const asyncRouteStore = useAsyncRouteStore();

  const cacheList = computed(() => {
    return ['ParentView', ...asyncRouteStore.keepAliveComponents];
  });
</script>
