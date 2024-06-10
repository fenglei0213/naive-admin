<template>
  <PageWrapper title="图标选择器 组件示例" content="通常用于，图标选择">
    <n-card :bordered="false" class="mt-3 proCard loading">
      <div style="width: 350px"><IconPicker /></div>
    </n-card>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { IconPicker } from '@/components/IconPicker';
</script>

<style lang="less" scoped>
  .loading {
    position: relative;
  }
</style>
