import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/base';
import { KeyOutlined } from '@vicons/antd';
import { LogInOutline } from '@vicons/ionicons5';
import { renderIcon } from '@/utils';
import { t } from '@/hooks/web/useI18n';

const hsot = location.origin;

const routes: Array<RouteRecordRaw> = [
  {
    path: '/authentication',
    name: 'Authentication',
    component: Layout,
    //redirect: '/authentication/login-v1',
    meta: {
      title: t('routes.authentication.authTemp'),
      icon: renderIcon(KeyOutlined),
      sort: 11,
    },
    children: [
      {
        path: 'login-v1',
        name: `${hsot}/login-v1`,
        meta: {
          title: t('routes.authentication.loginV1'),
          icon: renderIcon(LogInOutline),
        },
        component: () => import('@/views/authentication/v1/login.vue'),
      },
      {
        path: 'login-v2',
        name: `${hsot}/login-v2`,
        meta: {
          title: t('routes.authentication.loginV2'),
          icon: renderIcon(LogInOutline),
        },
        component: () => import('@/views/authentication/v2/login.vue'),
      },
      {
        path: 'login-v2',
        name: `${hsot}/login-v3`,
        meta: {
          title: t('routes.authentication.loginV3'),
          icon: renderIcon(LogInOutline),
        },
        component: () => import('@/views/authentication/v3/login.vue'),
      },
      {
        path: 'login-v4',
        name: `${hsot}/login-v4`,
        meta: {
          title: t('routes.authentication.loginV4'),
          icon: renderIcon(LogInOutline),
        },
        component: () => import('@/views/authentication/v4/login.vue'),
      },
    ],
  },
];

export default routes;
