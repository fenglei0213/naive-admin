<script lang="tsx">
  import { defineComponent, ref, watch } from 'vue';
  import { NSpace, NButton } from 'naive-ui';
  import { basicProps } from './props';

  export default defineComponent({
    name: 'CheckButton',
    props: basicProps,
    setup(props, { emit }) {
      const checkedValues = ref<number[] | string[]>([]);

      watch(
        () => props.value,
        (values: []) => {
          if (!values) return;
          checkedValues.value = !props.multiple ? [values[values.length - 1]] : values;
        },
        {
          immediate: true,
        },
      );

      function isChecked(value) {
        return checkedValues.value?.includes(value as never);
      }

      function getValues() {
        return props.options.filter((item) => {
          return checkedValues.value?.includes(item.value as never);
        });
      }

      function handleChecked(item) {
        const value = item.value;
        if (item.disabled === true) return;
        if (props.multiple) {
          checkedValues.value?.includes(value as never)
            ? checkedValues.value.splice(checkedValues.value.indexOf(value as never), 1)
            : checkedValues.value?.push(value as never);
        } else {
          checkedValues.value = checkedValues.value?.includes(value as never)
            ? []
            : [value as never];
        }
        emit('change', checkedValues.value, getValues());
      }

      function getIconSlot(item) {
        return {
          icon: item.icon ?? item.icon,
        };
      }

      return () => {
        return (
          <NSpace {...props}>
            {props.options.map((item) => {
              return (
                <NButton
                  strong={true}
                  secondary={true}
                  {...item}
                  type={isChecked(item.value) ? 'primary' : item.type || 'default'}
                  onClick={handleChecked.bind(this, item)}
                  v-slots={getIconSlot(item)}
                >
                  {item.label}
                </NButton>
              );
            })}
          </NSpace>
        );
      };
    },
  });
</script>
