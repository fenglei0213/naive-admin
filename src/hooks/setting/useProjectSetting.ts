import { computed } from 'vue';
import { useProjectSettingStore } from '@/store/modules/projectSetting';

export function useProjectSetting() {
  const projectStore = useProjectSettingStore();

  const getNavMode = computed(() => projectStore.navMode);

  const getNavTheme = computed(() => projectStore.navTheme);

  const getNavWidth = computed(() => projectStore.navWidth);

  const getNavMinWidth = computed(() => projectStore.navMinWidth);

  const getNavTrigger = computed(() => projectStore.navTrigger);

  const getSubNavWidth = computed(() => projectStore.subNavWidth);

  const getCollapsedNav = computed(() => projectStore.collapsedNav);

  const getIsReload = computed(() => projectStore.isReload);

  const getHeaderHeight = computed(() => projectStore.headerHeight);

  const getFixedHeader = computed(() => projectStore.fixedHeader);

  const getIsMultiTabs = computed(() => projectStore.isMultiTabs);

  const getIsCrumbs = computed(() => projectStore.isCrumbs);

  const getIsCrumbsIcon = computed(() => projectStore.isCrumbsIcon);

  const getIsPageAnimate = computed(() => projectStore.isPageAnimate);

  const getPageAnimateType = computed(() => projectStore.pageAnimateType);

  const getPermissionMode = computed(() => projectStore.permissionMode);

  const getHidePartionSubNav = computed(() => projectStore.hidePartionSubNav);

  const getIsI18n = computed(() => projectStore.isI18n);

  const getBorderRadius = computed(() => projectStore.borderRadius);

  return {
    getNavMode,
    getNavTheme,
    getNavWidth,
    getNavMinWidth,
    getNavTrigger,
    getSubNavWidth,
    getCollapsedNav,
    getHidePartionSubNav,
    getIsReload,
    getHeaderHeight,
    getFixedHeader,
    getIsMultiTabs,
    getIsCrumbs,
    getIsCrumbsIcon,
    getPermissionMode,
    getIsPageAnimate,
    getPageAnimateType,
    getIsI18n,
    getBorderRadius,
  };
}
