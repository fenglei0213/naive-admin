import type { AppRouteRecordRaw } from '@/router/types';

export const RedirectName = 'Redirect';

export const ErrorPage = () => import('@/views/exception/404.vue');

export const Layout = () => import('@/layout/index.vue');

export const ParentLayout = () => import('@/layout/parentLayout.vue');

// 404 on a page
export const ErrorPageRoute: AppRouteRecordRaw = {
  path: '/:path(.*)*',
  name: 'ErrorPageParent',
  component: Layout,
  meta: {
    title: 'ErrorPage',
    hideBreadcrumb: true,
  },
  children: [
    {
      path: '/:path(.*)*',
      name: 'ErrorPage',
      component: ErrorPage,
      meta: {
        title: 'ErrorPage',
        hideBreadcrumb: true,
      },
    },
  ],
};

export const RedirectRoute: AppRouteRecordRaw = {
  path: '/redirect',
  name: `${RedirectName}Parent`,
  component: Layout,
  meta: {
    title: RedirectName,
    hideBreadcrumb: true,
  },
  children: [
    {
      path: '/redirect/:path(.*)',
      name: RedirectName,
      component: () => import('@/views/redirect/index.vue'),
      meta: {
        title: RedirectName,
        hideBreadcrumb: true,
      },
    },
  ],
};
