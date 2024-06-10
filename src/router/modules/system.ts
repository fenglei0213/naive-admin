import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/base';
import { OptionsSharp } from '@vicons/ionicons5';
import { renderIcon } from '@/utils/index';
import { t } from '@/hooks/web/useI18n';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/system',
    name: 'System',
    redirect: '/system/menu',
    component: Layout,
    meta: {
      title: t('routes.system.system'),
      icon: renderIcon(OptionsSharp),
      sort: 1,
    },
    children: [
      {
        path: 'user',
        name: 'system_user',
        meta: {
          title: t('routes.system.user'),
        },
        component: () => import('@/views/system/user/user.vue'),
      },
      {
        path: 'menu',
        name: 'system_menu',
        meta: {
          title: t('routes.system.menu'),
        },
        component: () => import('@/views/system/menu/index.vue'),
      },
      {
        path: 'menu/table',
        name: 'system_menu_table',
        meta: {
          title: t('routes.system.menu2'),
        },
        component: () => import('@/views/system/menu/table.vue'),
      },
      {
        path: 'role',
        name: 'system_role',
        meta: {
          title: t('routes.system.role'),
        },
        component: () => import('@/views/system/role/role.vue'),
      },
      {
        path: 'dictionary',
        name: 'system_dictionary',
        meta: {
          title: t('routes.system.dictionary'),
        },
        component: () => import('@/views/system/dictionary/dictionary.vue'),
      },
    ],
  },
];

export default routes;
