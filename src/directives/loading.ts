import { createLoading } from '@/components/Loading';
import type { Directive, App } from 'vue';

const loadingDirective: Directive = {
  mounted(el, binding) {
    const tip = el.getAttribute('loading-tip');
    const background = el.getAttribute('loading-background');
    const fullscreen = !!binding.modifiers.fullscreen;
    const instance = createLoading(
      {
        tip,
        background,
        loading: !!binding.value,
        absolute: !fullscreen,
      },
      fullscreen ? document.body : el,
    );
    el.instance = instance;
  },
  updated(el, binding) {
    const instance = el.instance;
    if (!instance) return;
    instance.setTip(el.getAttribute('loading-tip'));
    if (binding.oldValue !== binding.value) {
      instance.setLoading?.(binding.value && !instance.loading);
    }
  },
  unmounted(el) {
    el?.instance?.close();
  },
};

export function setupLoadingDirective(app: App) {
  app.directive('loading', loadingDirective);
}

export default loadingDirective;
