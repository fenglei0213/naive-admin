import { adminMenus } from '@/api/system/menu';
import { constantRouterIcon } from '../icons/router-icons';
import { RouteRecordRaw } from 'vue-router';
import { Layout, ParentLayout } from '@/router/base';
import type { AppRouteRecordRaw } from '@/router/types';
import { cloneDeep } from 'lodash-es';

const Iframe = () => import('@/views/iframe/index.vue');
const LayoutMap = new Map<string, () => Promise<typeof import('*.vue')>>();

LayoutMap.set('LAYOUT', Layout);
LayoutMap.set('IFRAME', Iframe);
LayoutMap.set('ParentLayout', ParentLayout);

/**
 * 格式化 后端 结构信息并递归生成层级路由表
 * @param routerMap
 * @param parent
 * @returns {*}
 */
export const routerGenerator = (routerMap, parent?): any[] => {
  return routerMap.map((item) => {
    const currentRouter: any = {
      // 路由地址 动态拼接生成如 /dashboard/workplace
      path: `${(parent && parent.path) || ''}/${item.path}`,
      // 路由名称，建议唯一
      name: item.name || '',
      // 该路由对应页面的 组件
      component: item.component,
      // meta: 页面标题, 菜单图标, 页面权限(供指令权限用，可去掉)
      meta: {
        ...item.meta,
        label: item.meta.title,
        icon: constantRouterIcon[item.meta.icon] || null,
        permissions: item.meta.permissions || null,
      },
    };

    // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
    currentRouter.path = currentRouter.path.replace('//', '/');
    // 重定向
    item.redirect && (currentRouter.redirect = item.redirect);
    // 是否有子菜单，并递归处理
    if (item.children && item.children.length > 0) {
      //如果未定义 redirect 默认第一个子路由为 redirect
      !item.redirect && (currentRouter.redirect = `${item.path}/${item.children[0].path}`);
      // Recursion
      currentRouter.children = routerGenerator(item.children, currentRouter);
    }
    return currentRouter;
  });
};

/**
 * 动态生成菜单
 * @returns {Promise<Router>}
 */
export const generatorDynamicRouter = (): Promise<RouteRecordRaw[]> => {
  return new Promise((resolve, reject) => {
    adminMenus()
      .then((result) => {
        const routeList = routerGenerator(result);
        asyncImportRoute(routeList);
        resolve(routeList);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

/**
 * 查找views中对应的组件文件
 * */
let viewsModules: Record<string, () => Promise<Recordable>>;
export const asyncImportRoute = (routes: AppRouteRecordRaw[] | undefined): void => {
  viewsModules = viewsModules || import.meta.glob('../../views/**/*.{vue,tsx}');
  if (!routes) return;
  routes.forEach((item) => {
    if (!item.component && item.meta?.frameSrc) {
      item.component = 'IFRAME';
    }
    const { component, name } = item;
    const { children } = item;
    if (component) {
      const layoutFound = LayoutMap.get(component as string);
      if (layoutFound) {
        item.component = layoutFound;
      } else {
        item.component = dynamicImport(viewsModules, component as string);
      }
    } else if (name) {
      item.component = ParentLayout;
    }
    children && asyncImportRoute(children);
  });
};

/**
 * 动态导入
 * */
export const dynamicImport = (
  viewsModules: Record<string, () => Promise<Recordable>>,
  component: string,
) => {
  const keys = Object.keys(viewsModules);
  const matchKeys = keys.filter((key) => {
    let k = key.replace('../../views', '');
    const lastIndex = k.lastIndexOf('.');
    k = k.substring(0, lastIndex);
    return k === component;
  });
  if (matchKeys?.length === 1) {
    const matchKey = matchKeys[0];
    return viewsModules[matchKey];
  }
  if (matchKeys?.length > 1) {
    console.warn(
      'Please do not create `.vue` and `.TSX` files with the same file name in the same hierarchical directory under the views folder. This will cause dynamic introduction failure',
    );
    return;
  }
};

/**
 * 判断路由是否超过2级
 * */
export function isMultipleRoute(routeModule: AppRouteRecordRaw) {
  if (!routeModule || !Reflect.has(routeModule, 'children') || !routeModule.children?.length) {
    return false;
  }
  const children = routeModule.children;

  let isFlag = false;
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (child.children?.length) {
      isFlag = true;
      break;
    }
  }
  return isFlag;
}

/**
 * 拍平多级菜单
 * */
export function clapMultipleRoute(routeModules: AppRouteRecordRaw[]) {
  const modules: AppRouteRecordRaw[] = cloneDeep(routeModules);
  for (let i = 0; i < modules.length; i++) {
    const routeModule = modules[i];
    if (!isMultipleRoute(routeModule)) {
      continue;
    }
    routeModule.children = castToFlatRoute(routeModule.children, '');
  }
  return modules;
}

/**
 * 将子路由转换为扁平化路由数组（仅一级）
 * @param {待转换的子路由数组} routes
 * @param {父级路由路径} parentPath
 */
export function castToFlatRoute(routes, parentPath, flatRoutes: any[] = []) {
  for (const item of routes) {
    if (item.children && item.children.length > 0) {
      if (item.redirect && item.redirect !== 'noRedirect') {
        flatRoutes.push({
          ...item,
        });
      }
      castToFlatRoute(item.children, parentPath + '/' + item.path, flatRoutes);
    } else {
      flatRoutes.push({
        ...item,
      });
    }
  }
  return flatRoutes;
}
