import { defineStore } from 'pinia';
import { store } from '@/store';
import projectSetting from '@/settings/projectSetting';
import type { IProjectSetting } from '/#/config';

const {
  // 导航模式 vertical 左侧菜单模式 horizontal 顶部菜单模式 vertical-mix 左侧混合菜单
  navMode,
  // 导航风格 dark 暗色侧边栏 light 白色侧边栏 header-dark 暗色顶栏
  navTheme,
  // 左侧主导航宽度
  navWidth,
  // 左侧主导航收起宽度
  navMinWidth,
  // 分栏主导航宽度
  partionNavWidth,
  // 分栏子导航收起宽度
  partionSubNavMinWidth,
  // 分栏子导航宽度
  partionSubNavWidth,
  // 隐藏分栏
  hidePartionSubNav,
  // 导航触发器 all 同时显示底部和右侧 right 显示右侧 footer 显示底部 none 隐藏触发器
  navTrigger,
  // 左侧主子导航宽度
  subNavWidth,
  // 左侧混合菜单
  isMixMenu,
  // 折叠左侧导航
  collapsedNav,
  // 显示重载按钮
  isReload,
  // 顶部高度
  headerHeight,
  // 固定顶部
  fixedHeader,
  // 显示多页签
  isMultiTabs,
  // 显示面包屑
  isCrumbs,
  // 显示面包屑图标
  isCrumbsIcon,
  // 菜单权限模式 FIXED 前端固定路由  BACK 动态获取
  permissionMode,
  // 是否开启路由动画
  isPageAnimate,
  // 路由动画类型 默认消退
  pageAnimateType,
  // 内容区域宽度模式 full 流式 fixed 固定宽度
  contentType,
  // 语言选择器
  isI18n,
  // 圆角
  borderRadius,
} = projectSetting;

export const useProjectSettingStore = defineStore({
  id: 'app-project-setting',
  state: (): IProjectSetting => ({
    navMode,
    navTheme,
    navWidth,
    navMinWidth,
    partionNavWidth,
    partionSubNavMinWidth,
    partionSubNavWidth,
    hidePartionSubNav,
    navTrigger,
    subNavWidth,
    isMixMenu,
    collapsedNav,
    isReload,
    headerHeight,
    fixedHeader,
    isMultiTabs,
    isCrumbs,
    isCrumbsIcon,
    permissionMode,
    isPageAnimate,
    pageAnimateType,
    contentType,
    isI18n,
    borderRadius,
  }),
  persist: {
    key: 'APP-PROJECT-SETTING',
  },
  getters: {
    getNavMode(): string {
      return this.navMode;
    },
    getNavTheme(): string {
      return this.navTheme;
    },
    getNavWidth(): number {
      return this.navWidth;
    },
    getNavMinWidth(): number {
      return this.navMinWidth;
    },
    getNavTrigger(): string {
      return this.navTrigger;
    },
    getSubNavWidth(): number {
      return this.subNavWidth;
    },
    getIsMixMenu(): boolean {
      return this.isMixMenu;
    },
    getCollapsedNav(): boolean {
      return this.collapsedNav;
    },
    getIsReload(): boolean {
      return this.isReload;
    },
    getHeaderHeight(): number {
      return this.headerHeight;
    },
    getFixedHeader(): boolean {
      return this.fixedHeader;
    },
    getIsMultiTabs(): boolean {
      return this.isMultiTabs;
    },
    getPermissionMode(): string {
      return this.permissionMode;
    },
    getIsPageAnimate(): boolean {
      return this.isPageAnimate;
    },
    getPageAnimateType(): string {
      return this.pageAnimateType;
    },
    getContentType(): string {
      return this.contentType;
    },
    getBorderRadius(): number {
      return this.borderRadius;
    },
  },
  actions: {
    setHidePartionSubNav(value: boolean) {
      this.hidePartionSubNav = value;
    },
    setNavTheme(value: string): void {
      this.navTheme = value;
    },
    setCollapsedNav(value: boolean): void {
      this.collapsedNav = value;
    },
  },
});

// Need to be used outside the setup
export function useProjectSettingStoreWithOut() {
  return useProjectSettingStore(store);
}
