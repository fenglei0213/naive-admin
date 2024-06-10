import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/base';
import {
  DashboardOutlined,
  HomeOutlined,
  DesktopOutlined,
  FundProjectionScreenOutlined,
} from '@vicons/antd';
import { renderIcon } from '@/utils/index';
import { t } from '@/hooks/web/useI18n';

const routeName = 'dashboard';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/dashboard',
    name: routeName,
    redirect: '/dashboard/console',
    component: Layout,
    meta: {
      title: t('routes.dashboard.dashboard'),
      icon: renderIcon(DashboardOutlined),
      permissions: ['dashboard_console', 'dashboard_console', 'dashboard_workplace'],
      sort: 0,
    },
    children: [
      {
        path: 'console',
        name: `${routeName}_console`,
        meta: {
          title: t('routes.dashboard.console'),
          permissions: ['dashboard_console'],
          icon: renderIcon(HomeOutlined),
          affix: true,
        },
        component: () => import('@/views/dashboard/console/console.vue'),
      },
      {
        path: 'monitor',
        name: `${routeName}_monitor`,
        meta: {
          title: t('routes.dashboard.monitor'),
          icon: renderIcon(FundProjectionScreenOutlined),
        },
        component: () => import('@/views/dashboard/monitor/monitor.vue'),
      },
      {
        path: 'workplace',
        name: `${routeName}_workplace`,
        meta: {
          title: t('routes.dashboard.workplace'),
          icon: renderIcon(DesktopOutlined),
        },
        component: () => import('@/views/dashboard/workplace/workplace.vue'),
      },
    ],
  },
];

export default routes;
