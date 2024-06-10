import { dataTableProps } from 'naive-ui';
import type { DataTableColumns } from 'naive-ui';
import { BasicColumn } from './types/table';

export const basicProps = {
  ...dataTableProps, // 这里继承原 UI 组件的 props
  addTemplate: {
    type: Object,
    required: true,
  },
  dataSource: {
    type: [Object],
    default: () => [],
  },
  columns: {
    type: [Array] as PropType<DataTableColumns<BasicColumn>>,
    default: () => [],
    required: true,
  },
  isPopconfirm: {
    type: Boolean,
    default: true,
  },
  popconfirmProps: {
    type: Object,
    default: () => {},
  },
};
