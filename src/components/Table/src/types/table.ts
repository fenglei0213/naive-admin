import { ComponentType } from './componentType';
import { PaginationProps } from 'naive-ui';
import type { TableBaseColumn } from 'naive-ui/lib/data-table/src/interface';

export interface BasicColumn<T = Record<string, unknown>> extends TableBaseColumn<T> {
  type?: any;
  // =========================== Naive Admin 增强属性 ===========================
  // 编辑表格
  edit?: boolean;
  editRow?: boolean;
  editable?: boolean;
  editComponent?: ComponentType;
  editComponentProps?: Recordable;
  editRule?: boolean | ((text: string, record: Recordable) => Promise<string>);
  editValueMap?: (value: any) => string;
  onEditRow?: () => void;
  // 权限编码控制是否显示
  auth?: string[];
  // 业务控制是否显示
  ifShow?: boolean | ((column: BasicColumn<T>[]) => boolean);
  editCellRender?: Recordable;
  // 控制是否支持拖拽，默认支持
  draggable?: boolean;
  // 帮助提示
  helpMessage?: string;
  // 帮助提示 参数，透传到 Tooltip 组件上
  helpMessageProps?: object | undefined;
  // 展示搜索字段 需要和后端配合数据格式
  search?: boolean;
  // 搜索类型 默认 text
  searchType?: 'text' | 'number' | 'date' | 'switch' | 'select';
  searchProps?: Recordable; // 参数，透传到 搜索类型对应的组件
  searchVal?: any; // 搜索值
}

export interface TableActionType<T> {
  reload: (opt) => Promise<void>;
  emit?: any;
  getColumns: (opt?) => BasicColumn<T>[];
  setColumns: (columns: BasicColumn<T>[] | string[]) => void;
  redoHeight: () => void;
}

export interface TableSetting {
  width?: number;
  redo?: boolean;
  size?: boolean;
  setting?: boolean;
  fullscreen?: boolean;
  striped?: boolean;
  query?: boolean;
  export?: boolean;
}

export interface BasicTableProps {
  title?: string;
  dataSource?: Function | any[];
  columns: BasicColumn[];
  pagination?: PaginationProps | boolean;
  showPagination?: boolean;
  actionColumn?: BasicColumn;
  canResize?: boolean;
  resizeHeightOffset?: number;
  loading?: boolean;
  showTableSetting?: boolean;
  tableSetting?: TableSetting;
  titleTooltip?: string;
  striped?: boolean;
  request?: Function;
  isKeepRowKeys?: boolean;
  autoScrollX?: boolean;
  rowKey?: Function;
}
