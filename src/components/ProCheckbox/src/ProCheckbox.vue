<script lang="tsx">
  import { defineComponent, onMounted, ref, unref } from 'vue';
  import { NCheckbox, NCheckboxGroup, NSpin } from 'naive-ui';
  import { basicProps } from './props';
  import type { InOptions } from './types';

  export default defineComponent({
    name: 'ProCheckbox',
    props: basicProps,
    emits: ['complete'],
    setup(props, { emit, expose }) {
      const loading = ref(true);
      const list = ref<InOptions[]>([]);

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

      expose({ setOptions });

      onMounted(() => {
        request();
      });

      return () => {
        return (
          <div class="inline-block">
            <NSpin show={loading.value} size="small">
              <NCheckboxGroup {...props}>
                {list.value.map((item) => {
                  return <NCheckbox value={item.value} label={item.label}></NCheckbox>;
                })}
              </NCheckboxGroup>
            </NSpin>
          </div>
        );
      };
    },
  });
</script>
