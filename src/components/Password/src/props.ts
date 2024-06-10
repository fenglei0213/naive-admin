export const basicProps = {
  //密码框内容
  value: {
    type: String,
    default: '',
  },
  //是否必填
  required: {
    type: Boolean,
    default: true,
  },
  //是否为复杂密码
  // 数字、字母和字符两种或以上组合
  complexity: {
    type: Boolean,
    default: true,
  },
  complexityTip: {
    type: String,
    default: '需包含字母、数字及特殊字符两种或以上组合',
  },
  //密码最短长度要求
  minLength: {
    type: Number,
    default: 6,
  },
  //密码最大长度要求
  maxLength: {
    type: Number,
    default: 32,
  },
  //密码等级提示语
  // 自定义时 1 - 4 级需要对应
  level: {
    type: Object,
    default: {
      1: '弱不禁风',
      2: '平淡无奇',
      3: '出神入化',
      4: '登峰造极',
    },
  },
  //验证规格
  rules: {
    type: Object,
    default: () => {},
  },
  //是否显示 [ 再次确认密码 ] 输入框
  repeat: {
    type: Boolean,
    default: false,
  },
  //尺寸
  size: {
    type: String,
    default: 'medium',
  },
  //block属性将使按钮适合其父宽度
  block: {
    type: Boolean,
    default: false,
  },
};
