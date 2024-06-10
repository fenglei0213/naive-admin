import { CopyConfig } from './types';

export const basicProps = {
  copyable: {
    type: Boolean,
    default: false,
  },
  copyConfig: {
    type: Object as PropType<CopyConfig>,
    default: () => ({
      showTip: false,
      tooltips: ['复制', '复制成功'],
    }),
  },
};
