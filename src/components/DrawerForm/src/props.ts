import { FormActionType } from '@/components/Form';
import { drawerProps, DrawerContentProps, ButtonProps } from 'naive-ui';
// import { DrawerContentProps } from './type';

export const basicProps = {
  ...drawerProps,
  // ===================== 扩展参数 =====================
  // 抽屉内容配置
  drawerContent: {
    type: Object as PropType<DrawerContentProps>,
  },
  // 确认按钮的属性
  positiveButtonProps: {
    type: Object as PropType<ButtonProps>,
  },
  // 取消按钮的属性
  negativeButtonProps: {
    type: Object as PropType<ButtonProps>,
  },
  // 确认按钮的文字
  positiveText: {
    type: String,
    default: '确认',
  },
  // 取消按钮的文字
  negativeText: {
    type: String,
    default: '取消',
  },
  // 表单
  form: {
    type: Object as PropType<FormActionType>,
    required: true,
  },
  // 显示操作区域
  showAction: {
    type: Boolean,
    default: true,
  },
  // 是否显示 Form 组件
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
