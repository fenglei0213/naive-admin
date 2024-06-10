import { IProjectSetting } from '/#/config';

const setting: IProjectSetting = {
  // 导航模式 vertical 左侧菜单模式 horizontal 顶部菜单模式 vertical-mix 左侧混合菜单 vertical-sub 左侧分栏
  // 如果修改默认值为其他模式 需要把下面 isMixMenu 设置为 false
  navMode: 'vertical-sub',
  // 导航风格 dark 暗色侧边栏 light 白色侧边栏 header-dark 暗色顶栏
  navTheme: 'light',
  // 左侧主导航宽度
  navWidth: 200,
  // 左侧主导航收起宽度
  navMinWidth: 64,
  // 导航触发器 all 同时显示底部和右侧 right 显示右侧 footer 显示底部 none 隐藏触发器
  navTrigger: 'all',
  // 分栏主导航宽度
  partionNavWidth: 90,
  // 分栏子导航宽度
  partionSubNavWidth: 180,
  // 分栏子导航收起宽度
  partionSubNavMinWidth: 64,
  // 隐藏分栏
  hidePartionSubNav: false,
  // 左侧主子导航宽度
  subNavWidth: 124,
  // 左侧混合菜单
  isMixMenu: true,
  // 折叠左侧导航
  collapsedNav: false,
  // 显示重载按钮
  isReload: true,
  // 顶部高度
  headerHeight: 57,
  // 固定顶部
  fixedHeader: true,
  // 显示多页签
  isMultiTabs: true,
  // 显示面包屑
  isCrumbs: true,
  // 显示面包屑图标
  isCrumbsIcon: true,
  // 菜单权限模式 FIXED 前端固定路由  BACK 动态获取
  permissionMode: 'FIXED',
  // 是否开启路由动画
  isPageAnimate: true,
  // 路由动画类型 默认消退
  pageAnimateType: 'fade',
  // 内容区域宽度模式 full 流式 fixed 固定宽度
  contentType: 'full',
  // 语言选择器
  isI18n: true,
  // 圆角
  borderRadius: 12,
};
export default setting;
