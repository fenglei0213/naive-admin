import { OptionsConfig } from './types';

export const basicProps = {
  value: {
    type: Array as PropType<Number[] | String[]>,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Array as PropType<OptionsConfig[]>,
    default: () => [],
  },
};
