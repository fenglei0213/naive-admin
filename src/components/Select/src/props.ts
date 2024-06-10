import type { PropType } from 'vue';
import { selectProps } from 'naive-ui';

export const basicProps = {
  ...selectProps,
  request: {
    type: Function as PropType<(...arg: any[]) => Promise<any>>,
    default: null,
  },
  //是否缓存数据
  cache: {
    type: Boolean,
    default: false,
  },
  //开启缓存，必传缓存key，否则不生效
  cacheKey: {
    type: String,
    default: '',
  },
  width: {
    type: Number as PropType<number>,
    default: 150,
  },
  //block属性将使按钮适合其父宽度
  block: {
    type: Boolean,
    default: false,
  },
};
