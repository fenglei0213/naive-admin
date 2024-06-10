import { RouteRecordRaw } from 'vue-router';
import { Layout, ParentLayout } from '@/router/base';
import { ControlOutlined } from '@vicons/antd';
import { renderIcon } from '@/utils';
import { t } from '@/hooks/web/useI18n';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/feature',
    name: 'Feature',
    component: Layout,
    redirect: '/feature/authority',
    meta: {
      title: t('routes.feature.feature'),
      icon: renderIcon(ControlOutlined),
      sort: 8,
    },
    children: [
      {
        path: 'authority',
        name: 'Authority',
        component: () => import('@/views/feature/authority/authority.vue'),
        meta: {
          title: t('routes.feature.authority'),
        },
      },
      {
        path: 'download',
        name: 'Download',
        component: () => import('@/views/feature/download/download.vue'),
        meta: {
          title: t('routes.feature.download'),
        },
      },
      {
        path: 'context-menus',
        name: 'ContextMenus',
        component: () => import('@/views/feature/context-menus/context-menus.vue'),
        meta: {
          title: t('routes.feature.contextMenu'),
        },
      },
      {
        path: 'copy',
        name: 'copy',
        component: () => import('@/views/feature/copy/copy.vue'),
        meta: {
          title: t('routes.feature.copy'),
        },
      },
      {
        path: 'print',
        name: 'print',
        component: () => import('@/views/feature/print/print.vue'),
        meta: {
          title: t('routes.feature.print'),
        },
      },
      {
        path: 'scrollbar',
        name: 'scrollbar',
        component: () => import('@/views/feature/scrollbar/scrollbar.vue'),
        meta: {
          title: t('routes.feature.scrollbar'),
        },
      },
      {
        path: 'excel',
        name: 'Excel',
        meta: {
          title: t('routes.feature.excel'),
        },
        component: ParentLayout,
        children: [
          {
            path: 'choiceExport',
            name: 'choiceExport',
            component: () => import('@/views/feature/excel/choiceExport.vue'),
            meta: {
              title: t('routes.feature.format'),
            },
          },
          {
            path: 'jsonExport',
            name: 'jsonExport',
            component: () => import('@/views/feature/excel/jsonExport.vue'),
            meta: {
              title: t('routes.feature.json'),
            },
          },
        ],
      },
      {
        path: 'tagsAction',
        name: 'TagsAction',
        meta: {
          title: t('routes.feature.tagsAction'),
        },
        component: () => import('@/views/feature/tags/tagsAction.vue'),
      },
    ],
  },
];

export default routes;
