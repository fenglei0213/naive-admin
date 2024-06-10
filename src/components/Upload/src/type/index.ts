import type { UploadProps } from 'naive-ui';
export interface BasicProps extends UploadProps {
  accept: string;
  helpText: string;
  maxSize: number;
  maxNumber: number;
  value?: string[];
  width: number;
  height: number;
}
