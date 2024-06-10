<template>
  <div
    :style="getChangeStyle"
    class="tabs-view"
    :class="{
      'tabs-view-default-background': designStore.getDarkTheme === false,
      'tabs-view-dark-background': designStore.getDarkTheme === true,
    }"
  >
    <div class="tabs-view-main">
      <div ref="navWrap" :class="{ 'tabs-card-scrollable': scrollable }" class="tabs-card">
        <n-el
          tag="span"
          :class="{ 'tabs-card-prev-hide': !scrollable }"
          class="tabs-card-prev"
          @click="scrollPrev"
        >
          <n-icon size="16">
            <LeftOutlined />
          </n-icon>
        </n-el>
        <n-el
          tag="span"
          :class="{ 'tabs-card-next-hide': !scrollable }"
          class="tabs-card-next"
          @click="scrollNext"
        >
          <n-icon size="16">
            <RightOutlined />
          </n-icon>
        </n-el>
        <div ref="navScroll" class="tabs-card-scroll">
          <Draggable :list="tabsList" animation="300" class="flex" item-key="fullPath">
            <template #item="{ element, index }">
              <n-el
                tag="div"
                :id="`tag${element.fullPath.split('/').join('\/')}`"
                :class="{ 'active-item': activeKey === element.fullPath }"
                class="shadow-sm tabs-card-scroll-item"
                @contextmenu="handleContextMenu($event, element, index)"
                @click.stop="goPage(element)"
              >
                <Render :ref="`renderDom_${index}`" :value="getRender(element.meta.title)" />
                <n-badge class="ml-1" v-if="element.meta.state === 'undone'" type="warning" dot />
                <n-icon v-if="!element.meta.affix" size="14" @click.stop="closeTabItem(element)">
                  <CloseOutlined />
                </n-icon>
              </n-el>
            </template>
          </Draggable>
        </div>
      </div>
      <n-el class="tabs-close">
        <n-dropdown
          :options="TabsMenuOptions"
          placement="bottom-end"
          trigger="hover"
          @select="closeHandleSelect"
        >
          <div class="tabs-close-btn">
            <n-icon size="16">
              <DownOutlined />
            </n-icon>
          </div>
        </n-dropdown>
      </n-el>
      <n-dropdown
        :options="TabsMenuOptions"
        :show="showDropdown"
        :x="dropdownX"
        :y="dropdownY"
        placement="bottom-start"
        @clickoutside="onClickOutside"
        @select="closeHandleSelect"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, unref, provide, watch, onMounted, nextTick, toRaw, inject } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { storage } from '@/utils/Storage';
  import { TABS_ROUTES } from '@/enums/common';
  import { useTabsViewStore } from '@/store/modules/tabsView';
  import { useAsyncRouteStore } from '@/store/modules/asyncRoute';
  import { RouteItem } from '@/store/modules/tabsView';
  import { useProjectSetting } from '@/hooks/setting/useProjectSetting';
  import { useMessage } from 'naive-ui';
  import Draggable from 'vuedraggable';
  import { PageEnum } from '@/enums/pageEnum';
  import {
    DownOutlined,
    ReloadOutlined,
    CloseOutlined,
    SwapOutlined,
    LeftOutlined,
    RightOutlined,
    DoubleLeftOutlined,
    DoubleRightOutlined,
    MinusOutlined,
    CompressOutlined,
    ExpandOutlined,
  } from '@vicons/antd';
  import { renderIcon } from '@/utils/index';
  import elementResizeDetectorMaker from 'element-resize-detector';
  import { useProjectSettingStore } from '@/store/modules/projectSetting';
  import { useDesignSettingStore } from '@/store/modules/designSetting';
  import { useGo, useRedo } from '@/hooks/web/usePage';
  import { useDialog } from 'naive-ui';
  import { Render, getRender } from '@/components/Render';

  const props = defineProps({
    collapsed: {
      type: Boolean,
    },
  });

  const emit = defineEmits(['pageFullScreen']);

  const designStore = useDesignSettingStore();
  const { getNavMode, getNavWidth, getNavMinWidth } = useProjectSetting();
  const settingStore = useProjectSettingStore();
  const go = useGo();
  const message = useMessage();
  const dialog = useDialog();
  const route = useRoute();
  const router = useRouter();
  const tabsViewStore = useTabsViewStore();
  const asyncRouteStore = useAsyncRouteStore();
  const navScroll: any = ref(null);
  const navWrap: any = ref(null);
  const activeKey = ref(route.fullPath);
  const scrollable = ref(false);
  const dropdownX = ref(0);
  const dropdownY = ref(0);
  const showDropdown = ref(false);
  const closeLeftTab = ref(false);
  const closeRightTab = ref(false);
  const closeCurrent = ref(false);
  const currentTabRoute = ref(null);
  const refreshCurrent = ref(true);

  // 获取简易的路由对象
  const getSimpleRoute = (route): RouteItem => {
    const { fullPath, hash, meta, name, params, path, query } = route;
    return { fullPath, hash, meta, name, params, path, query };
  };

  const isMixMenuNoneSub = computed(() => {
    const mixMenu = settingStore.isMixMenu;
    const currentRoute = useRoute();
    const navMode = unref(getNavMode);
    if (unref(navMode) != 'horizontal-mix') return true;
    if (unref(navMode) === 'horizontal-mix' && mixMenu && currentRoute.meta.isRoot) {
      return false;
    }
    return true;
  });

  //动态组装样式 菜单缩进
  const getChangeStyle = computed(() => {
    const { collapsed } = props;
    const navMode = unref(getNavMode);
    const minMenuWidth = getNavMinWidth.value;
    const menuWidth = getNavWidth.value;
    let lenNum =
      navMode === 'horizontal' || !isMixMenuNoneSub.value
        ? '0px'
        : collapsed
        ? `${minMenuWidth}px`
        : `${menuWidth}px`;
    return {
      left: lenNum,
      width: `calc(100%)`,
    };
  });

  const getPageFullScreen = inject('isPageFullScreen');

  //tags 右键右侧下拉菜单
  const TabsMenuOptions = computed(() => {
    const disabled = unref(tabsList).length === 1;
    return [
      {
        label: unref(getPageFullScreen) ? '退出全屏' : '内容全屏',
        key: '7',
        icon: getPageFullScreen ? renderIcon(CompressOutlined) : renderIcon(ExpandOutlined),
      },
      {
        label: '刷新当前',
        key: '1',
        icon: renderIcon(ReloadOutlined),
        disabled: refreshCurrent.value,
      },
      {
        label: `关闭当前`,
        key: '2',
        disabled: closeCurrent.value || disabled,
        icon: renderIcon(MinusOutlined),
      },
      {
        label: '关闭其他',
        key: '3',
        disabled: disabled,
        icon: renderIcon(SwapOutlined),
      },
      {
        label: '关闭左侧',
        key: '5',
        disabled: closeLeftTab.value,
        icon: renderIcon(DoubleLeftOutlined),
      },
      {
        label: '关闭右侧',
        key: '6',
        disabled: closeRightTab.value,
        icon: renderIcon(DoubleRightOutlined),
      },
      {
        label: '关闭全部',
        key: '4',
        disabled: disabled,
        icon: renderIcon(CloseOutlined),
      },
    ];
  });

  // 移除缓存组件名称
  const delKeepAliveCompName = () => {
    if (route.meta.keepAlive) {
      const name = router.currentRoute.value.matched.find((item) => item.name == route.name)
        ?.components?.default.name;
      if (name) {
        asyncRouteStore.keepAliveComponents = asyncRouteStore.keepAliveComponents.filter(
          (item) => item != name,
        );
      }
    }
  };

  // 标签页列表
  const tabsList: any = computed(() => tabsViewStore.tabsList);
  const whiteList: string[] = [
    PageEnum.BASE_LOGIN_NAME,
    PageEnum.REDIRECT_NAME,
    PageEnum.ERROR_PAGE_NAME,
  ];

  watch(
    () => route.fullPath,
    (to) => {
      // 如果您用的路由模式是 hash 请去掉，|| route.hash 判断条件
      if (whiteList.includes(route.name as string) || route.hash || route.meta.tagView === false)
        return;
      activeKey.value = to;
      currentTabRoute.value = null;
      refreshCurrent.value = false;
      tabsViewStore.addTabs(getSimpleRoute(route));
      nextTick().then(() => {
        updateNavScroll(true);
        refreshTabDisabled(getTabIndex());
      });
    },
    { immediate: true },
  );
  // 在页面关闭或刷新之前，保存数据
  window.addEventListener('beforeunload', () => {
    storage.set(TABS_ROUTES, JSON.stringify(tabsList.value));
  });
  // 关闭当前页面
  const removeTab = (route) => {
    if (tabsList.value.length === 1) {
      return message.warning('这已经是最后一页，不能再关闭了！');
    }
    const routeInfo = unref(route);
    //判断当前页标签状态 阻止关闭 只是提供思路，更多个性化功能，自行调整
    if (routeInfo.meta.state && routeInfo.meta.state === 'undone') {
      const { content } = routeInfo.meta.dialogOptions;
      dialog.info({
        title: '提示',
        content,
        positiveText: '确定',
        negativeText: '取消',
        onPositiveClick: () => {
          directRemoveTab(route);
        },
        onNegativeClick: () => {},
      });
    } else directRemoveTab(route);
  };

  function directRemoveTab(route) {
    delKeepAliveCompName();
    tabsViewStore.closeCurrentTab(route);
    asyncRouteStore.removeKeepAliveComponents([route.value.name]);
    // 如果关闭的是当前页
    if (activeKey.value === route.value.fullPath) {
      const currentRoute = tabsList.value[Math.max(0, tabsList.value.length - 1)];
      activeKey.value = currentRoute.fullPath;
      router.push(currentRoute);
    }
    updateNavScroll();
  }

  // 刷新页面
  async function reloadPage() {
    delKeepAliveCompName();
    const redo = useRedo(router);
    await redo();
  }

  // 注入刷新页面方法
  provide('reloadPage', reloadPage);

  // 关闭左侧
  const closeLeft = (route) => {
    tabsViewStore.closeLeftTabs(route, activeKey.value);
    router.replace(route.fullPath);
    updateNavScroll();
  };

  // 关闭右侧
  const closeRight = (route) => {
    tabsViewStore.closeRightTabs(route, activeKey.value);
    router.replace(route.fullPath);
    updateNavScroll();
  };
  // 关闭其他
  const closeOther = (route) => {
    tabsViewStore.closeOtherTabs(route, activeKey.value);
    router.replace(route.fullPath);
    updateNavScroll();
  };
  // 关闭全部
  const closeAll = () => {
    tabsViewStore.closeAllTabs();
    router.replace(PageEnum.BASE_HOME_REDIRECT);
    updateNavScroll();
  };

  //当前路由对象 或者 右键选择tab路由对象
  const getCurrentTabRoute = computed(() =>
    currentTabRoute.value ? currentTabRoute.value : route,
  );

  //tab 操作
  const closeHandleSelect = (key) => {
    switch (key) {
      //刷新
      case '1':
        reloadPage();
        break;
      //关闭
      case '2':
        removeTab(getCurrentTabRoute);
        break;
      //关闭其他
      case '3':
        closeOther(getCurrentTabRoute);
        break;
      //关闭所有
      case '4':
        closeAll();
        break;
      //关闭左侧
      case '5':
        closeLeft(getCurrentTabRoute);
        break;
      //关闭右侧
      case '6':
        closeRight(getCurrentTabRoute);
        break;
      //内容页全屏
      case '7':
        emit('pageFullScreen');
        break;
    }
    updateNavScroll();
    showDropdown.value = false;
  };

  /**
   * @param value 要滚动到的位置
   * @param amplitude 每次滚动的长度
   */
  function scrollTo(value: number, amplitude: number) {
    const currentScroll = navScroll.value.scrollLeft;
    const scrollWidth =
      (amplitude > 0 && currentScroll + amplitude >= value) ||
      (amplitude < 0 && currentScroll + amplitude <= value)
        ? value
        : currentScroll + amplitude;
    navScroll.value && navScroll.value.scrollTo(scrollWidth, 0);
    if (scrollWidth === value) return;
    return window.requestAnimationFrame(() => scrollTo(value, amplitude));
  }

  function scrollPrev() {
    const containerWidth = navScroll.value.offsetWidth;
    const currentScroll = navScroll.value.scrollLeft;
    if (!currentScroll) return;
    const scrollLeft = currentScroll > containerWidth ? currentScroll - containerWidth : 0;
    scrollTo(scrollLeft, (scrollLeft - currentScroll) / 20);
  }

  function scrollNext() {
    const containerWidth = navScroll.value.offsetWidth;
    const navWidth = navScroll.value.scrollWidth;
    const currentScroll = navScroll.value.scrollLeft;
    if (navWidth - currentScroll / 2 <= containerWidth) return;
    const scrollLeft =
      navWidth - currentScroll > containerWidth * 2
        ? currentScroll + containerWidth
        : navWidth - containerWidth;
    scrollTo(scrollLeft, (scrollLeft - currentScroll) / 20);
  }

  /**
   * @param autoScroll 是否开启自动滚动功能
   */
  function updateNavScroll(autoScroll?: boolean) {
    if (!navScroll.value) return;
    const containerWidth = navScroll.value.offsetWidth;
    const navWidth = navScroll.value.scrollWidth;
    if (containerWidth < navWidth) {
      scrollable.value = true;
      if (autoScroll) {
        let tagList = navScroll.value.querySelectorAll('.tabs-card-scroll-item') || [];
        [...tagList].forEach((tag: HTMLElement) => {
          // fix SyntaxError
          if (tag.id === `tag${activeKey.value.split('/').join('\/')}`) {
            tag.scrollIntoView && tag.scrollIntoView();
          }
        });
      }
    } else {
      scrollable.value = false;
    }
  }

  function handleResize() {
    updateNavScroll(true);
  }

  function handleContextMenu(e, item, index) {
    e.preventDefault();
    showDropdown.value = false;
    currentTabRoute.value = toRaw(item);
    refreshCurrent.value = !(activeKey.value === item.fullPath);
    refreshTabDisabled(index);

    nextTick().then(() => {
      showDropdown.value = true;
      dropdownX.value = e.clientX;
      dropdownY.value = e.clientY;
    });
  }

  function getTabIndex() {
    return unref(tabsList).findIndex((item) => item.fullPath === activeKey.value);
  }

  function onClickOutside() {
    showDropdown.value = false;
    currentTabRoute.value = null;
    refreshCurrent.value = false;
    const index = getTabIndex();
    refreshTabDisabled(index);
  }

  function refreshTabDisabled(index) {
    closeCurrent.value = unref(tabsList)[index].meta?.affix ?? false;
    closeLeftTab.value = !(unref(tabsList).length > 0 && index > 0);
    closeRightTab.value = !(index < unref(tabsList).length && index != unref(tabsList).length - 1);
  }

  //tags 跳转页面
  function goPage(e) {
    const { fullPath } = e;
    closeCurrent.value = e.meta?.affix ?? false;
    if (fullPath === route.fullPath) return;
    activeKey.value = fullPath;
    go(e, true);
  }

  //删除tab
  function closeTabItem(e) {
    const { fullPath } = e;
    const routeInfo = ref(tabsList.value.find((item) => item.fullPath == fullPath));
    removeTab(routeInfo);
  }

  onMounted(() => {
    onElementResize();
  });

  function onElementResize() {
    let observer;
    observer = elementResizeDetectorMaker();
    observer.listenTo(navWrap.value, handleResize);
  }
</script>

<style lang="less" scoped>
  .tabs-view {
    width: 100%;
    padding: 6px 0;
    display: flex;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &-main {
      height: 32px;
      display: flex;
      max-width: 100%;
      min-width: 100%;
      box-sizing: border-box;

      .tabs-card {
        -webkit-box-flex: 1;
        flex-grow: 1;
        flex-shrink: 1;
        overflow: hidden;
        position: relative;

        .tabs-card-prev,
        .tabs-card-next {
          width: 32px;
          text-align: center;
          position: absolute;
          line-height: 32px;
          cursor: pointer;

          .n-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 32px;
            width: 32px;
          }
        }

        .tabs-card-prev {
          left: 0;
        }

        .tabs-card-next {
          right: 0;
        }

        .tabs-card-next-hide,
        .tabs-card-prev-hide {
          display: none;
        }

        &-scroll {
          white-space: nowrap;
          overflow: hidden;

          &-item {
            background: var(--card-color);
            color: var(--text-color-base);
            height: 32px;
            padding: 6px 16px 4px;
            border-radius: 3px;
            margin-right: 6px;
            cursor: pointer;
            display: inline-block;
            position: relative;
            flex: 0 0 auto;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

            span {
              float: left;
              vertical-align: middle;
            }

            &:hover {
              color: #515a6e;
            }

            .n-icon {
              height: 22px;
              width: 21px;
              margin-right: -6px;
              position: relative;
              vertical-align: middle;
              text-align: center;
              color: #808695;

              &:hover {
                color: #515a6e !important;
              }

              svg {
                height: 21px;
                display: inline-block;
              }
            }
          }

          .active-item {
            color: var(--primary-color);
          }
        }
      }

      .tabs-card-scrollable {
        padding: 0 32px;
        overflow: hidden;
      }
    }

    .tabs-close {
      min-width: 32px;
      width: 32px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      background: var(--card-color);
      border-radius: 2px;
      cursor: pointer;
      //margin-right: 10px;
      &-btn {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  .tabs-view-default-background {
    background: #f0f2f5;
  }

  .tabs-view-dark-background {
    background: #101014;
  }

  .tabs-view-fix {
    position: fixed;
    z-index: 5;
    padding: 6px 19px 6px 10px;
    left: 200px;
  }

  .tabs-view-fixed-header {
    top: 0;
  }
</style>
