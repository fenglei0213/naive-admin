import { BasicColumn } from '@/components/Table';

export const columns: BasicColumn[] = [
  {
    type: 'selection',
  },
  {
    title: '字典名称',
    key: 'label',
  },
  {
    title: '字典值',
    key: 'value',
  },
  {
    title: '排序',
    key: 'order',
  },
  {
    title: '创建时间',
    key: 'create_date',
  },
];
