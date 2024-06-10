<template>
  <PageWrapper>
    <n-card :bordered="false" title="弹窗表单">
      <n-alert title="提示" type="info" class="mb-3">
        弹窗表单，在中后台系统中，广泛使用，表单支持垂直排版，或者栅格排版，完美适配表单较多/较少场景
      </n-alert>

      <n-button type="primary" @click="handleModal"> 新增预约 </n-button>
    </n-card>
    <Modal ref="modalRef" />
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import Modal from './Modal.vue';

  const modalRef = ref();

  function handleModal() {
    modalRef.value?.openModal();
  }
</script>
