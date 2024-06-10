import { RouteRecordRaw } from 'vue-router';
import { Layout, ParentLayout } from '@/router/base';
import { MenuOutlined } from '@vicons/antd';
import { ReorderTwo, ReorderThreeSharp, ReorderFour } from '@vicons/ionicons5';

import { renderIcon } from '@/utils/index';
import { t } from '@/hooks/web/useI18n';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/multilevel',
    name: 'multilevel',
    component: Layout,
    redirect: '/multilevel/level_2/level_2_1/level_2_2',
    meta: {
      title: t('routes.multilevel.multilevelMenu'),
      icon: renderIcon(MenuOutlined),
      sort: 12,
    },
    children: [
      {
        path: 'level_2',
        name: 'level2',
        meta: {
          title: t('routes.multilevel.secondMenu'),
          icon: renderIcon(ReorderTwo),
        },
        component: ParentLayout,
        children: [
          {
            path: 'level_2_1',
            name: `Level21`,
            meta: {
              title: t('routes.multilevel.threeMenu'),
              keepAlive: true,
              icon: renderIcon(ReorderThreeSharp),
            },
            component: ParentLayout,
            children: [
              {
                path: 'level_2_2',
                name: `Level22`,
                meta: {
                  title: t('routes.multilevel.levelMenu'),
                  keepAlive: true,
                  icon: renderIcon(ReorderFour),
                },
                component: () => import('@/views/multistage/one.vue'),
              },
            ],
          },
        ],
      },
    ],
  },
];

export default routes;
