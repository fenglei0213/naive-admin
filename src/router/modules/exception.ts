import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/base';
import { ExclamationCircleOutlined } from '@vicons/antd';
import { ImageOutline } from '@vicons/ionicons5';
import { renderIcon } from '@/utils/index';
import { t } from '@/hooks/web/useI18n';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/exception',
    name: 'Exception',
    redirect: '/exception/403',
    component: Layout,
    meta: {
      title: t('routes.exception.abnormalPage'),
      icon: renderIcon(ExclamationCircleOutlined),
      sort: 6,
    },
    children: [
      {
        path: '403',
        name: 'exception-403',
        meta: {
          title: '403',
          icon: renderIcon(ImageOutline),
        },
        component: () => import('@/views/exception/403.vue'),
      },
      {
        path: '404',
        name: 'exception-404',
        meta: {
          title: '404',
          icon: renderIcon(ImageOutline),
        },
        component: () => import('@/views/exception/404.vue'),
      },
      {
        path: '500',
        name: 'exception-500',
        meta: {
          title: '500',
          icon: renderIcon(ImageOutline),
        },
        component: () => import('@/views/exception/500.vue'),
      },
    ],
  },
];

export default routes;
