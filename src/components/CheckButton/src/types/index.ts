import { ButtonProps } from 'naive-ui';
import { VNodeChild, RendererElement, RendererNode } from 'vue';

export interface OptionsConfig extends ButtonProps {
  label: string | VNodeChild;
  value: string | number;
  icon?: RendererNode | RendererElement;
}
