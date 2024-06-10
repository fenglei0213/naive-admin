import { h } from 'vue';
import { BasicColumn } from '@/components/Table';
import { NTag } from 'naive-ui';

export const columns: BasicColumn[] = [
  {
    title: '菜单名称',
    key: 'label',
  },
  {
    title: '类型',
    key: 'type',
    render(row) {
      return h(
        'span',
        {},
        {
          default: () => (row.type === 1 ? '侧边栏菜单' : ''),
        },
      );
    },
  },
  {
    title: '副标题',
    key: 'subtitle',
  },
  {
    title: '路径',
    key: 'path',
  },
  {
    title: '权限标识',
    key: 'auth',
  },
  {
    title: '打开方式',
    key: 'openType',
    render(row) {
      return h(
        NTag,
        {
          type: 'info',
        },
        {
          default: () => (row.openType === 1 ? '当前窗口' : '新窗口'),
        },
      );
    },
  },
  {
    title: '创建时间',
    key: 'create_date',
  },
];
