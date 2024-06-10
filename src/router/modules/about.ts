import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/base';
import { ProjectOutlined } from '@vicons/antd';
import { renderIcon } from '@/utils/index';
import { t } from '@/hooks/web/useI18n';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/about',
    name: 'about',
    component: Layout,
    meta: {
      sort: 14,
      isRoot: true,
      activeMenu: 'about_index',
      alwaysShow: true,
      icon: renderIcon(ProjectOutlined),
    },
    children: [
      {
        path: 'index',
        name: `about_index`,
        meta: {
          title: t('routes.common.project'),
          activeMenu: 'about_index',
        },
        component: () => import('@/views/about/index.vue'),
      },
    ],
  },
];

export default routes;
