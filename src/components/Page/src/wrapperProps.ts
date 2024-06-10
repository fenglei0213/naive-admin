export const basicProps = {
  //pageHeader title
  title: {
    type: String,
    default: '',
  },
  //pageHeader Content 内容
  content: {
    type: String,
    default: '',
  },
  //主体区域样式
  contentStyle: {
    type: Object,
    default: () => {},
  },
  //主体区域 class
  contentClass: {
    type: String,
    default: '',
  },
  //是否显示底部区域
  showFooter: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
};
