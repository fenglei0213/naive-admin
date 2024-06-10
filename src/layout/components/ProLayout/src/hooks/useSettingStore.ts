import { computed } from 'vue';
import { useProjectSettingStore } from '@/store/modules/projectSetting';
import { useDesignSettingStore } from '@/store/modules/designSetting';

export function useSettingStore() {
  const settingStore = useProjectSettingStore();

  const designStore = useDesignSettingStore();

  const isWide = computed(() => {
    return settingStore.contentType === 'fixed';
  });

  const isVertical = computed(() => {
    return settingStore.navMode === 'vertical';
  });

  const isHorizontal = computed(() => {
    return settingStore.navMode === 'horizontal';
  });

  const isVerticalMix = computed(() => {
    return settingStore.navMode === 'vertical-mix';
  });

  const isFixedHeader = computed(() => {
    return settingStore.fixedHeader;
  });

  const isCollapsed = computed(() => {
    return settingStore.collapsedNav;
  });

  const isSubNav = computed(() => {
    return settingStore.navMode === 'vertical-sub';
  });

  const isMultiTabs = computed(() => {
    return settingStore.isMultiTabs;
  });

  const getSiderStyle = computed(() => {
    const collapsed = settingStore.collapsedNav;
    const partionNavWidth = settingStore.partionNavWidth;
    const minWidth = isSubNav.value ? partionNavWidth : 64;
    const w = isSubNav.value ? partionNavWidth : collapsed ? minWidth : settingStore.navWidth;
    return {
      width: `${w}px`,
      overflow: 'hidden',
      flex: `0 0 ${w}px`,
      'max-width': `${w}px`,
      'min-width': `${w}px`,
    };
  });

  const getSiderPartionStyle = computed(() => {
    const collapsed = settingStore.collapsedNav;
    const partionNavWidth = settingStore.partionNavWidth;
    const partionSubNavMinWidth = settingStore.partionSubNavMinWidth;
    const minWidth = settingStore.navMode === 'vertical-sub' ? partionNavWidth : 64;
    const isSubNav = settingStore.navMode === 'vertical-sub';
    const w = isSubNav ? partionNavWidth : collapsed ? minWidth : settingStore.navWidth;
    const subw = collapsed ? partionSubNavMinWidth : settingStore.partionSubNavWidth;
    return {
      left: `${w}px`,
      width: `${subw}px`,
      overflow: 'hidden',
      flex: `0 0 ${subw}px`,
      'max-width': `${subw}px`,
      'min-width': `${subw}px`,
    };
  });

  const getFixedHeaderWidth = computed(() => {
    const collapsed = settingStore.collapsedNav;
    const partionNavWidth = settingStore.partionNavWidth;
    const partionNavMinWidth = settingStore.partionSubNavWidth;
    const hidePartionSubNav = settingStore.hidePartionSubNav;
    const partionSubNavMinWidth = settingStore.partionSubNavMinWidth;
    const minWidth = settingStore.navMode === 'vertical-sub' ? partionNavWidth : 64;
    const w = isSubNav.value ? partionNavWidth : collapsed ? minWidth : settingStore.navWidth;
    const pSubNavW = hidePartionSubNav ? 0 : collapsed ? partionSubNavMinWidth : partionNavMinWidth;
    if (isVerticalMix.value) {
      return {
        width: `calc(100% - ${12}px)`,
        right: 0,
      };
    }
    if ((!isFixedHeader.value && !isHorizontal.value) || isHorizontal.value) {
      return {
        width: `calc(100% - ${24}px)`,
        right: 0,
      };
    }
    if (isSubNav.value) {
      const subW = collapsed ? partionNavWidth + partionSubNavMinWidth + 24 : pSubNavW + w + 24;
      return {
        width: `calc(100% - ${subW}px)`,
        right: 0,
      };
    }
    return {
      width:
        isFixedHeader.value && !isVerticalMix.value && !isHorizontal.value
          ? `calc(100% - ${w + 24}px)`
          : '100%',
      right: 0,
    };
  });

  const getTabsViewWidth = computed(() => {
    const collapsed = settingStore.collapsedNav;
    const partionNavWidth = settingStore.partionNavWidth;
    const partionNavMinWidth = settingStore.partionSubNavWidth;
    const hidePartionSubNav = settingStore.hidePartionSubNav;
    const partionSubNavMinWidth = settingStore.partionSubNavMinWidth;
    const minWidth = settingStore.navMode === 'vertical-sub' ? partionNavWidth : 64;
    const w = isSubNav.value ? partionNavWidth : collapsed ? minWidth : settingStore.navWidth;
    const pSubNavW = hidePartionSubNav ? 0 : collapsed ? partionSubNavMinWidth : partionNavMinWidth;
    if (isVerticalMix.value) {
      return {
        width: `calc(100% - ${w + 12 * 2}px)`,
        right: 0,
      };
    }
    if ((!isFixedHeader.value && !isHorizontal.value) || isHorizontal.value) {
      return {
        width: `calc(100% - ${24}px)`,
        right: 0,
      };
    }
    if (isSubNav.value) {
      const subW = collapsed ? partionNavWidth + partionSubNavMinWidth + 24 : pSubNavW + w + 24;
      return {
        width: `calc(100% - ${subW}px)`,
        right: 0,
      };
    }
    return {
      width:
        isFixedHeader.value && !isVerticalMix.value && !isHorizontal.value
          ? `calc(100% - ${w + 24}px)`
          : '100%',
      right: 0,
    };
  });

  const getFixedLogoWidth = computed(() => {
    const partionNavWidth = settingStore.partionNavWidth;
    const minWidth = settingStore.navMode === 'vertical-sub' ? partionNavWidth : 64;
    const collapsed = settingStore.collapsedNav;
    const w = collapsed ? minWidth : settingStore.navWidth;
    return {
      width: `${w}px`,
    };
  });

  const isLight = computed(() => {
    return settingStore.navTheme === 'light';
  });

  const isDark = computed(() => {
    return settingStore.navTheme === 'header-dark';
  });

  const isDarkTheme = computed(() => {
    return designStore.darkTheme;
  });

  const getNavTrigger = computed(() => {
    return settingStore.navTrigger;
  });

  const getSubNavWidth = computed(() => {
    const partionNavWidth = settingStore.partionNavWidth;
    const minWidth = settingStore.navMode === 'vertical-sub' ? partionNavWidth : 64;
    const collapsed = settingStore.collapsedNav;
    const w = collapsed ? minWidth : settingStore.subNavWidth;
    return {
      width: `${w}px`,
    };
  });

  function toggleCollapsedNav() {
    settingStore.collapsedNav = !settingStore.collapsedNav;
  }

  function getNavMode() {
    return settingStore.navMode;
  }

  return {
    isWide,
    isLight,
    isDark,
    isVertical,
    isHorizontal,
    isVerticalMix,
    isCollapsed,
    isFixedHeader,
    isDarkTheme,
    isSubNav,
    isMultiTabs,
    getNavMode,
    getSiderStyle,
    getSubNavWidth,
    getSiderPartionStyle,
    getFixedHeaderWidth,
    getFixedLogoWidth,
    getNavTrigger,
    getTabsViewWidth,
    toggleCollapsedNav,
  };
}
