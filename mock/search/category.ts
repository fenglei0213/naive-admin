import { Random } from 'mockjs';
import { resultSuccess, doCustomTimes } from '../_util';

const categoryList = (pageSize) => {
  const result: any[] = [];
  doCustomTimes(pageSize, () => {
    result.push({
      id: '@integer(10,999999)',
      'no|100000-10000000': 100000,
      name: `分类${Random.cword('零一二三四五六七八九十')}`,
    });
  });
  return result;
};

export default [
  //分类列表
  {
    url: '/api/category/list',
    timeout: 1000,
    method: 'get',
    response: ({ query }) => {
      const { page = 1, pageSize = 20 } = query;
      const list = categoryList(Number(pageSize));
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
