<template>
  <basicModal @register="modalRegister" ref="deleteModalRef" @on-ok="okModal" style="width: 410px">
    <template #default>
      <p class="py-4 pl-8">确定删除这条数据吗？</p>
    </template>
  </basicModal>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { basicModal, useModal } from '@/components/Modal';

  const props = defineProps({
    title: {
      type: String,
      default: '删除',
    },
    width: {
      type: Number,
      default: 410,
    },
    data: {
      type: Object as PropType<Object>,
      default: () => {},
    },
  });

  const emit = defineEmits(['fetch-delete', 'register']);

  const deleteModalRef: any = ref(null);

  const [modalRegister, { openModal, closeModal, setSubLoading }] = useModal({
    width: 410,
    title: '删除确认',
    showIcon: true,
    type: 'warning',
    closable: false,
    maskClosable: true,
  });

  async function okModal() {
    setSubLoading(true);
    emit('fetch-delete', props.data, (res) => {
      if (res === true) {
        closeModal();
      } else {
        setSubLoading(false);
      }
    });
  }

  defineExpose({
    openModal,
    closeModal,
  });
</script>

<style lang="less" scoped></style>
