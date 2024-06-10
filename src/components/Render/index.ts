import { h } from 'vue';
import { isFunction } from '@/utils/is';
import { useI18n } from '@/hooks/web/useI18n';

export function getRender(value): any {
  const { t } = useI18n();
  return isFunction(value) ? value() : h('span', {}, { default: () => t(value) });
}

export { default as Render } from './src/Render.vue';
