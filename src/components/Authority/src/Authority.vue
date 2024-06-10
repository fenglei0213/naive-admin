<script lang="ts">
  import type { PropType } from 'vue';
  import { defineComponent } from 'vue';
  import { usePermission } from '@/hooks/web/usePermission';
  import { getSlot } from '@/utils/helper/tsxHelper';

  export default defineComponent({
    name: 'Authority',
    props: {
      value: {
        type: Array as PropType<string[]>,
        default: () => [],
      },
    },
    setup(props, { slots }) {
      const { hasPermission } = usePermission();
      /**
       * Render button
       */
      function renderAuth() {
        const { value } = props;
        if (!value) {
          return getSlot(slots);
        }
        return hasPermission(value) ? getSlot(slots) : null;
      }

      return () => {
        return renderAuth();
      };
    },
  });
</script>
