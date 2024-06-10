<template>
  <div
    class="naive-pro-basicLayout"
    :class="{
      'naive-pro-basicLayout-top': isHorizontal,
      'naive-pro-basicLayout-mix': isVerticalMix,
    }"
  >
    <div
      class="naive-layout"
      :class="{
        'naive-layout-has-sider': isVertical || isVerticalMix || isSubNav,
      }"
    >
      <div
        class="naive-layout-sider-zhanwei"
        :class="{
          'naive-layout-sider-zhanwei-light': isLight,
        }"
        :style="getSiderStyle"
        v-if="isVertical || isVerticalMix || isSubNav"
      ></div>

      <div
        class="naive-layout-sider-zhanwei"
        :class="{
          'naive-layout-sider-zhanwei-light': isLight,
        }"
        :style="getSiderPartionStyle"
        v-if="isSubNav && !hideSubMenu"
      ></div>

      <!-- 左侧菜单区域 -->
      <div
        class="naive-pro-sider naive-layout-sider naive-pro-sider-fixed"
        :style="getSiderStyle"
        :class="{
          'naive-pro-sider-light': isLight,
        }"
      >
        <div class="naive-layout-sider-children">
          <div
            class="naive-pro-sider-logo"
            :class="{
              'naive-pro-sider-logo-light': isLight,
            }"
          >
            <SiderLogo :title="getTitle" />
          </div>
          <n-scrollbar>
            <!-- 菜单 -->
            <SplitMenu
              v-if="getNavMode === 'vertical-mix'"
              :indent="12"
              :collapsed-width="64"
              :icon-size="16"
              v-model:collapsed="collapsed"
              v-model:location="getMenuLocationTow"
            />
            <PartionMenu
              v-else-if="getNavMode === 'vertical-sub'"
              :indent="12"
              :collapsed-width="64"
              :icon-size="16"
              :isTop="true"
              v-model:collapsed="collapsed"
              v-model:location="getMenuLocationTow"
            />
            <LeftMenu
              v-else
              :collapsed-width="64"
              :collapsed-icon-size="16"
              :icon-size="16"
              show-trigger="arrow-circle"
              v-model:collapsed="collapsed"
              v-model:location="getMenuLocation"
              style="padding-bottom: 62px"
            />
          </n-scrollbar>

          <!-- 垂直居右侧 展开/收起菜单 -->
          <div
            class="menu-toggle-button"
            :class="{ 'menu-toggle-light': isLight, 'menu-toggle-dark': isDarkTheme }"
            @click="toggleCollapsedNav"
            v-if="getNavMode != 'vertical-sub' && getTrigger(['all', 'right'])"
          >
            <n-el tag="div" class="menu-toggle-hand">
              <n-icon>
                <ChevronBackOutline v-if="!isCollapsed" />
                <ChevronForwardOutline v-else />
              </n-icon>
            </n-el>
          </div>

          <!-- 居底部 展开/收起菜单 -->
          <div
            class="menu-toggle-button-footer"
            :class="{
              'menu-toggle-collapsed': isCollapsed,
              'menu-toggle-light': isLight,
              'menu-toggle-dark': isDarkTheme,
            }"
            @click="toggleCollapsedNav"
            v-if="getNavMode != 'vertical-sub' && getTrigger(['all', 'footer'])"
          >
            <n-el tag="div" class="menu-toggle-hand">
              <n-icon>
                <MenuUnfoldOutlined v-if="isCollapsed" />
                <MenuFoldOutlined v-else />
              </n-icon>
            </n-el>
          </div>
        </div>
      </div>
      <!-- 左侧菜单分栏区域 -->
      <div
        class="naive-pro-sider naive-layout-sider naive-pro-sider-partion naive-pro-sider-fixed"
        :style="getSiderPartionStyle"
        :class="{
          'naive-pro-sider-light': isLight,
        }"
        v-show="isSubNav && !hideSubMenu"
      >
        <div class="naive-layout-sider-children">
          <div
            class="naive-pro-sider-partion-title"
            :class="{
              'naive-pro-sider-logo-light': isLight,
            }"
          >
            <PartionTitle :title="getTitle" />
          </div>
          <n-scrollbar>
            <!-- 菜单内容插槽 -->
            <LeftMenu
              :collapsed-width="64"
              :collapsed-icon-size="16"
              :icon-size="16"
              :indent="20"
              class="partion-sub-menu"
              show-trigger="arrow-circle"
              v-model:collapsed="collapsed"
              v-model:hideSubMenu="hideSubMenu"
              v-model:location="getMenuLocationTow"
              style="padding-bottom: 62px"
            />
          </n-scrollbar>
          <!-- 垂直居右侧 展开/收起菜单 -->
          <div
            class="menu-toggle-button"
            :class="{ 'menu-toggle-light': isLight, 'menu-toggle-dark': isDarkTheme }"
            @click="toggleCollapsedNav"
            v-if="getTrigger(['all', 'right'])"
          >
            <n-el tag="div" class="menu-toggle-hand">
              <n-icon>
                <ChevronBackOutline v-if="!isCollapsed" />
                <ChevronForwardOutline v-else />
              </n-icon>
            </n-el>
          </div>

          <!-- 居底部 展开/收起菜单 -->
          <div
            class="menu-toggle-button-footer"
            :class="{
              'menu-toggle-collapsed': isCollapsed,
              'menu-toggle-light': isLight,
              'menu-toggle-dark': isDarkTheme,
            }"
            @click="toggleCollapsedNav"
            v-if="getTrigger(['all', 'footer'])"
          >
            <n-el tag="div" class="menu-toggle-hand">
              <n-icon>
                <MenuUnfoldOutlined v-if="isCollapsed" />
                <MenuFoldOutlined v-else />
              </n-icon>
            </n-el>
          </div>
        </div>
      </div>

      <!-- 右侧内容区域 包含 header -->
      <div
        class="naive-layout"
        :class="{
          'naive-layout-dark': isDarkTheme,
          'naive-layout-tabs-show': isMultiTabs,
          'page-full-screen': isFullscreen,
        }"
      >
        <header
          class="naive-layout-header header-border-radius naive-layout-header-zhanwei"
          v-if="isFixedHeader || isVerticalMix"
          :style="getFixedHeaderWidth"
        ></header>
        <header
          class="naive-layout-header header-border-radius naive-pro-fixed-header-action"
          :class="{
            'naive-pro-header-dark': isDark,
            'naive-pro-fixed-header': isFixedHeader || isVerticalMix,
          }"
          :style="getFixedHeaderWidth"
        >
          <div class="naive-pro-global-header header-border-radius">
            <div
              class="naive-pro-global-header-logo"
              v-if="isHorizontal || isVerticalMix"
              :style="getFixedLogoWidth"
              :class="{
                'collapsed-logo': isCollapsed,
                'naive-pro-global-header-logo-light': (isHorizontal && !isDark) || isLight,
              }"
            >
              <SiderLogo :title="getTitle" />
            </div>
            <div class="header-menu-box">
              <template v-if="!['vertical-mix', 'horizontal'].includes(getNavMode)">
                <StockNav />
                <!-- 面包屑 -->
                <Breadcrumb />
              </template>
              <slot name="header-menu"></slot>
            </div>
            <div class="header-right">
              <slot name="header-right"></slot>
            </div>
          </div>
        </header>

        <div class="naive-layout-tabs-zhanwei" v-if="isMultiTabs && isFixedHeader"></div>

        <!-- 多页签 -->
        <div
          class="naive-layout-tabs"
          v-if="isMultiTabs"
          :style="getTabsViewWidth"
          :class="{ 'naive-layout-tabs-fixed': isFixedHeader }"
        >
          <TabsView v-model:collapsed="collapsed" @page-full-screen="togglePageFullScreen" />
        </div>

        <!-- 页面内容区域 -->
        <div class="naive-layout-content naive-pro-basicLayout-content">
          <div class="naive-pro-grid-content" ref="adminBodyRef" :class="{ wide: isWide }">
            <slot name="default"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, provide, ref } from 'vue';
  import { defaultSettings, PureSettings } from './defaultSettings';
  import { useSettingStore } from './hooks/useSettingStore';

  import SiderLogo from './components/SiderLogo.vue';
  import StockNav from './components/StockNav.vue';
  import Breadcrumb from './components/Breadcrumb.vue';
  import { TabsView } from '../../TagsView';

  import { ChevronBackOutline, ChevronForwardOutline } from '@vicons/ionicons5';
  import { MenuFoldOutlined, MenuUnfoldOutlined } from '@vicons/antd';
  import { useProjectSetting } from '@/hooks/setting/useProjectSetting';
  import { LeftMenu, SplitMenu, PartionMenu, PartionTitle } from '@/layout/components/Menu';
  import { MaybeElement, useFullscreen } from '@vueuse/core';
  const { getNavMode, getBorderRadius, getCollapsedNav, getHidePartionSubNav } =
    useProjectSetting();

  const {
    isWide,
    isLight,
    isDark,
    isDarkTheme,
    isVertical,
    isHorizontal,
    isVerticalMix,
    isCollapsed,
    isFixedHeader,
    isSubNav,
    getSiderStyle,
    getSiderPartionStyle,
    getFixedHeaderWidth,
    getFixedLogoWidth,
    getTabsViewWidth,
    getNavTrigger,
    isMultiTabs,
    toggleCollapsedNav,
  } = useSettingStore();

  const collapsed = ref<boolean>(getCollapsedNav.value);
  const hideSubMenu = ref<boolean>(getHidePartionSubNav.value);
  const adminBodyRef = ref<MaybeElement>();

  const { isFullscreen, toggle } = useFullscreen(adminBodyRef);

  provide('isPageFullScreen', isFullscreen);
  provide('collapsed', collapsed);

  const borderRadiusStr = computed(() => {
    return `${getBorderRadius.value}px`;
  });
  const getMenuLocation = computed(() => {
    return 'left';
  });

  const getMenuLocationTow = computed(() => {
    return 'left-tow';
  });

  const getTitle = computed(() => {
    return props.title;
  });

  const props = defineProps({
    title: {
      type: String as PropType<PureSettings['title']>,
      default: () => defaultSettings.title,
    },
    navMode: {
      type: String as PropType<PureSettings['navMode']>,
      default: () => defaultSettings.title,
    },
    navTheme: {
      type: String as PropType<PureSettings['navTheme']>,
      default: () => defaultSettings.title,
    },
    contentWidth: {
      type: String as PropType<PureSettings['contentWidth']>,
      default: () => defaultSettings.contentWidth,
    },
    fixedHeader: {
      type: Boolean as PropType<PureSettings['fixedHeader']>,
      default: () => defaultSettings.fixedHeader,
    },
    navWidth: {
      type: Number as PropType<PureSettings['navWidth']>,
      default: () => defaultSettings.navWidth,
    },
    navMinWidth: {
      type: Number as PropType<PureSettings['navMinWidth']>,
      default: () => defaultSettings.navMinWidth,
    },
    subNavWidth: {
      type: Number as PropType<PureSettings['subNavWidth']>,
      default: () => defaultSettings.subNavWidth,
    },
    headerHeight: {
      type: Number as PropType<PureSettings['headerHeight']>,
      default: () => defaultSettings.headerHeight,
    },
  });

  function getTrigger(where: string[]) {
    const trigger = getNavTrigger.value;
    if (trigger === 'none') return false;
    return where.includes(trigger);
  }

  //切换内容页全屏
  function togglePageFullScreen() {
    toggle();
  }
</script>

<style lang="less" scoped>
  .header-border-radius {
    border-radius: 0 0 v-bind(borderRadiusStr) v-bind(borderRadiusStr);
  }
</style>
