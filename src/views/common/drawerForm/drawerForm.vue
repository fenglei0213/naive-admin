<template>
  <PageWrapper>
    <n-card :bordered="false" title="抽屉表单">
      <n-alert title="提示" type="info" class="mb-3">
        抽屉表单，有时候他的出现，相对优雅，能够承载更多的内容
      </n-alert>

      <n-button type="primary" @click="handleDrawer"> 新增预约 </n-button>
    </n-card>
    <Drawer ref="drawerRef" />
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import Drawer from './Drawer.vue';

  const drawerRef = ref();

  function handleDrawer() {
    drawerRef.value?.openDrawer();
  }
</script>
