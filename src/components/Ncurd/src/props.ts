import { dataTableProps } from 'naive-ui';
import { FormType } from './types';

export const basicProps = {
  ...dataTableProps, // 这里继承原 UI 组件的 props
  componentName: {
    type: String,
    default: '',
  },
  form: {
    type: Object as PropType<FormType>,
    default: () => {},
  },
  requestData: {
    type: Function as PropType<(...arg: any[]) => Promise<any>>,
    default: null,
  },
  dataSource: {
    type: [Object],
    default: () => [],
  },
};
