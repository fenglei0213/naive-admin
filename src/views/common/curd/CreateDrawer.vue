<template>
  <n-drawer
    v-model:show="isDrawer"
    :width="width"
    placement="right"
    :auto-focus="false"
    @after-leave="handleReset"
  >
    <n-drawer-content :title="title" closable>
      <BasicForm @register="register" @reset="handleReset" class="mt-6">
        <!-- 自定义插槽用法 -->
        <!-- <template #statusSlot="{ model, field }">
          <n-input v-model:value="model[field]" />
        </template> -->
      </BasicForm>
      <template #footer>
        <n-space>
          <n-button @click="handleReset">重置</n-button>
          <n-button type="primary" :loading="subLoading" @click="formSubmit">提交</n-button>
        </n-space>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<script lang="ts" setup>
  import { ref, nextTick } from 'vue';
  import { useMessage } from 'naive-ui';
  import { BasicForm, useForm } from '@/components/Form/index';
  import { schemas } from './schemas';

  const emit = defineEmits(['change']);

  interface formParamsType {
    id?: number | null;
    name?: string;
    mobile?: number | null;
    type?: number | null;
    makeDate?: number | null;
    makeTime?: number | null;
    status?: string;
    source?: string;
  }

  defineProps({
    title: {
      type: String,
      default: '添加预约',
    },
    width: {
      type: Number,
      default: 450,
    },
    permissionList: {
      type: Array,
    },
  });

  const message = useMessage();
  const isDrawer = ref(false);
  const subLoading = ref(false);

  const [register, { submit, getFieldsValue, setFieldsValue, resetFields }] = useForm({
    gridProps: { cols: 1 },
    layout: 'horizontal',
    submitButtonText: '保存',
    showActionButtonGroup: false,
    schemas,
  });

  function openDrawer(record?: formParamsType) {
    if (record) {
      record.makeDate = 1183135260000;
      record.makeTime = 1183133260000;
      record.type = 1;
      record.mobile = 18888888888;
      record.source = '朋友介绍';
      getInfo(record);
      return;
    }
    isDrawer.value = true;
  }

  function closeDrawer() {
    isDrawer.value = false;
  }

  async function formSubmit() {
    const isCheck = await submit();
    if (!isCheck) return;
    const params = getFieldsValue();
    message.success('提交成功：' + JSON.stringify(params));
    console.log('表单返回值：', params);
    // 此处可以 进行接口保存更新
    emit('change');
    closeDrawer();
  }

  function handleReset() {
    resetFields();
  }

  function getInfo(record) {
    // 此处可以 进行接口获取详情赋值给表单组件
    isDrawer.value = true;
    nextTick(() => {
      setFieldsValue(record);
    });
  }

  defineExpose({
    openDrawer,
    closeDrawer,
  });
</script>
