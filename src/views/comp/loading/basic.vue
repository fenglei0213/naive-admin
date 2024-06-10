<template>
  <PageWrapper
    title="Loading 组件示例"
    content="通常用于，加载数据，或者操作数据，需要一定等待时间使用，从而缓解用户焦躁情绪"
    v-loading="loadingRef"
    loading-tip="加载中..."
  >
    <div ref="wrapEl">
      <n-card :bordered="false" class="mt-3 proCard loading">
        <n-alert title="组件方式" type="info" />
        <n-button class="my-4 mr-4" type="primary" @click="handleFull"> 全屏 Loading </n-button>

        <n-button class="my-4 mr-4" type="primary" @click="handlePageAbsolute">
          容器内 Loading
        </n-button>

        <n-alert title="函数方式" type="info" />
        <n-button class="my-4 mr-4" type="primary" @click="handleFunction"> 全屏 Loading </n-button>
        <n-button class="my-4 mr-4" type="primary" @click="handleFunctionPageAbsolute">
          容器内 Loading
        </n-button>

        <n-alert title="指令方式" type="info" />
        <n-button class="my-4 mr-4" type="primary" @click="handleDirective">
          打开指令Loading
        </n-button>

        <Loading :loading="loading" :absolute="absolute" :background="background" :tip="tip" />
      </n-card>
    </div>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { Loading, useLoading } from '@/components/Loading';

  const wrapEl = ref<ElRef>(null);
  const loadingRef = ref(false);
  const absolute = ref(false);
  const loading = ref(false);
  const background = ref('rgba(0, 0, 0, 0.4)');
  const tip = ref('加载中...');

  const [openFullLoading, closeFullLoading] = useLoading({
    tip: '加载中...',
  });

  const [openWrapLoading, closeWrapLoading] = useLoading({
    target: wrapEl,
    props: {
      tip: '加载中...',
      absolute: true,
    },
  });

  function handleFunctionPageAbsolute() {
    openWrapLoading();

    setTimeout(() => {
      closeWrapLoading();
    }, 2000);
  }

  function openLoading(status: boolean) {
    absolute.value = status;
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
    }, 2000);
  }

  function handlePageAbsolute() {
    openLoading(true);
  }

  function handleFull() {
    openLoading(false);
  }

  function handleFunction() {
    openFullLoading();

    setTimeout(() => {
      closeFullLoading();
    }, 2000);
  }

  function handleDirective() {
    loadingRef.value = true;
    setTimeout(() => {
      loadingRef.value = false;
    }, 2000);
  }
</script>

<style lang="less" scoped>
  .loading {
    position: relative;
  }
</style>
