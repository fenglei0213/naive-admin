import { ButtonProps } from 'naive-ui';
import { PermissionsEnum } from '@/enums/permissionsEnum';

export interface ActionItem extends ButtonProps {
  onClick?: Fn;
  label?: string;
  color?: string;
  icon?: string;
  popConfirm?: PopConfirm;
  disabled?: boolean;
  divider?: boolean;
  // 权限编码控制是否显示
  auth?: PermissionsEnum | PermissionsEnum[] | string | string[];
  // 业务控制是否显示
  ifShow?: boolean | ((action: ActionItem) => boolean);
}

export interface PopConfirm {
  title: string;
  okText?: string;
  cancelText?: string;
  confirm: Fn;
  cancel?: Fn;
  icon?: string;
}
