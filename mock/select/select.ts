import { resultSuccess } from '../_util';

const classifyList = [
  {
    label: '新品',
    value: 'new',
  },
  {
    label: '爆款',
    value: 'hot',
  },
  {
    label: '推荐',
    value: 'rec',
  },
  {
    label: '促销',
    value: 'promotion',
  },
];

export default [
  {
    url: '/api/classifyList',
    timeout: 1000,
    method: 'get',
    response: () => {
      return resultSuccess(classifyList);
    },
  },
];
