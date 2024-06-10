import { FormActionType } from '@/components/Form';
import { modalProps } from 'naive-ui';

export const basicProps = {
  ...modalProps,
  subBtuText: {
    type: String,
    default: '确认',
  },
  cancelText: {
    type: String,
    default: '取消',
  },
  showIcon: {
    type: Boolean,
    default: false,
  },
  width: {
    type: Number,
    default: 550,
  },
  title: {
    type: String,
    default: '',
  },
  maskClosable: {
    type: Boolean,
    default: false,
  },
  preset: {
    type: String,
    default: 'dialog',
  },
  isDraggable: {
    type: Boolean,
    default: true,
  },
  // 只支持直接绑定在 basicModal 组件上
  showAction: {
    type: Boolean,
    default: true,
  },
  // ===================== 扩展参数 =====================
  form: {
    type: Object as PropType<FormActionType>,
    required: true,
  },
  // 是否隐藏 Form 组件
  isHideForm: {
    type: Boolean,
    default: false,
  },
  // 是否显示头部自定义内容（Form上面区域）
  isShowHeader: {
    type: Boolean,
    default: false,
  },
  // 是否显示底部自定义内容（Form下面区域）
  isShowFooter: {
    type: Boolean,
    default: false,
  },
};
