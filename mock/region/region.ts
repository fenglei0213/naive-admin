import { resultSuccess } from '../_util';

const regionList = [
  {
    id: 1,
    name: '广东省',
    parentId: null,
    depth: 1,
  },
  {
    id: 2,
    name: '江西省',
    parentId: null,
    depth: 1,
  },
  {
    id: 3,
    name: '浙江省',
    parentId: null,
    depth: 1,
  },
];

const subRegionList = [
  {
    id: 11,
    name: '深圳市',
    parentId: 1,
    depth: 2,
  },
  {
    id: 111,
    name: '宝安区',
    parentId: 11,
    depth: 3,
  },
  {
    id: 112,
    name: '南山区',
    parentId: 11,
    depth: 3,
  },
  {
    id: 22,
    name: '广州市',
    parentId: 1,
    depth: 2,
  },
  {
    id: 221,
    name: '花都区',
    parentId: 22,
    depth: 3,
  },
  {
    id: 222,
    name: '白云区',
    parentId: 22,
    depth: 3,
  },
  {
    id: 33,
    name: '萍乡市',
    parentId: 2,
    depth: 2,
  },
  {
    id: 331,
    name: '上栗县',
    parentId: 33,
    depth: 3,
  },
  {
    id: 332,
    name: '安源区',
    parentId: 33,
    depth: 3,
  },
  {
    id: 44,
    name: '宜春市',
    parentId: 2,
    depth: 2,
  },
  {
    id: 441,
    name: '袁州区',
    parentId: 44,
    depth: 3,
  },
  {
    id: 442,
    name: '上高县',
    parentId: 44,
    depth: 3,
  },
  {
    id: 55,
    name: '杭州市',
    parentId: 3,
    depth: 2,
  },
  {
    id: 551,
    name: '上城区',
    parentId: 55,
    depth: 3,
  },
  {
    id: 552,
    name: '下城区',
    parentId: 55,
    depth: 3,
  },
  {
    id: 66,
    name: '温州市',
    parentId: 3,
    depth: 2,
  },
  {
    id: 661,
    name: '龙湾区',
    parentId: 66,
    depth: 3,
  },
  {
    id: 662,
    name: '平阳县',
    parentId: 66,
    depth: 3,
  },
];

export default [
  {
    url: '/api/area/getParent',
    timeout: 1000,
    method: 'get',
    response: () => {
      return resultSuccess(regionList);
    },
  },
  {
    url: '/api/area/findByParentId',
    timeout: 1000,
    method: 'get',
    response: ({ query }) => {
      const { parentId } = query;
      return resultSuccess(subRegionList.filter((item) => item.parentId === parseInt(parentId)));
    },
  },
];
