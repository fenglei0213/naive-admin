<template>
  <n-menu
    :options="menus"
    :inverted="getInverted"
    :mode="getMode"
    :collapsed="false"
    :collapsed-width="80"
    :collapsed-icon-size="20"
    :root-indent="0"
    :expanded-keys="getOpenKeys"
    :value="getSelectedKeys"
    show-trigger
    @update:value="clickMenuItem"
    @update:expanded-keys="menuExpanded"
    class="partion-menu"
  />
</template>

<script lang="ts" setup>
  import { ref, onMounted, computed, watch, unref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useAsyncRouteStore } from '@/store/modules/asyncRoute';
  import { generatorMenu, generatorMenuMix } from '@/utils';
  import { useProjectSettingStore } from '@/store/modules/projectSetting';
  import { useProjectSetting } from '@/hooks/setting/useProjectSetting';
  import { useMenu } from './hooks/useMenu';

  const props = defineProps({
    mode: {
      // 菜单模式
      type: String as PropType<'vertical' | 'horizontal'>,
      default: 'vertical',
    },
    collapsed: {
      // 侧边栏菜单是否收起
      type: Boolean,
    },
    //位置
    location: {
      type: String,
      default: 'left',
    },
    isTop: {
      type: Boolean,
      default: false,
    },
    indent: {
      type: Number,
      default: 24,
    },
  });

  const emit = defineEmits(['update:collapsed']);

  const { replaceI18nTitle, getMenuInverted } = useMenu();

  const getInverted = computed(() => {
    return getMenuInverted.value;
  });

  // 当前路由
  const currentRoute = useRoute();
  const router = useRouter();
  const asyncRouteStore = useAsyncRouteStore();
  const settingStore = useProjectSettingStore();
  const menus = ref<any[]>([]);
  const selectedKeys = ref<string>(currentRoute.name as string);
  const headerMenuSelectKey = ref<string>('');

  const { getNavMode } = useProjectSetting();

  const navMode = getNavMode;

  // 获取当前打开的子菜单
  const matched = currentRoute.matched;

  const openKeys = ref(matched && matched.length ? matched.map((item) => item.name) : []);

  const getOpenKeys = computed(() => {
    return openKeys.value as string[];
  });

  const getMode = computed(() => {
    return props.mode;
  });

  const getSelectedKeys = computed(() => {
    let location = props.location;
    if (location === 'top') {
      return ['left', 'left-tow'].includes(location) || unref(getNavMode) === 'horizontal'
        ? unref(selectedKeys)
        : unref(headerMenuSelectKey);
    }

    if (unref(navMode) === 'vertical') {
      return unref(selectedKeys);
    }
    return location === 'left' || (location === 'header' && unref(navMode) === 'horizontal')
      ? unref(headerMenuSelectKey)
      : unref(headerMenuSelectKey);
  });

  // 监听分割菜单
  watch(
    () => settingStore.isMixMenu,
    () => {
      updateMenu();
      if (props.collapsed) {
        emit('update:collapsed', !props.collapsed);
      }
    },
  );

  // 跟随页面路由变化，切换菜单选中状态
  watch(
    () => currentRoute.fullPath,
    () => {
      updateMenu();
      const matched = currentRoute.matched;
      openKeys.value = matched.map((item) => item.name);
      const activeMenu: string = (currentRoute.meta?.activeMenu as string) || '';
      selectedKeys.value = activeMenu ? (activeMenu as string) : (currentRoute.name as string);
    },
  );

  function updateMenu() {
    if (!settingStore.isMixMenu) {
      if (props.location === 'top') {
        menus.value = generatorMenu(replaceI18nTitle(asyncRouteStore.getMenus)).filter((item) => {
          return item.location === 'top';
        });
      } else {
        menus.value = generatorMenu(replaceI18nTitle(asyncRouteStore.getMenus)).filter((item) => {
          return item.location != 'top';
        });
      }
    } else {
      //混合菜单
      const firstRouteName: string = (currentRoute.matched[0].name as string) || '';
      menus.value = generatorMenuMix(
        replaceI18nTitle(asyncRouteStore.getMenus),
        firstRouteName,
        props.location,
        props.isTop,
      );
      const activeMenu: string = currentRoute?.matched[0].meta?.activeMenu as string;
      headerMenuSelectKey.value = (activeMenu ? activeMenu : firstRouteName) || '';
    }
  }

  // 点击菜单
  function clickMenuItem(key: string) {
    if (/http(s)?:/.test(key)) {
      window.open(key);
    } else {
      if (key === currentRoute.name) return;
      router.push({ name: key });
    }
  }

  //展开菜单
  function menuExpanded(keys: string[]) {
    if (!keys) return;
    const latestOpenKey = keys.find((key) => openKeys.value.indexOf(key) === -1);
    const isExistChildren = findChildrenLen(latestOpenKey as string);
    openKeys.value = isExistChildren ? (latestOpenKey ? [latestOpenKey] : []) : keys;
  }

  //查找是否存在子路由
  function findChildrenLen(key: string) {
    if (!key) return false;
    const subRouteChildren: string[] = [];
    for (const { children, key } of unref(menus)) {
      if (children && children.length) {
        subRouteChildren.push(key as string);
      }
    }
    return subRouteChildren.includes(key);
  }

  onMounted(() => {
    updateMenu();
  });
</script>

<style lang="less" scoped>
  .layout-sider :deep(.n-layout-sider .n-layout-toggle-button) {
    right: 12px;
  }
  .partion-menu {
    :deep(.n-menu-item) {
      padding: 10px 0;
      height: auto;
    }
    :deep(.n-menu-item-content) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 6px 0px;
      padding-left: 0 !important;
      text-align: center;
      .n-menu-item-content__icon {
        margin-right: 0 !important;
      }
      .n-menu-item-content-header {
        opacity: 1;
      }
    }
  }
</style>
