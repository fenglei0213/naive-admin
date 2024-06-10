<template>
  <basicModal @register="modalRegister" ref="modalRef" @on-ok="formSubmit">
    <template #default>
      <BasicForm @register="register" @reset="handleReset" class="mt-6">
        <!-- 自定义插槽用法 -->
        <!-- <template #statusSlot="{ model, field }">
          <n-input v-model:value="model[field]" />
        </template> -->
      </BasicForm>
    </template>
  </basicModal>
</template>

<script lang="ts" setup>
  import { onMounted, nextTick } from 'vue';
  import { useMessage } from 'naive-ui';
  import { BasicForm, useForm } from '@/components/Form/index';
  import { basicModal, useModal } from '@/components/Modal';
  import { schemas } from './schemas';

  const emit = defineEmits(['change', 'register']);

  interface formParamsType {
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

  const [register, { submit, getFieldsValue, setFieldsValue, resetFields }] = useForm({
    gridProps: { cols: 1 },
    layout: 'horizontal',
    submitButtonText: '保存',
    showActionButtonGroup: false,
    schemas,
  });

  const [modalRegister, { openModal, closeModal, setSubLoading }] = useModal({
    title: '新增预约',
    subBtuText: '提交',
    width: 600,
  });

  function showModal(record?: formParamsType) {
    if (record) {
      record.makeDate = 1183135260000;
      record.makeTime = 1183133260000;
      record.type = 1;
      record.mobile = 18888888888;
      record.source = '朋友介绍';
      getInfo(record);
      return;
    }
    openModal();
  }

  async function formSubmit() {
    const isCheck = await submit();
    if (!isCheck) return;
    const params = getFieldsValue();
    message.success('提交成功：' + JSON.stringify(params));
    console.log('表单返回值：', params);
    // 此处可以 进行接口保存更新
    emit('change');
    closeModal();
  }

  function handleReset() {
    resetFields();
  }

  function getInfo(record) {
    // 此处可以 进行接口获取详情赋值给表单组件
    openModal();
    nextTick(() => {
      setFieldsValue(record);
    });
  }

  onMounted(() => {});

  defineExpose({
    showModal,
    closeModal,
    setSubLoading,
  });
</script>
