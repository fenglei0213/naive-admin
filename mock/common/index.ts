import { resultSuccess } from '../_util';

const stateList = [
  {
    label: '规划中',
    value: 1,
  },
  {
    label: '待处理',
    value: 2,
  },
  {
    label: '已完成',
    value: 3,
  },
  {
    label: '已拒绝',
    value: 4,
  },
];

export default [
  {
    url: '/api/state_list',
    timeout: 1000,
    method: 'get',
    response: () => {
      return resultSuccess(stateList);
    },
  },
];
