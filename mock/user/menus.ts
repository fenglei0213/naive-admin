import { resultSuccess } from '../_util';

//超级管理员
const adminMenusList = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: 'LAYOUT',
    redirect: '/dashboard/console',
    meta: {
      icon: 'DashboardOutlined',
      title: 'Dashboard',
    },
    children: [
      {
        path: 'console',
        name: 'dashboard_console',
        component: '/dashboard/console/console',
        meta: {
          title: '主控台',
        },
      },
      {
        path: 'monitor',
        name: 'dashboard_monitor',
        component: '/dashboard/monitor/monitor',
        meta: {
          title: '监控页',
        },
      },
      {
        path: 'workplace',
        name: 'dashboard_workplace',
        component: '/dashboard/workplace/workplace',
        meta: {
          hidden: true,
          title: '工作台',
        },
      },
    ],
  },
  {
    path: '/list',
    name: 'List',
    component: 'LAYOUT',
    redirect: '/list/basic-list',
    meta: {
      icon: 'TableOutlined',
      title: '列表页面',
    },
    children: [
      {
        path: 'basic-list',
        name: 'basic-list',
        component: '/list/basicList/index',
        meta: {
          title: '基础列表',
        },
      },
    ],
  },
];

//普通管理员
const ordinaryMenusList = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: 'LAYOUT',
    redirect: '/dashboard/console',
    meta: {
      icon: 'DashboardOutlined',
      title: 'Dashboard',
    },
    children: [
      {
        path: 'console',
        name: 'dashboard_console',
        component: '/dashboard/console/console',
        meta: {
          title: '主控台',
        },
      },
      {
        path: 'monitor',
        name: 'dashboard_monitor',
        component: '/dashboard/monitor/monitor',
        meta: {
          title: '监控页',
        },
      },
      {
        path: 'workplace',
        name: 'dashboard_workplace',
        component: '/dashboard/workplace/workplace',
        meta: {
          hidden: true,
          title: '工作台',
        },
      },
    ],
  },
];

export default [
  {
    url: '/api/menus',
    timeout: 1000,
    method: 'get',
    response: () => {
      //此处随机了，为了模拟不同角色权限
      const randomNum = Math.floor(Math.random() * 2 + 1);
      return randomNum === 1 ? resultSuccess(adminMenusList) : resultSuccess(ordinaryMenusList);
    },
  },
];
