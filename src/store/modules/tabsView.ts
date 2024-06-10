import { defineStore } from 'pinia';
import { RouteLocationNormalized } from 'vue-router';
import { useAsyncRouteStore } from '@/store/modules/asyncRoute';
import { storage } from '@/utils/Storage';
import { TABS_ROUTES } from '@/enums/common';

// 不需要出现在标签页中的路由
const whiteList = ['Redirect', 'Login'];

export type RouteItem = Partial<RouteLocationNormalized> & {
  fullPath: string;
  path: string;
  name: string;
  hash: string;
  meta: object;
  params: object;
  query: object;
};

export type ITabsViewState = {
  tabsList: RouteItem[]; // 标签页
  mystore: RouteItem[]; // 我的收藏
};

//过滤当前路由
function filterCurrentRoute(list: RouteItem[], activeKey) {
  return list.filter((item) => item.fullPath != activeKey);
}

//保留固定路由
function retainAffixRoute(list: RouteItem[]) {
  return list.filter((item) => item?.meta?.affix ?? false);
}

//筛序最新的
function filterNewTabs(sliceTabs: RouteItem[], tabsList: RouteItem[], activeKey = '') {
  const pathList: string[] = [];
  for (const item of sliceTabs) {
    const affix = item?.meta?.affix ?? false;
    if (!affix) {
      pathList.push(item.fullPath);
    }
  }
  return tabsList.filter(
    (item) => item.fullPath === activeKey || !pathList.includes(item.fullPath),
  );
}

export const useTabsViewStore = defineStore({
  id: 'app-tabs-view',
  state: (): ITabsViewState => ({
    tabsList: <RouteItem[]>[],
    mystore: <RouteItem[]>[],
  }),
  persist: {
    key: 'APP-TABS-VIEW',
  },
  getters: {
    getTabList(): RouteItem[] {
      return this.tabsList;
    },
    getMystore(): RouteItem[] {
      return this.mystore;
    },
  },
  actions: {
    //查找设置缓存name
    findKeepAliveNames(list) {
      const names = [];
      list.forEach((item) => {
        if (item.meta?.keepAlive) {
          names.push(item.name as never);
        }
      });
      return names;
    },
    //从缓存中删除关闭的路由
    delKeepAliveNames(list) {
      const asyncRouteStore = useAsyncRouteStore();
      const names = this.findKeepAliveNames(list);
      asyncRouteStore.removeKeepAliveComponents(names);
    },
    // 初始化标签页
    initTabs(routes) {
      this.tabsList = routes;
    },
    // 添加我的收藏
    addMystore(route) {
      if (whiteList.includes(route.name)) return false;
      const isExists = this.mystore.some((item) => item.path === route.path);
      if (!isExists) {
        this.mystore.push(route);
      } else {
        //如果是存在的路由，则删除
        const _index = this.mystore.findIndex((item) => item.path === route.path);
        this.mystore.splice(_index, 1);
      }
    },
    // 添加标签页
    addTabs(route): boolean {
      if (whiteList.includes(route.name)) return false;
      const isExists = this.tabsList.some((item) => item.fullPath == route.fullPath);
      if (!isExists) {
        this.tabsList.push(route);
      } else {
        //如果是存在的路由，则刷新信息
        const _index = this.tabsList.findIndex((item) => item.fullPath == route.fullPath);
        this.tabsList[_index] = route;
      }
      return true;
    },
    // 关闭左侧
    closeLeftTabs(route, activeKey) {
      const index = this.tabsList.findIndex((item) => item.fullPath == route.value.fullPath);
      if (index > 0) {
        const leftTabs = this.tabsList.slice(0, index);
        const newLeftTabs = filterCurrentRoute(leftTabs, activeKey);
        this.delKeepAliveNames(newLeftTabs);
        this.tabsList = filterNewTabs(newLeftTabs, this.tabsList, activeKey);
      }
    },
    // 关闭右侧
    closeRightTabs(route, activeKey) {
      const index = this.tabsList.findIndex((item) => item.fullPath == route.value.fullPath);
      if (index >= 0 && index < this.tabsList.length - 1) {
        const rightTabs = this.tabsList.slice(index + 1, this.tabsList.length);
        const newRightTabs = filterCurrentRoute(rightTabs, activeKey);
        this.delKeepAliveNames(newRightTabs);
        this.tabsList = filterNewTabs(newRightTabs, this.tabsList, activeKey);
      }
    },
    // 关闭其他
    closeOtherTabs(route, activeKey) {
      const newTabsList = this.tabsList.filter(
        (item) =>
          ([route.value.fullPath, activeKey].includes(item.fullPath) || item?.meta?.affix) ?? false,
      );
      this.delKeepAliveNames(newTabsList);
      this.tabsList = newTabsList;
    },
    // 关闭当前页
    closeCurrentTab(route) {
      const index = this.tabsList.findIndex((item) => item.fullPath == route.value.fullPath);
      if (index != -1) {
        this.delKeepAliveNames([this.tabsList[index]]);
        this.tabsList.splice(index, 1);
      }
    },
    // 关闭全部
    closeAllTabs() {
      this.delKeepAliveNames(this.tabsList);
      this.tabsList = retainAffixRoute(this.tabsList);
    },
    // 设置标题
    async setTabTitle(title: string, route: RouteLocationNormalized) {
      this.tabsList.forEach((item) => {
        if (item.fullPath === route.fullPath) {
          item.meta.title = title;
        }
      });
      storage.set(TABS_ROUTES, JSON.stringify(this.tabsList));
    },
    // 设置状态
    async setTabState(params, route: RouteLocationNormalized) {
      this.tabsList.forEach((item) => {
        if (item.fullPath === route.fullPath) {
          item.meta = {
            ...item.meta,
            ...params,
          };
        }
      });
      storage.set(TABS_ROUTES, JSON.stringify(this.tabsList));
    },
  },
});
