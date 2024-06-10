import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/base';
import { CheckCircleOutlined } from '@vicons/antd';
import { renderIcon } from '@/utils/index';
import { t } from '@/hooks/web/useI18n';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/result',
    name: 'Result',
    redirect: '/result/success',
    component: Layout,
    meta: {
      title: t('routes.result.result'),
      icon: renderIcon(CheckCircleOutlined),
      sort: 5,
    },
    children: [
      {
        path: 'success',
        name: 'result-success',
        meta: {
          title: t('routes.result.success'),
        },
        component: () => import('@/views/result/success.vue'),
      },
      {
        path: 'fail',
        name: 'result-fail',
        meta: {
          title: t('routes.result.fail'),
        },
        component: () => import('@/views/result/fail.vue'),
      },
      {
        path: 'info',
        name: 'result-info',
        meta: {
          title: t('routes.result.info'),
        },
        component: () => import('@/views/result/info.vue'),
      },
    ],
  },
];

export default routes;
