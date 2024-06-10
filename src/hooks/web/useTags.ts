import { unref } from 'vue';
import { RouteLocationNormalized, useRouter } from 'vue-router';
import type { Router } from 'vue-router';
import { useTabsViewStore } from '@/store/modules/tabsView';
import { useAsyncRouteStore } from '@/store/modules/asyncRoute';

export function useTabs(_router?: Router) {
  const asyncRouteStore = useAsyncRouteStore();
  const tabsViewStore = useTabsViewStore();
  const router = _router || useRouter();

  interface StateParame {
    state?: String;
    dialogOptions?: Object;
  }

  const { currentRoute } = router;

  //默认是操作当前页面 也可以传入 router
  function getCurrentTab() {
    const route = unref(currentRoute);
    return tabsViewStore.getTabList.find(
      (item) => item.path === route.path,
    )! as RouteLocationNormalized;
  }

  //更新tab标题
  async function updateTabTitle(title: string, tab?: RouteLocationNormalized) {
    const targetTab = tab || getCurrentTab();
    await tabsViewStore.setTabTitle(title, targetTab);
  }

  //关闭当前页面
  function closeCurrentTab() {
    tabsViewStore.closeCurrentTab(currentRoute);
    asyncRouteStore.removeKeepAliveComponents([currentRoute.value.name]);
    const _currentRoute =
      tabsViewStore.getTabList[Math.max(0, tabsViewStore.getTabList.length - 1)];
    router.push(_currentRoute);
  }

  //更新tab状态
  async function setTabState(params: StateParame) {
    const targetTab = getCurrentTab();
    await tabsViewStore.setTabState(params, targetTab);
  }

  return {
    closeCurrent: () => closeCurrentTab(),
    setTitle: (title: string, tab?) => updateTabTitle(title, tab),
    setTabState,
  };
}
