import { RendererElement } from 'vue';

export interface ColumnConfig {
  title: string;
  type?: 'radio' | 'checkbox';
  key: string;
  width?: number | string;
  align?: 'left' | 'right' | 'center';
  render?: RendererElement;
}

export interface DataConfig {
  title: string;
}
