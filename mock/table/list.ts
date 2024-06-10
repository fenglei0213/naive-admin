import { Random } from 'mockjs';
import { resultSuccess, doCustomTimes } from '../_util';

const tableList = (pageSize) => {
  const result: any[] = [];
  doCustomTimes(pageSize, () => {
    result.push({
      id: '@integer(10,999999)',
      'no|100000-10000000': 100000,
      name: '@cname()',
      avatar: Random.image('400x400', Random.color(), Random.color(), Random.first()),
      address: '@city()',
      beginTime: '@datetime',
      endTime: '@datetime',
      'status|1': [true, false],
      date: `@date('yyyy-MM-dd')`,
      time: `@time('HH:mm')`,
    });
  });
  return result;
};

export default [
  //表格数据列表
  {
    url: '/api/table/list',
    timeout: 1000,
    method: 'get',
    response: ({ query }) => {
      const { page = 1, pageSize = 10, name } = query;
      const list = tableList(Number(pageSize));
      //并非真实，只是为了模拟搜索结果
      const count = name ? 30 : 60;
      return resultSuccess({
        page: Number(page),
        pageSize: Number(pageSize),
        pageCount: count,
        itemCount: count * Number(pageSize),
        list,
      });
    },
  },
];
