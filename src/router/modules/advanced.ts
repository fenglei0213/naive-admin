import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/base';
import { ConstructSharp } from '@vicons/ionicons5';
import { renderIcon } from '@/utils/index';
import { t } from '@/hooks/web/useI18n';

/**
 * @param name 路由名称, 必须设置,且不能重名
 * @param meta 路由元信息（路由附带扩展信息）
 * @param redirect 重定向地址, 访问这个路由时,自定进行重定向
 * @param meta.disabled 禁用整个菜单
 * @param meta.title 菜单名称
 * @param meta.icon 菜单图标
 * @param meta.keepAlive 缓存该路由
 * @param meta.sort 排序越小越排前
 * */
const routes: Array<RouteRecordRaw> = [
  {
    path: '/advanced',
    name: 'advanced',
    redirect: '/advanced/table',
    component: Layout,
    meta: {
      title: t('routes.advanced.advancedComp'),
      icon: renderIcon(ConstructSharp),
      alwaysShow: true,
      sort: 13,
    },
    children: [
      {
        path: 'table',
        name: `advanced_table`,
        meta: {
          title: t('routes.advanced.advancedTable'),
          icon: renderIcon(ConstructSharp),
          affix: true,
          activeMenu: 'advanced_table',
        },
        component: () => import('@/views/advanced/table/table.vue'),
      },
    ],
  },
];

export default routes;
