export const basicProps = {
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
  //默认值
  value: {
    type: Array,
    default: [],
  },
  wrapper: {
    type: String,
    default: '',
  },
  labelField: {
    type: String,
    default: 'name',
  },
  valueField: {
    type: String,
    default: 'id',
  },
};
