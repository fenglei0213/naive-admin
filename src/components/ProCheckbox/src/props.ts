import type { PropType } from 'vue';
import { checkboxGroupProps } from 'naive-ui';
import type { InOptions } from './types';

export const basicProps = {
  ...checkboxGroupProps,
  request: {
    type: Function as PropType<(...arg: any[]) => Promise<any>>,
    default: null,
  },
  options: {
    type: Array as PropType<Array<InOptions>>,
    default: () => [],
  },
};
