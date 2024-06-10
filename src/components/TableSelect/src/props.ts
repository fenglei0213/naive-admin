import { BasicTableProps } from '@/components/Table/index';
import { FormProps } from '@/components/Form/index';
import { selectProps } from 'naive-ui';

export const TableSelectProps = {
  ...selectProps,
  value: {
    type: [Array, String, Number] as PropType<string[] | number[] | string | number>,
    default: [],
  },
  width: {
    type: String,
    default: '215px',
  },
  contentWidth: {
    type: String,
    default: '600px',
  },
  tableRowType: {
    type: String,
    default: 'radio',
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  tableProps: {
    type: Object as PropType<BasicTableProps>,
    default: () => ({}),
  },
  formProps: {
    type: Object as PropType<FormProps>,
    default: () => ({}),
  },
  placeholder: {
    type: String,
    default: '请选择内容',
  },
  labelField: {
    type: String,
    default: 'lable',
  },
  valueField: {
    type: String,
    default: 'value',
  },
};
