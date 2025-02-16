import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/base';
import { DesktopOutline } from '@vicons/ionicons5';
import { renderIcon } from '@/utils/index';
import { t } from '@/hooks/web/useI18n';

const IFrame = () => import('@/views/iframe/index.vue');

const routes: Array<RouteRecordRaw> = [
  {
    path: '/frame',
    name: 'Frame',
    redirect: '/frame/docs',
    component: Layout,
    meta: {
      title: t('routes.frame.frame'),
      sort: 9,
      icon: renderIcon(DesktopOutline),
    },
    children: [
      {
        path: 'docs',
        name: 'frame-docs',
        meta: {
          title: t('routes.frame.docs'),
          frameSrc: 'https://www.naiveadmin.com',
        },
        component: IFrame,
      },
      {
        path: 'naive',
        name: 'frame-naive',
        meta: {
          title: t('routes.frame.naiveui'),
          frameSrc: 'https://www.naiveui.com',
        },
        component: IFrame,
      },
    ],
  },
];

export default routes;
