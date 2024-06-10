import Mock from 'mockjs';
import { resultSuccess, doCustomTimes } from '../_util';

const Random = Mock.Random;

const token = Random.string('upper', 32, 32);

//超级管理员
const adminPermissions = [
  {
    label: '主控台',
    value: 'dashboard_console',
  },
  {
    label: '监控页',
    value: 'dashboard_monitor',
  },
  {
    label: '工作台',
    value: 'dashboard_workplace',
  },
  {
    label: '基础列表',
    value: 'basic_list',
  },
];

//普通管理员
const ordinaryPermissions = [
  {
    label: '主控台',
    value: 'dashboard_console',
  },
  {
    label: '监控页',
    value: 'dashboard_monitor',
  },
  {
    label: '工作台',
    value: 'dashboard_workplace',
  },
];

const adminInfo = {
  userId: '1',
  username: 'admin',
  realName: 'Admin',
  avatar: Random.image(),
  desc: 'manager',
  password: Random.string('upper', 4, 16),
  token,
  role_type: 1, // 1 超级管理员 2 普通管理员
  permissions: [], // 权限集合
};

const userList = (pageSize) => {
  const result: any[] = [];
  doCustomTimes(pageSize, () => {
    result.push({
      id: '@integer(10,9999)',
      username: '@cname()',
      avatar: Random.image('400x400', Random.color(), Random.color(), Random.first()),
      account: 'M086611',
      mobile: `188@integer(1000,9999)9999`,
      email: '735@integer(1000,9999)02@qq.com',
      'gender|1': [1, 2],
      'status|1': ['normal', 'disable'],
      'role|1': ['普通用户', '推广管理员', '发货管理员', '财务管理员'],
      create_date: `@date('yyyy-MM-dd hh:mm:ss')`,
    });
  });
  return result;
};

export default [
  {
    url: '/api/login',
    timeout: 1000,
    method: 'post',
    response: () => {
      return resultSuccess({ token });
    },
  },
  {
    url: '/api/admin_info',
    timeout: 1000,
    method: 'get',
    response: () => {
      // const token = getRequestToken(request);
      // if (!token) return resultError('Invalid token');
      //此处随机了，为了模拟不同角色权限
      //const randomNum = Math.floor(Math.random() * 2 + 1);
      const randomNum = 1;
      adminInfo.permissions = (randomNum === 1 ? adminPermissions : ordinaryPermissions) as never[];
      adminInfo.role_type = randomNum;
      return resultSuccess(adminInfo);
    },
  },
  {
    url: '/api/user_list',
    timeout: 1000,
    method: 'get',
    response: ({ query }) => {
      const { page = 1, pageSize = 10 } = query;
      const list = userList(Number(pageSize));
      return resultSuccess({
        page: Number(page),
        pageSize: Number(pageSize),
        pageCount: 60,
        itemCount: 60 * Number(pageSize),
        list,
      });
    },
  },
];
