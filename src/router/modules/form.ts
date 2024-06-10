import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/base';
import { ProfileOutlined } from '@vicons/antd';
import { renderIcon } from '@/utils/index';
import { t } from '@/hooks/web/useI18n';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/form',
    name: 'Form',
    redirect: '/form/basic-form',
    component: Layout,
    meta: {
      title: t('routes.form.form'),
      icon: renderIcon(ProfileOutlined),
      sort: 2,
    },
    children: [
      {
        path: 'basic-form',
        name: 'BasicForm',
        meta: {
          title: t('routes.form.basic'),
          keepAlive: true,
        },
        component: () => import('@/views/form/basicForm/index.vue'),
      },
      {
        path: 'advanced-form',
        name: 'form-advanced-form',
        meta: {
          title: t('routes.form.advanced'),
        },
        component: () => import('@/views/form/advancedForm/advancedForm.vue'),
      },
      {
        path: 'step-form',
        name: 'form-step-form',
        meta: {
          title: t('routes.form.step'),
        },
        component: () => import('@/views/form/stepForm/stepForm.vue'),
      },
      {
        path: 'detail',
        name: 'form-detail',
        meta: {
          title: t('routes.form.detail'),
        },
        component: () => import('@/views/form/detail/index.vue'),
      },
    ],
  },
];

export default routes;
