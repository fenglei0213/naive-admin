<template>
  <n-breadcrumb v-if="getIsCrumbs">
    <template v-for="routeItem in breadcrumbList" :key="routeItem.name">
      <n-breadcrumb-item>
        <n-dropdown v-if="routeItem.children.length" :options="routeItem.children">
          <span class="link-text">
            <component
              :is="routeItem.meta.icon"
              v-if="getIsCrumbsIcon && routeItem.meta.icon"
              class="mr-1"
            />
            <Render :ref="`renderDom_${routeItem.path}`" :value="getRender(routeItem.meta.title)" />
          </span>
        </n-dropdown>
        <span v-else class="link-text">
          <component
            :is="routeItem.meta.icon"
            v-if="getIsCrumbsIcon && routeItem.meta.icon"
            class="mr-1"
          />
          <Render :ref="`renderDom_${routeItem.path}`" :value="getRender(routeItem.meta.title)" />
        </span>
      </n-breadcrumb-item>
    </template>
  </n-breadcrumb>
</template>

<script lang="ts" setup>
  import { ref, watch, watchEffect } from 'vue';
  import { RouteLocationMatched, useRouter } from 'vue-router';
  import { useRoute } from 'vue-router';
  import { useProjectSetting } from '@/hooks/setting/useProjectSetting';
  import { useGo } from '@/hooks/web/usePage';
  import { Render, getRender } from '@/components/Render';
  import { cloneDeep } from 'lodash-es';
  import { PageEnum } from '@/enums/pageEnum';

  defineEmits(['update:collapsed']);

  const isRefresh = ref(false);
  const breadcrumbList = ref<RouteLocationMatched[]>([]);
  const { getIsCrumbs, getIsCrumbsIcon } = useProjectSetting();

  defineProps({
    inverted: {
      type: Boolean,
    },
  });

  const go = useGo();

  const route = useRoute();
  const { currentRoute } = useRouter();

  watchEffect(() => {
    if (currentRoute.value.name === PageEnum.REDIRECT_NAME) return;
    const routeMatched = cloneDeep(route.matched);
    breadcrumbList.value = generator(routeMatched) as RouteLocationMatched[];
  });

  function generator(routerMap): RouteLocationMatched[] {
    return routerMap
      .filter((item) => {
        return !item.meta?.hidden;
      })
      .map((item) => {
        const currentMenu = {
          ...item,
          label: item.meta.title,
          key: item.name,
          disabled: item.path === '/',
          props: {
            onClick: () => {
              go(item, false);
            },
          },
        };
        // 是否有子菜单，并递归处理
        if (item.children && item.children.length > 0) {
          // Recursion
          currentMenu.children = generator(item.children);
        }
        return currentMenu;
      });
  }

  watch(
    () => route.fullPath,
    (to) => {
      isRefresh.value = to.indexOf('/redirect/') != -1;
    },
    { immediate: true },
  );
</script>
