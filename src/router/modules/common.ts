import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/base';
import {
  LayoutOutlined,
  CalendarOutlined,
  CodeOutlined,
  ProfileOutlined,
  InsertRowAboveOutlined,
  TableOutlined,
  ScheduleOutlined,
} from '@vicons/antd';
import { FileTrayOutline, LaptopOutline, LogoBuffer, ReorderFour } from '@vicons/ionicons5';
import { renderIcon } from '@/utils';
import { t } from '@/hooks/web/useI18n';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/common',
    name: 'common',
    component: Layout,
    redirect: '/common/curd',
    meta: {
      title: t('routes.common.commonTemp'),
      icon: renderIcon(LayoutOutlined),
      sort: 10,
    },
    children: [
      {
        path: 'general',
        name: 'layout_general',
        meta: {
          title: t('routes.common.general'),
          icon: renderIcon(ProfileOutlined),
        },
        component: () => import('@/views/layout/general/general.vue'),
      },
      {
        path: 'around',
        name: 'layout_around',
        meta: {
          title: t('routes.common.around'),
          icon: renderIcon(CodeOutlined),
        },
        component: () => import('@/views/layout/around/around.vue'),
      },
      {
        path: 'upand',
        name: 'layout_upand',
        meta: {
          title: t('routes.common.upand'),
          icon: renderIcon(CalendarOutlined),
        },
        component: () => import('@/views/layout/upand/upand.vue'),
      },
      {
        path: 'curd',
        name: 'common_curd',
        meta: {
          title: t('routes.common.curd'),
          icon: renderIcon(InsertRowAboveOutlined),
        },
        component: () => import('@/views/common/curd/curd.vue'),
      },
      {
        path: 'tabtable',
        name: 'common_tabtable',
        meta: {
          title: t('routes.common.tabTable'),
          icon: renderIcon(TableOutlined),
        },
        component: () => import('@/views/common/tabTable/tabTable.vue'),
      },
      {
        path: 'detail',
        name: 'common_detail',
        meta: {
          title: t('routes.common.detail'),
          icon: renderIcon(ScheduleOutlined),
        },
        component: () => import('@/views/common/detail/detail.vue'),
      },
      {
        path: 'popupform',
        name: 'common_popupform',
        meta: {
          title: t('routes.common.popupForm'),
          icon: renderIcon(LaptopOutline),
        },
        component: () => import('@/views/common/popupForm/popupForm.vue'),
      },
      {
        path: 'drawerform',
        name: 'common_drawerform',
        meta: {
          title: t('routes.common.drawerForm'),
          icon: renderIcon(FileTrayOutline),
        },
        component: () => import('@/views/common/drawerForm/drawerForm.vue'),
      },
      {
        path: 'packetform',
        name: 'common_packetform',
        meta: {
          title: t('routes.common.packetForm'),
          icon: renderIcon(LogoBuffer),
        },
        component: () => import('@/views/common/packetForm/packetForm.vue'),
      },
      {
        path: 'dynamicform',
        name: 'common_dynamicform',
        meta: {
          title: t('routes.common.dynamicForm'),
          icon: renderIcon(ReorderFour),
        },
        component: () => import('@/views/common/dynamicForm/dynamicForm.vue'),
      },
    ],
  },
];

export default routes;
