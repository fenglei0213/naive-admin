import { Random } from 'mockjs';
import { resultSuccess, doCustomTimes } from '../_util';

const avatarList = [
  'https://img.naiveadmin.com/assets/avatar/avatar-1.jpg',
  'https://img.naiveadmin.com/assets/avatar/avatar-2.jpg',
  'https://img.naiveadmin.com/assets/avatar/avatar-3.jpg',
  'https://img.naiveadmin.com/assets/avatar/avatar-4.jpg',
  'https://img.naiveadmin.com/assets/avatar/avatar-5.jpg',
  'https://img.naiveadmin.com/assets/avatar/avatar-6.jpg',
];

const makeList = (pageSize) => {
  const result: any[] = [];
  doCustomTimes(pageSize, () => {
    result.push({
      id: '@integer(10,999999)',
      doctor: '@cname()',
      avatar: Random.pick(avatarList),
      subject: Random.pick([
        '中医内科',
        '中医外科',
        '中医儿科',
        '中医妇科',
        '中医针灸科',
        '中医五官科',
        '中医骨伤科',
      ]),
      date: Random.datetime(),
    });
  });
  return result;
};

export default [
  {
    url: '/api/make/list',
    timeout: 1000,
    method: 'get',
    response: ({ query }) => {
      const { page = 1, pageSize = 1 } = query;
      const list = makeList(Number(pageSize));
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
