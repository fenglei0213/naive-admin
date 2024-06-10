<script lang="tsx">
  import { defineComponent, onMounted, ref, unref, watch } from 'vue';
  import { NRadio, NRadioGroup, NRadioButton, NSpin } from 'naive-ui';
  import { basicProps } from './props';
  import type { InOptions } from './types';

  type ValueType = string | number | boolean;

  export default defineComponent({
    name: 'ProRadio',
    props: basicProps,
    emits: ['complete', 'update:value', 'onUpdate:value'],
    setup(props, { emit, expose }) {
      const loading = ref(true);
      const radioValue = ref<ValueType>();
      const list = ref<InOptions[]>([]);

      watch(
        () => props.value,
        (val: ValueType) => {
          radioValue.value = val;
        },
        { immediate: true },
      );

      function complete() {
        loading.value = false;
        emit('complete', list.value);
      }

      async function request() {
        const { request, options } = props;
        if (!request && !options) {
          loading.value = false;
          return;
        }
        // 兼容静态数据
        if (options && options.length) {
          list.value = options;
          complete();
          return;
        }
        try {
          const res = await request();
          list.value = res || [];
          complete();
        } catch (error) {
          loading.value = false;
          console.error(error);
        }
      }

      function setOptions(values: InOptions[]) {
        if (!values || !unref(values).length) return;
        list.value = unref(values);
      }

      function radioClick(e: MouseEvent, value: number | string) {
        e.preventDefault();
        radioValue.value === value ? (radioValue.value = '') : (radioValue.value = value);
        emit('update:value', radioValue.value);
        emit('onUpdate:value', radioValue.value);
      }

      expose({ setOptions });

      onMounted(() => {
        request();
      });

      return () => {
        return (
          <div class="inline-block">
            <NSpin show={loading.value} size="small">
              <NRadioGroup {...props} v-model:value={radioValue.value}>
                {list.value.map((item) => {
                  return props.isButton ? (
                    <NRadioButton
                      value={item.value}
                      label={item.label}
                      onClick={(event) => radioClick(event, item.value)}
                    ></NRadioButton>
                  ) : (
                    <NRadio
                      value={item.value}
                      label={item.label}
                      onClick={(event) => radioClick(event, item.value)}
                    ></NRadio>
                  );
                })}
              </NRadioGroup>
            </NSpin>
          </div>
        );
      };
    },
  });
</script>
