<script lang="tsx">
  import { defineComponent, ref } from 'vue';
  import { NModal } from 'naive-ui';

  export default defineComponent({
    name: 'ImagePreview',
    props: {
      url: {
        type: String,
        required: true,
      },
    },
    setup(props, { expose }) {
      const isShow = ref(false);

      function openModal() {
        isShow.value = true;
      }

      expose({ openModal });
      return () => {
        return (
          <NModal v-model:show={isShow.value} bordered={false} style="width: 520px">
            <img src={props.url} class="m-auto" />
          </NModal>
        );
      };
    },
  });
</script>
