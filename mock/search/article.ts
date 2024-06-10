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

const coverList = [
  'https://img.naiveadmin.com/assets/article/1.jpeg',
  'https://img.naiveadmin.com/assets/article/2.jpeg',
  'https://img.naiveadmin.com/assets/article/3.jpeg',
  'https://img.naiveadmin.com/assets/article/4.jpg',
  'https://img.naiveadmin.com/assets/article/5.jpeg',
  'https://img.naiveadmin.com/assets/article/6.jpeg',
  'https://img.naiveadmin.com/assets/article/7.jpeg',
  'https://img.naiveadmin.com/assets/article/8.jpeg',
  'https://img.naiveadmin.com/assets/article/9.jpeg',
  'https://img.naiveadmin.com/assets/article/10.jpeg',
];

const articleList = (pageSize) => {
  const result: any[] = [];
  doCustomTimes(pageSize, () => {
    result.push({
      id: '@integer(10,999999)',
      title: Random.csentence(),
      tags: getRandomArrayElements(
        [
          '有限理性',
          '智商',
          '情绪智力',
          '心理理论',
          '多动症',
          '抑郁症',
          '梦的解析',
          '催眠',
          '投射测验',
          '习惯化范式',
        ],
        2,
        4,
      ),
      summary: Random.cparagraph(),
      avatar: Random.pick(avatarList),
      cover: Random.pick(coverList),
      author: '@cname()',
      collection: Random.natural(10, 999),
      like: Random.natural(10, 999),
      comment: Random.natural(10, 999),
      date: `@date('yyyy-MM-dd')`,
      'no|100000-10000000': 100000,
    });
  });
  return result;
};

export default [
  {
    url: '/api/article/list',
    timeout: 1000,
    method: 'get',
    response: ({ query }) => {
      const { page = 1, pageSize = 1 } = query;
      const list = articleList(Number(pageSize));
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

//从数组中取出指定个数的元素
function getRandomArrayElements(arr, start, end) {
  const count = Math.floor(Math.random() * (end - start) + start);
  const shuffled = arr.slice(0);
  let i = arr.length;
  const min = i - count;
  let temp: any;
  let index: number;
  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(min);
}
