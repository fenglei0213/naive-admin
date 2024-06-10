<script lang="tsx">
  import { defineComponent } from 'vue';
  import { NDropdown, NIcon } from 'naive-ui';
  import { EllipsisOutlined } from '@vicons/antd';
  import { useMessage } from 'naive-ui';
  export default defineComponent({
    name: 'HeaderExtra',
    props: {
      options: {
        type: Array,
        defalut: [],
      },
    },
    setup(props, { emit }) {
      const message = useMessage();

      function handelSelect(value) {
        message.success(`您选择的是 ${value}`);
        emit('change');
      }
      return () => {
        return (
          <NDropdown
            trigger="hover"
            placement="top-start"
            options={props.options as any[]}
            onSelect={handelSelect}
          >
            <NIcon size={28}>
              <EllipsisOutlined />
            </NIcon>
          </NDropdown>
        );
      };
    },
  });
</script>
