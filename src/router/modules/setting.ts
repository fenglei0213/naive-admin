import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/base';
import { SettingOutlined } from '@vicons/antd';
import { renderIcon } from '@/utils/index';
import { t } from '@/hooks/web/useI18n';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/setting',
    name: 'Setting',
    redirect: '/setting/account',
    component: Layout,
    meta: {
      title: t('routes.setting.setting'),
      icon: renderIcon(SettingOutlined),
      sort: 7,
    },
    children: [
      {
        path: 'account',
        name: 'setting-account',
        meta: {
          title: t('routes.setting.account'),
        },
        component: () => import('@/views/setting/account/account.vue'),
      },
      {
        path: 'system',
        name: 'setting-system',
        meta: {
          title: t('routes.setting.system'),
        },
        component: () => import('@/views/setting/system/system.vue'),
      },
    ],
  },
];

export default routes;
