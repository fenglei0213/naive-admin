import { h } from 'vue';
import { NAvatar, NTag } from 'naive-ui';
import { BasicColumn } from '@/components/Table';

export const columns: BasicColumn[] = [
  {
    type: 'expand',
    expandable: (rowData) => rowData.name !== 'Jim Green',
    renderExpand: (rowData) => {
      return `${rowData.name} is a good guy.`;
    },
  },
  {
    title: 'id',
    key: 'id',
    width: 100,
  },
  {
    title: '编码',
    key: 'no',
    width: 100,
  },
  {
    title: '名称',
    key: 'name',
    width: 100,
    search: true,
    searchProps: {
      placeholder: '请输入名称',
      style: { width: '150px' },
    },
  },
  {
    title: '头像',
    key: 'avatar',
    width: 100,
    render(row) {
      return h(NAvatar, {
        size: 48,
        src: row.avatar,
      });
    },
  },
  {
    title: '地址',
    key: 'address',
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
    title: '状态',
    key: 'status',
    width: 100,
    search: true,
    searchType: 'select',
    searchProps: {
      placeholder: '请选择状态',
      options: [
        {
          label: '启用',
          value: 1,
        },
        {
          label: '禁用',
          value: 0,
        },
      ],
      style: { width: '150px' },
    },
    render(row) {
      return h(
        NTag,
        {
          type: row.status ? 'success' : 'error',
        },
        {
          default: () => (row.status ? '启用' : '禁用'),
        },
      );
    },
  },
  {
    title: '创建时间',
    key: 'date',
    width: 160,
    search: true,
    searchType: 'date',
    searchProps: {
      placeholder: '请选择时间',
    },
  },
  {
    title: '停留时间',
    key: 'time',
    width: 80,
  },
];
