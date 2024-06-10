import { HTMLAttributes, VNodeChild } from 'vue';
import {
  Sorter,
  RenderFilter,
  RenderFilterIcon,
  RenderSorter,
  RenderSorterIcon,
  RenderFilterMenu,
  FilterOptionValue,
  SortOrder,
  Ellipsis,
  Expandable,
  Filter,
  FilterOption,
  DataTableSelectionOptions,
  TableColumnTitle,
  RenderExpand,
} from 'naive-ui/es/data-table/src/interface';
import { PaginationProps } from 'naive-ui';
import { ComponentType } from '@/components/Form/src/types';

export interface FunColumn<T> {
  //是否禁用
  disabled?: (row: T) => boolean;
  // 渲染函数，渲染这一列的每一行的单元格
  render?: (rowData: T, rowIndex: number) => VNodeChild;
  // 渲染函数，渲染过滤器触发元素
  renderFilter?: RenderFilter;
  // 渲染函数，渲染过滤器图标
  renderFilterIcon?: RenderFilterIcon;
  // 渲染函数，渲染排序触发
  renderSorter?: RenderSorter;
  // 渲染函数，渲染排序图标
  renderSorterIcon?: RenderSorterIcon;
  // 渲染函数，渲染这一列的过滤器菜单
  renderFilterMenu?: RenderFilterMenu;
  // 该列单元格的的 col span
  colSpan?: (rowData: T, rowIndex: number) => number;
  // 该列单元格的 row span
  rowSpan?: (rowData: T, rowIndex: number) => number;
  // 该列单元格的 HTML 属性
  cellProps?: (rowData: T, rowIndex: number) => HTMLAttributes;
  // 行是否可展开，仅在 type 为 'expand' 时生效
  expandable?: Expandable<T>;
  // 展开区域的渲染函数，仅在 type 为 'expand' 的时候生效
  renderExpand?: RenderExpand<T>;
  // 这一列的过滤方法。如果设为 true，表格将只会在这列展示一个排序图标，在异步的时候可能有用。
  filter?: 'default' | boolean | Filter<T>;
  // 这一列的排序方法。如果设为 'default' 表格将会使用一个内置的排序函数；如果设为 true，表格将只会在这列展示一个排序图标，在异步的时候可能有用。其他情况下它工作的方式类似 Array.sort 的对比函数
  sorter?: boolean | Sorter<T> | 'default';
}
export interface BasicColumn extends FunColumn<Recordable> {
  // =========================== data-table 组件基本属性 ===========================
  // 列内的文本排列
  align?: 'left' | 'center' | 'right';
  // 成组列头的子节点
  children?: VNodeChild | VNodeChild[];
  // 列的类名
  className?: string;
  // 非受控状态下默认的过滤器选项值（过滤器单选时生效）
  defaultFilterOptionValues?: FilterOptionValue[] | null;
  // 非受控状态下默认的过滤器选项值（过滤器多选时生效）
  defaultFilterOptionValue?: FilterOptionValue | null;
  // 非受控状态下表格默认的排序方式
  defaultSortOrder?: SortOrder;
  // 文本溢出的设置
  ellipsis?: Ellipsis;
  // 同一列筛选方式为与还是或
  filterMode?: 'or' | 'and';
  // 同一列是否可以筛选多个
  filterMultiple?: boolean;
  // filter 的 options 数据
  filterOptions?: FilterOption[];
  // 受控状态下，当前激活的过滤器选项值数组。如果不做设定，这一列的过滤行为将是非受控的（过滤器多选时生效）
  filterOptionValues?: FilterOptionValue[] | null;
  // 受控状态下，当前激活的过滤器选项值。如果不做设定，这一列的过滤行为将是非受控的（过滤器单选时生效）
  filterOptionValue?: FilterOptionValue | null;
  // 该列是否需要 fixed
  fixed?: 'left' | 'right';
  // 这一列的 key，不可重复。
  key?: string | number;
  // 列宽度
  width?: number | string;
  // 列的最小宽度
  minWidth?: number | string;
  // 是否开启多选，仅在 type 为 'selection' 的时候生效
  multiple?: boolean;
  // 自定义选择项的选项，只对 type='selection' 生效
  options?: DataTableSelectionOptions;
  // 受控状态下表格的排序方式。如果多列都设定了有效值，那么只有第一个会生效
  sortOrder?: SortOrder;
  // 是否在这一列展示树形数据的展开按钮
  tree?: boolean;
  // 列的 title 信息，可以是渲染函数
  title?: TableColumnTitle;
  // 列的类型
  type?: 'selection' | 'expand';
  // =========================== Naive Admin 增强属性 ===========================

  // 单元格渲染组件
  component?: ComponentType;
  // 单元格渲染组件 参数
  componentProps?: Recordable;
  // 是否隐藏
  hidden?: boolean;
  // 插槽
  slots?: string;
}

export interface BasicTableProps {
  dataSource?: Function | any[];
  columns: BasicColumn[];
  pagination?: false | PaginationProps;
  loading?: boolean;
  striped?: boolean;
  rowKey: Function;
}
