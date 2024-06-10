import type { PropType } from 'vue';
import { propTypes } from '@/utils/propTypes';
import type { BasicColumn, TableSetting } from './types/table';
import { dataTableProps } from 'naive-ui';
export const basicProps = {
  ...dataTableProps, // 这里继承原 UI 组件的 props
  title: {
    type: String,
    default: null,
  },
  titleTooltip: {
    type: String,
    default: null,
  },
  size: {
    type: String,
    default: 'medium',
  },
  dataSource: {
    type: [Object],
    default: () => [],
  },
  columns: {
    type: [Array] as PropType<BasicColumn[]>,
    default: () => [],
    required: true,
  },
  request: {
    type: Function as PropType<(...arg: any[]) => Promise<any>>,
    default: null,
  },
  rowKey: {
    type: [String, Function] as PropType<string | ((record) => string)>,
    default: undefined,
  },
  rowClassName: {
    type: [String, Function] as PropType<string | ((record) => string)>,
    default: undefined,
  },
  pagination: {
    type: [Object, Boolean],
    default: () => {},
  },
  //废弃
  showPagination: {
    type: [String, Boolean],
    default: 'auto',
  },
  actionColumn: {
    type: Object as PropType<BasicColumn>,
    default: null,
  },
  showTableSetting: {
    type: Boolean,
    default: true,
  },
  tableSetting: {
    type: Object as PropType<TableSetting>,
    default: () => ({
      redo: true,
      size: true,
      setting: true,
      fullscreen: true,
      striped: true,
      //AdvancedTable 组件独有
      query: false,
    }),
  },
  striped: {
    type: Boolean,
    default: false,
  },
  checkedRowAlert: {
    type: Boolean,
    default: false,
  },
  canResize: propTypes.bool.def(true),
  resizeHeightOffset: propTypes.number.def(0),
  autoScrollX: {
    type: Boolean,
    default: false,
  },
  isKeepRowKeys: {
    type: Boolean,
    default: false,
  },
};
