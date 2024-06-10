<script lang="tsx">
  import { defineComponent, onMounted, ref, unref, watch } from 'vue';
  import { NInputGroup, NSelect, NInput, NButton, NSpin, NIcon } from 'naive-ui';
  import { basicProps } from './props';
  import type { InOptions } from './types';
  import { SearchOutlined } from '@vicons/antd';

  export default defineComponent({
    name: 'ProSearchGroup',
    props: basicProps,
    emits: ['complete', 'submit', 'update:selectValue', 'update:inputValue'],
    setup(props, { emit, expose }) {
      const loading = ref(true);
      const selectKey = ref<Array<string | number> | string | number | null>();
      const inputValue = ref<string | null>();
      const list = ref<InOptions[]>([]);

      watch(
        () => props.selectValue,
        (value) => {
          selectKey.value = value;
        },
        {
          immediate: true,
          deep: true,
        },
      );

      watch(
        () => props.inputValue,
        (value) => {
          inputValue.value = value;
        },
        {
          immediate: true,
        },
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

      function setValue(value: string | null) {
        inputValue.value = value;
      }

      function getButtonSlot() {
        return {
          icon: () => (
            <NIcon>
              <SearchOutlined />
            </NIcon>
          ),
        };
      }

      function getValues() {
        return {
          searchValue: inputValue.value,
          searchKey: selectKey.value,
        };
      }

      function handleSubmit() {
        const res = getValues();
        emit('update:selectValue', res.searchKey);
        emit('update:inputValue', res.searchValue);
        emit('submit', res, false);
      }

      function handleReset() {
        inputValue.value = '';
        selectKey.value = null;
        emit('update:selectValue', selectKey.value);
        emit('update:inputValue', inputValue.value);
        emit('submit', getValues(), true);
      }

      expose({ setOptions, getValues, setValue });

      onMounted(() => {
        request();
      });

      return () => {
        return (
          <div class="inline-block">
            <NSpin show={loading.value} size="small">
              <NInputGroup {...props}>
                <NSelect
                  v-model:value={selectKey.value}
                  options={list.value}
                  {...props.selectProps}
                  clearable
                ></NSelect>
                <NInput v-model:value={inputValue.value} {...props.inputProps} clearable></NInput>
                {props.isButton ? (
                  <NButton v-slots={getButtonSlot()} {...props.buttonProps} onclick={handleSubmit}>
                    {props.buttonText}
                  </NButton>
                ) : null}
                {props.isReset ? (
                  <NButton quaternary type="info" onclick={handleReset}>
                    重置
                  </NButton>
                ) : null}
              </NInputGroup>
            </NSpin>
          </div>
        );
      };
    },
  });
</script>
