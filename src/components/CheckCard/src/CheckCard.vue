<script lang="tsx">
  import { defineComponent, ref, computed, watch } from 'vue';
  import { NList, NListItem, NSpace, NThing, NEl, NAvatar } from 'naive-ui';
  import { basicProps } from './props';
  import { cssUnit } from '@/utils';

  export default defineComponent({
    name: 'CheckList',
    props: basicProps,
    emits: ['change'],
    setup(props, { emit }) {
      const checkedValues = ref<number[] | string[]>([]);

      const getListWidth = computed(() => {
        return cssUnit(props.width) ?? 'auto';
      });

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

      function listItemSlots(item) {
        return {
          prefix: () => <NAvatar size={48} src={item.avatar} />,
        };
      }

      function thingSlots(item) {
        return {
          'header-extra': () => item.headerExtra,
        };
      }

      function isChecked(value) {
        return checkedValues.value?.includes(value as never);
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
        emit('change', checkedValues.value);
      }

      return () => {
        return (
          <NSpace>
            {props.options.map((item) => {
              return (
                <NEl tag="div" class="check-list" style={{ width: getListWidth.value }}>
                  <NList
                    bordered={props.bordered}
                    hoverable={props.hoverable}
                    clickable={item.disabled !== true}
                    class={{
                      'check-list-checked': isChecked(item.value),
                      'check-list-checked-disabled': item.disabled === true,
                    }}
                    onClick={handleChecked.bind(this, item)}
                  >
                    <>
                      <NListItem v-slots={listItemSlots(item)}>
                        <>
                          <NThing
                            title={item.title}
                            description={item.description}
                            v-slots={thingSlots(item)}
                          />
                        </>
                      </NListItem>
                    </>
                  </NList>
                </NEl>
              );
            })}
          </NSpace>
        );
      };
    },
  });
</script>

<style lang="less" scoped>
  .check-list {
    ul {
      :deep(.n-thing-main__description) {
        color: var(--text-color-3);
      }
    }

    &-checked-disabled {
      background-color: var(--divider-color);
      border-color: var(--divider-color);
      cursor: not-allowed !important;
    }
  }

  .check-list-checked {
    border-color: var(--primary-color);
    position: relative;

    &::after {
      position: absolute;
      top: 2px;
      right: 2px;
      width: 0;
      height: 0;
      border: 6px solid var(--primary-color);
      border-bottom: 6px solid transparent;
      border-left: 6px solid transparent;
      border-top-right-radius: 2px;
      content: '';
    }
  }
</style>
