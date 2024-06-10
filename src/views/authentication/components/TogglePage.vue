<template>
  <div class="togglePage">
    <n-select
      v-model:value="getPath"
      :options="options"
      @update:value="pageChange"
      placeholder="切换登录模版"
    />
  </div>
</template>

<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const pageUrls = ref(['/login-v1', '/login-v2', '/login-v3', '/login-v4']);

  const getPath = computed(() => {
    const index = pageUrls.value.findIndex((item) => {
      return route.path === item;
    });
    return index < 0 ? 2 : index;
  });

  const options = [
    {
      label: '登录模版1',
      value: 0,
    },
    {
      label: '登录模版2',
      value: 1,
    },
    {
      label: '登录模版3',
      value: 2,
    },
    {
      label: '登录模版4',
      value: 3,
    },
  ];

  function pageChange(value) {
    window.location.href = pageUrls.value[value];
  }
</script>

<style lang="less" scoped>
  .togglePage {
    position: fixed;
    top: 20px;
    right: 30px;
    width: 130px;
  }
</style>
