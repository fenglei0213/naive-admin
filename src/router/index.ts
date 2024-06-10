import { App } from 'vue';
import { createRouter, createWebHistory, RouteRecordName, RouteRecordRaw } from 'vue-router';
import { RedirectRoute } from '@/router/base';
import { PageEnum } from '@/enums/pageEnum';
import { createRouterGuards } from './guard/index';

const modules: any = import.meta.glob('./modules/**/*.ts', { eager: true });

const routeModuleList: RouteRecordRaw[] = [];

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

function sortRoute(a, b) {
  return (a.meta?.sort || 0) - (b.meta?.sort || 0);
}

routeModuleList.sort(sortRoute);

export const RootRoute: RouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root',
  },
};

export const LoginRoute: RouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/login/index.vue'),
  meta: {
    title: '登录',
  },
};

export const LoginV1Route: RouteRecordRaw = {
  path: '/login-v1',
  name: 'LoginV1',
  component: () => import('@/views/authentication/v1/login.vue'), //v1.x 模板
  meta: {
    title: '登录版本1',
  },
};

export const LoginV2Route: RouteRecordRaw = {
  path: '/login-v2',
  name: 'LoginV2',
  component: () => import('@/views/authentication/v2/login.vue'), // 2.x新模板
  meta: {
    title: '登录版本2',
  },
};

export const LoginV3Route: RouteRecordRaw = {
  path: '/login-v3',
  name: 'LoginV3',
  component: () => import('@/views/authentication/v3/login.vue'), // 3.x新模板
  meta: {
    title: '登录版本3',
  },
};

export const LoginV4Route: RouteRecordRaw = {
  path: '/login-v4',
  name: 'LoginV4',
  component: () => import('@/views/authentication/v4/login.vue'), // 4.x新模板
  meta: {
    title: '登录版本4',
  },
};

//需要验证权限
export const asyncRoutes = [...routeModuleList];

//普通路由 无需验证权限
export const constantRouter: any[] = [
  LoginRoute,
  LoginV1Route,
  LoginV2Route,
  LoginV3Route,
  LoginV4Route,
  RootRoute,
  RedirectRoute,
];

export const router = createRouter({
  history: createWebHistory(''),
  routes: constantRouter,
  strict: true,
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      };
    }
  },
});

// 重置路由
export function resetRouter() {
  asyncRoutes.forEach((item) => {
    if (router.hasRoute(item.name as RouteRecordName)) {
      router.removeRoute(item.name as RouteRecordName);
    }
  });
}

export function setupRouter(app: App) {
  app.use(router);
  // 创建路由守卫
  createRouterGuards(router);
}

export default router;
