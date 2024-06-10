import type { PropType } from 'vue';
import { radioGroupProps } from 'naive-ui';
import type { InOptions } from './types';

export const basicProps = {
  ...radioGroupProps,
  request: {
    type: Function as PropType<(...arg: any[]) => Promise<any>>,
    default: null,
  },
  options: {
    type: Array as PropType<Array<InOptions>>,
    default: () => [],
  },
  isButton: {
    type: Boolean,
    default: false,
  },
};
