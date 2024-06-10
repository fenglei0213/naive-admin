<template>
  <n-breadcrumb v-if="getIsCrumbs" class="hidden sm:hidden md:block">
    <template v-for="routeItem in breadcrumbList" :key="routeItem.name">
      <n-breadcrumb-item v-if="routeItem.meta.breadcrumbView != false">
        <n-dropdown v-if="routeItem.children.length" :options="routeItem.children">
          <span class="link-text">
            <component
              :is="routeItem.meta.icon"
              v-if="getIsCrumbsIcon && routeItem.meta.icon"
              class="mr-1"
            />
            <Render :ref="`renderDom_${routeItem.name}`" :value="getRender(routeItem.meta.title)" />
          </span>
        </n-dropdown>
        <span v-else class="link-text">
          <component
            :is="routeItem.meta.icon"
            v-if="getIsCrumbsIcon && routeItem.meta.icon"
            class="mr-1"
          />
          <Render :ref="`renderDom_${routeItem.name}`" :value="getRender(routeItem.meta.title)" />
        </span>
      </n-breadcrumb-item>
    </template>
  </n-breadcrumb>
</template>

<script lang="ts" setup>
  import { computed, watch, ref } from 'vue';
  import { Render, getRender } from '@/components/Render';
  import { useProjectSetting } from '@/hooks/setting/useProjectSetting';
  import { useRoute } from 'vue-router';
  import { useGo } from '@/hooks/web/usePage';
  import { useI18n } from '@/hooks/web/useI18n';

  const { getIsCrumbs, getIsCrumbsIcon } = useProjectSetting();

  const route = useRoute();
  const go = useGo();
  const { t } = useI18n();

  const isRefresh = ref(false);

  watch(
    () => route.fullPath,
    (to) => {
      isRefresh.value = to.indexOf('/redirect/') != -1;
    },
    { immediate: true },
  );

  const generator: any = (routerMap) => {
    return routerMap
      .filter((item) => {
        return !item.meta?.hidden;
      })
      .map((item) => {
        const currentMenu = {
          ...item,
          label: t(item.meta.title),
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
          currentMenu.children = generator(item.children, currentMenu);
        }
        return currentMenu;
      });
  };

  const breadcrumbList = computed(() => {
    if (!isRefresh.value) {
      return generator(route.matched);
    }
    return [];
  });
</script>
