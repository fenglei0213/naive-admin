import { h } from 'vue';
import { TableImg } from '@/components/TableImg';
import { BasicColumn } from '@/components/Table';

export const columns: BasicColumn[] = [
  {
    type: 'selection',
    width: 60,
  },
  {
    title: 'id',
    key: 'id',
    width: 100,
    sorter: (row1, row2) => row1.id - row2.id,
  },
  {
    title: '名称',
    key: 'name',
    width: 100,
  },
  {
    title: '头像',
    key: 'avatar',
    width: 200,
    render(row) {
      return h(TableImg, {
        imgList: [row.avatar, row.avatar],
        spaceProps: {
          justify: 'space-between',
        },
        imageProps: {
          width: 50,
          height: 50,
        },
      });
    },
  },
  {
    title: '地址',
    key: 'address',
    auth: ['basic_list'], // 同时根据权限控制是否显示
    ifShow: (_column) => {
      return true; // 根据业务控制是否显示
    },
    width: 150,
  },
  {
    title: '开始日期',
    key: 'beginTime',
    width: 160,
  },
  {
    title: '结束日期',
    key: 'endTime',
    width: 160,
  },
  {
    title: '创建时间',
    key: 'date',
    width: 100,
  },
];
