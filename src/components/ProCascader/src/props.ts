import { cascaderProps } from 'naive-ui';

export const basicProps = {
  ...cascaderProps,
  //隐藏地区
  hideArea: {
    type: Boolean,
    default: false,
  },
  //只显示省份
  onlyProvince: {
    type: Boolean,
    default: false,
  },
  labelField: {
    type: String,
    default: 'name',
  },
  valueField: {
    type: String,
    default: 'id',
  },
  remote: {
    type: Boolean,
    default: true,
  },
  cascade: {
    type: Boolean,
    default: false,
  },
};
