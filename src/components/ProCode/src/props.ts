import { InputProps, ButtonProps } from 'naive-ui';
export const basicProps = {
  // 倒计时秒数
  seconds: {
    type: Number,
    default: 60,
  },
  value: {
    type: String,
    default: '',
  },
  // 发送验证码文本
  startText: {
    type: String,
    default: '发送验证码',
  },
  endText: {
    type: String,
    default: '重新获取',
  },
  changeText: {
    type: String,
    default: '重新获取',
  },
  isVerify: {
    type: Boolean,
    default: false,
  },
  inputProps: Object as PropType<InputProps>,
  buttonProps: Object as PropType<ButtonProps>,
};
