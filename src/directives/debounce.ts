import { DirectiveBinding } from 'vue';

let debounceTimer: NodeJS.Timeout | null;

export const debounce = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const eventType: string = Object.keys(binding.modifiers)[0] || 'click';

    el.addEventListener(eventType, () => {
      const dealy: number = binding.arg ? parseInt(binding.arg) : 300;
      const fn: unknown = binding.value;

      if (isNaN(dealy)) {
        throw Error('v-debounce:arg必须为数字!');
      }

      if (typeof fn !== 'function') {
        throw Error('v-debounce绑定值必须为函数!');
      }

      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }

      debounceTimer = setTimeout(() => {
        fn();
      }, dealy);
    });
  },
};
