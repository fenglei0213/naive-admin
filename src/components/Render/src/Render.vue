<script lang="tsx">
  import { defineComponent } from 'vue';

  const props = {
    value: { type: Object },
  };
  export default defineComponent({
    name: 'Render',
    props,
    setup(props) {
      return () => {
        const { value } = props;
        return <span>{value}</span>;
      };
    },
  });
</script>
