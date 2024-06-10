<script lang="tsx">
  import { defineComponent } from 'vue';
  import { NPopconfirm } from 'naive-ui';

  export default defineComponent({
    name: 'DeleteIncon',
    emits: [],
    setup(_, { slots }) {
      return () => {
        return <NPopconfirm v-slots={slots}></NPopconfirm>;
      };
    },
  });
</script>
