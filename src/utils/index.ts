import { h, unref } from 'vue';
import type { App, Plugin } from 'vue';
import { NIcon, NTag } from 'naive-ui';
import { PageEnum } from '@/enums/pageEnum';
import { isObject, isString, isNumber } from './is/index';
import { cloneDeep } from 'lodash-es';
import { DocumentOutline } from '@vicons/ionicons5';

/**
 * render 图标
 * */
export function renderIcon(icon, props?: any) {
  return () => h(NIcon, props, { default: () => h(icon) });
}

/**
 * render new Tag
 * */
const newTagColors = { color: '#f90', textColor: '#fff', borderColor: '#f90' };

export function renderNew(type = 'warning', text = 'New', color: object = newTagColors) {
  return () =>
    h(
      NTag as any,
      {
        type,
        round: true,
        size: 'small',
        color,
      },
      { default: () => text },
    );
}

/**
 * 递归组装菜单格式
 */
export function generatorMenu(routerMap: Array<any>) {
  return filterRouter(routerMap).map((item) => {
    const isRoot = isRootRouter(item);
    const info = isRoot ? item.children[0] : item;
    const currentMenu = {
      ...info,
      ...info.meta,
      label: info.meta?.title,
      key: info.name,
      icon: isRoot ? item.meta?.icon : info.meta?.icon,
    };
    // 是否有子菜单，并递归处理
    if (info.children && info.children.length > 0) {
      // Recursion
      currentMenu.children = generatorMenu(info.children);
    }
    return currentMenu;
  });
}

/**
 * 混合菜单
 * */
export function generatorMenuMix(
  routerMap: Array<any>,
  routerName: string,
  location: string,
  isTop?: boolean,
) {
  const cloneRouterMap = cloneDeep(routerMap);
  const newRouter = filterRouter(cloneRouterMap);
  if (isTop && ['left-tow', 'top'].includes(location)) {
    const firstRouter: any[] = [];
    newRouter.forEach((item) => {
      const isRoot = isRootRouter(item);
      const info = isRoot ? item.children[0] : item;
      info.children = undefined;
      const currentMenu = {
        ...info,
        ...info.meta,
        label: info.meta?.title,
        key: info.name,
      };
      firstRouter.push(currentMenu);
    });
    return firstRouter;
  } else {
    const currentRouters = newRouter.filter((item) => item.name === routerName);
    const childrenRouter = currentRouters.length ? currentRouters[0].children || [] : [];
    return getChildrenRouter(childrenRouter);
  }
}

/**
 * 递归组装子菜单
 * */
export function getChildrenRouter(routerMap: Array<any>) {
  return filterRouter(routerMap).map((item) => {
    const isRoot = isRootRouter(item);
    const info = isRoot ? item.children[0] : item;
    const currentMenu = {
      ...info,
      ...info.meta,
      label: info.meta?.title,
      key: info.name,
    };
    // 拆分菜单 默认设置一个菜单图标 可自行更改 或 去除
    if (!currentMenu.icon) {
      currentMenu.icon = renderIcon(DocumentOutline);
    }
    // 是否有子菜单，并递归处理
    if (info.children && info.children.length > 0) {
      // Recursion
      currentMenu.children = getChildrenRouter(info.children);
    }
    return currentMenu;
  });
}

/**
 * 判断根路由 Router
 * */
export function isRootRouter(item) {
  return item.meta?.alwaysShow === true && item.children?.length === 1;
}

/**
 * 排除Router
 * */
export function filterRouter(routerMap: Array<any>) {
  return routerMap.filter((item) => {
    return (
      (item.meta?.hidden || false) != true &&
      !['/:path(.*)*', '/', PageEnum.REDIRECT, PageEnum.BASE_LOGIN].includes(item.path)
    );
  });
}

export const withInstall = <T>(component: T, alias?: string) => {
  const comp = component as any;
  comp.install = (app: App) => {
    app.component(comp.name || comp.displayName, component);
    if (alias) {
      app.config.globalProperties[alias] = component;
    }
  };
  return component as T & Plugin;
};

/**
 *  找到对应的节点
 * */
let result = null;

export function getTreeItem(data: any[], key?: string | number, keyField = 'key'): any {
  data.map((item) => {
    if (item[keyField] === key) {
      result = item;
    } else {
      if (item.children && item.children.length) {
        getTreeItem(item.children, key, keyField);
      }
    }
  });
  return result;
}

/**
 *  找到所有节点
 * */
export function getTreeAll(data: any[]): string[] {
  const results: string[] = [];
  data.map((item) => {
    results?.push(item.key as string);
    if (item.children && item.children.length) {
      getTreeAll(item.children);
    }
  });
  return results;
}

// dynamic use hook props
export function getDynamicProps<T, U>(props: T): Partial<U> {
  const ret: Recordable = {};

  Object.keys(props).map((key) => {
    ret[key] = unref((props as Recordable)[key]);
  });
  return ret as Partial<U>;
}

export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string;
  for (key in target) {
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key]);
  }
  return src;
}

/**
 * Sums the passed percentage to the R, G or B of a HEX color
 * @param {string} color The color to change
 * @param {number} amount The amount to change the color by
 * @returns {string} The processed part of the color
 */
function addLight(color: string, amount: number) {
  const cc = parseInt(color, 16) + amount;
  const c = cc > 255 ? 255 : cc;
  return c.toString(16).length > 1 ? c.toString(16) : `0${c.toString(16)}`;
}

/**
 * Lightens a 6 char HEX color according to the passed percentage
 * @param {string} color The color to change
 * @param {number} amount The amount to change the color by
 * @returns {string} The processed color represented as HEX
 */
export function lighten(color: string, amount: number) {
  color = color.indexOf('#') >= 0 ? color.substring(1, color.length) : color;
  amount = Math.trunc((255 * amount) / 100);
  return `#${addLight(color.substring(0, 2), amount)}${addLight(
    color.substring(2, 4),
    amount,
  )}${addLight(color.substring(4, 6), amount)}`;
}

export function openWindow(
  url: string,
  opt?: { target?: TargetContext | string; noopener?: boolean; noreferrer?: boolean },
) {
  const { target = '__blank', noopener = true, noreferrer = true } = opt || {};
  const feature: string[] = [];

  noopener && feature.push('noopener=yes');
  noreferrer && feature.push('noreferrer=yes');
  window.open(url, target, feature.join(','));
}

/**
 * 处理css单位
 * */
export function cssUnit(value: string | number, unit = 'px') {
  return isNumber(value) || (isString(value) && value.indexOf(unit as string) === -1)
    ? `${value}${unit}`
    : value;
}

/**
 * 判断是否 url
 * */
export function isUrl(url: string) {
  return /^(http|https):\/\//g.test(url);
}

/*
 * 模拟a下载一个文件
 * @params res 结果集
 * @params filename 文件名
 */
export const downloadFile = (res, filename?) => {
  const blob = new Blob([res.data]);
  let fileName = filename || res.headers['content-disposition'].split('filename=').pop();
  fileName = decodeURIComponent(fileName);
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    // IE
    window.navigator.msSaveOrOpenBlob(blob, fileName);
  } else {
    const objectUrl = (window.URL || window.webkitURL).createObjectURL(blob);
    const downFile = document.createElement('a');
    downFile.style.display = 'none';
    downFile.href = objectUrl;
    downFile.download = fileName; // 下载后文件名
    document.body.appendChild(downFile);
    downFile.click();
    document.body.removeChild(downFile); // 下载完成移除元素
    window.URL.revokeObjectURL(objectUrl); // 释放掉blob对象。
  }
};

/**
 * eval() 函数的替代方案
 * */
export function Eval(fn) {
  const Fn = Function;
  return new Fn('return ' + fn)();
}
