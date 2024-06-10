import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/base';
import { TableOutlined } from '@vicons/antd';
import { renderIcon } from '@/utils/index';
import { t } from '@/hooks/web/useI18n';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/list',
    name: 'List',
    redirect: '/list/basic-list',
    component: Layout,
    meta: {
      title: t('routes.list.list'),
      icon: renderIcon(TableOutlined),
      sort: 3,
      permissions: ['basic_list'],
    },
    children: [
      {
        path: 'basic-list/:id?',
        name: 'basic-list',
        meta: {
          title: t('routes.list.basic'),
        },
        component: () => import('@/views/list/basicList/index.vue'),
      },
      {
        path: 'basic-info/:id?',
        name: 'BasicInfo',
        meta: {
          title: t('routes.list.detail'),
          hidden: true,
          activeMenu: 'basic-list',
          keepAlive: true,
        },
        component: () => import('@/views/list/basicList/info.vue'),
      },
    ],
  },
];

export default routes;
