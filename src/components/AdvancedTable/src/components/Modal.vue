<template>
  <basicModal @register="modalRegister" ref="modalRef" @on-ok="okModal" :style="modalStyle">
    <template #default>
      <div class="pt-6">
        <BasicForm @register="register" :schemas="getSchemas" />
      </div>
    </template>
  </basicModal>
</template>

<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { useMessage } from 'naive-ui';
  import { basicModal, useModal } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form/index';

  const isBasicForm = ref(false);

  const props = defineProps({
    title: {
      type: String,
      default: '编辑',
    },
    width: {
      type: String,
      default: '720px',
    },
    data: {
      type: Array as PropType<any[]>,
      default: () => [],
    },
    formInfo: {
      type: Object as PropType<Object>,
      default: () => {},
    },
  });

  const emit = defineEmits(['fetch-edit', 'register']);

  const getSchemas = computed(() => {
    return props.data;
  });

  const modalStyle = computed(() => {
    return {
      width: props.width,
    };
  });

  const modalRef: any = ref(null);
  const modalTitle = ref('新增');
  const schemas = ref([]);
  const message = useMessage();

  const [modalRegister, { openModal, closeModal, setSubLoading }] = useModal({
    title: modalTitle,
    subBtuText: '保存',
  });

  const [register, { submit: formSubmit, setFieldsValue, getFieldsValue }] = useForm({
    gridProps: { cols: 2 },
    collapsedRows: 3,
    layout: 'horizontal',
    showActionButtonGroup: false,
    requireMarkPlacement: 'left',
  });

  function setTitle(title: string) {
    modalTitle.value = title;
  }

  function setSchemas(data) {
    schemas.value = data;
    console.log(schemas.value);
    isBasicForm.value = true;
  }

  async function okModal() {
    const formRes = await formSubmit();
    if (formRes) {
      const emitName: any = modalTitle.value === '新增' ? 'fetch-add' : 'fetch-edit';
      emit(emitName, getFieldsValue(), (res) => {
        if (res === true) closeModal();
      });
      setSubLoading(false);
    } else {
      message.error('验证失败，请填写完整信息');
      setSubLoading(false);
    }
  }

  defineExpose({
    openModal,
    closeModal,
    setSchemas,
    setFieldsValue,
    setTitle,
  });
</script>

<style lang="less">
  // .n-dialog.basicFormModal {
  //   width: 640px;
  // }

  // .n-dialog.basicModalLight {
  //   width: 410px;
  // }
</style>

<style lang="less" scoped></style>
