import type { RouteLocationRaw, Router } from 'vue-router';

import { PageEnum } from '@/enums/pageEnum';
import { RedirectName } from '@/router/base';

import { useRoute, useRouter } from 'vue-router';
import { isString } from '@/utils/is';
import { unref } from 'vue';
import { isObject } from 'lodash-es';

export type RouteLocationRawEx = Omit<RouteLocationRaw, 'path'> & { path: PageEnum; name?: string };

function handleError(e: Error) {
  console.error(e);
}

/**
 * 页面切换
 */
export function useGo(_router?: Router) {
  let router;
  const route = useRoute();
  if (!_router) {
    router = useRouter();
  }
  const { push, replace } = _router || router;
  function go(opt: PageEnum | RouteLocationRawEx | string = PageEnum.BASE_HOME, isReplace = false) {
    if (!opt) {
      return;
    }
    // 处理重复跳转当前路由
    const { name, path } = unref(route);
    if (
      (isObject(opt) && (name === opt.name || path === opt.path)) ||
      (isString(opt) && (name === opt || path === opt))
    ) {
      return;
    }
    if (isString(opt)) {
      isReplace ? replace(opt).catch(handleError) : push(opt).catch(handleError);
    } else {
      const o = opt as RouteLocationRaw;
      isReplace ? replace(o).catch(handleError) : push(o).catch(handleError);
    }
  }
  return go;
}

/**
 * 重做当前页面
 */
export const useRedo = (_router?: Router) => {
  const { push, currentRoute } = _router || useRouter();
  const { query, params = {}, name, fullPath } = unref(currentRoute.value);
  function redo(): Promise<boolean> {
    return new Promise((resolve) => {
      if (name === RedirectName) {
        resolve(false);
        return;
      }
      if (name && Object.keys(params).length > 0) {
        params['_redirect_type'] = 'name';
        params['path'] = String(name);
      } else {
        params['_redirect_type'] = 'path';
        params['path'] = fullPath;
      }
      push({ name: RedirectName, params, query }).then(() => resolve(true));
    });
  }
  return redo;
};
