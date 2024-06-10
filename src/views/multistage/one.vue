<template>
  <n-card title="四级菜单-测试缓存" hoverable class="border-0 box-card">
    <n-input
      type="textarea"
      style="width: 320px"
      v-model:value="input"
      placeholder="输入点内容，然后切换页面试试吧"
    />
  </n-card>
</template>

<!-- <script lang="ts">
  export default {
    name: 'Level21',
  };
</script> -->

<script lang="ts" setup name="Level22">
  import { ref } from 'vue';
  const input = ref('');
</script>
