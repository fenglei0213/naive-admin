import type { CSSProperties, PropType } from 'vue';
import type { InOptions } from './types';
import type { InputProps, SelectProps, ButtonProps } from 'naive-ui';

interface InSelectProps extends SelectProps {
  style: CSSProperties;
}

export const basicProps = {
  request: {
    type: Function as PropType<(...arg: any[]) => Promise<any>>,
    default: () => {},
  },
  options: {
    type: Array as PropType<Array<InOptions>>,
    default: () => [],
  },
  buttonText: {
    type: String,
    default: '查询',
  },
  buttonProps: {
    type: Object as PropType<ButtonProps>,
    default: () => ({
      type: 'primary',
    }),
  },
  inputProps: {
    type: Object as PropType<InputProps>,
    default: () => ({
      clearable: true,
    }),
  },
  inputValue: {
    type: String,
    default: '',
  },
  selectProps: {
    type: Object as PropType<InSelectProps>,
    default: () => ({
      clearable: true,
    }),
  },
  selectValue: {
    type: [String, Number, Array<string | number>],
    default: null,
  },
  isReset: {
    type: Boolean,
    default: false,
  },
  isButton: {
    type: Boolean,
    default: true,
  },
};
