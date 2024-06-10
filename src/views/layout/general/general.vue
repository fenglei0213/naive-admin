<template>
  <PageWrapper
    title="常规布局"
    content="推荐用这个组件，统一页面风格，还支持固定底部布局，也方便后期统一修改"
  >
    <n-card :bordered="false">
      <n-grid x-gap="12" y-gap="12" :cols="6">
        <n-gi>
          <div class="light-green"></div>
        </n-gi>
        <n-gi>
          <div class="green"></div>
        </n-gi>
        <n-gi>
          <div class="light-green"></div>
        </n-gi>
        <n-gi>
          <div class="green"></div>
        </n-gi>
        <n-gi>
          <div class="light-green"></div>
        </n-gi>
        <n-gi>
          <div class="green"></div>
        </n-gi>
        <n-gi>
          <div class="light-green"></div>
        </n-gi>
        <n-gi>
          <div class="green"></div>
        </n-gi>
        <n-gi>
          <div class="light-green"></div>
        </n-gi>
        <n-gi>
          <div class="green"></div>
        </n-gi>
        <n-gi>
          <div class="light-green"></div>
        </n-gi>
        <n-gi>
          <div class="green"></div>
        </n-gi>
        <n-gi>
          <div class="light-green"></div>
        </n-gi>
        <n-gi>
          <div class="green"></div>
        </n-gi>
        <n-gi>
          <div class="light-green"></div>
        </n-gi>
        <n-gi>
          <div class="green"></div>
        </n-gi>
        <n-gi>
          <div class="light-green"></div>
        </n-gi>
        <n-gi>
          <div class="green"></div>
        </n-gi>
        <n-gi>
          <div class="light-green"></div>
        </n-gi>
        <n-gi>
          <div class="green"></div>
        </n-gi>
        <n-gi>
          <div class="light-green"></div>
        </n-gi>
        <n-gi>
          <div class="green"></div>
        </n-gi>
        <n-gi>
          <div class="light-green"></div>
        </n-gi>
        <n-gi>
          <div class="green"></div>
        </n-gi>
        <n-gi>
          <div class="light-green"></div>
        </n-gi>
        <n-gi>
          <div class="green"></div>
        </n-gi>
        <n-gi>
          <div class="light-green"></div>
        </n-gi>
        <n-gi>
          <div class="green"></div>
        </n-gi>
        <n-gi>
          <div class="light-green"></div>
        </n-gi>
        <n-gi>
          <div class="green"></div>
        </n-gi>
        <n-gi>
          <div class="light-green"></div>
        </n-gi>
        <n-gi>
          <div class="green"></div>
        </n-gi>
        <n-gi>
          <div class="light-green"></div>
        </n-gi>
        <n-gi>
          <div class="green"></div>
        </n-gi>
        <n-gi>
          <div class="light-green"></div>
        </n-gi>
        <n-gi>
          <div class="green"></div>
        </n-gi>
      </n-grid>
    </n-card>
    <template #leftFooter>
      <n-space>
        <n-button>返 回</n-button>
        <n-button type="primary"> 审 核 </n-button>
        <n-button type="success"> 保 存 </n-button>
      </n-space>
    </template>
  </PageWrapper>
</template>

<style scoped>
  .light-green {
    height: 108px;
    background-color: rgba(0, 128, 0, 0.12);
  }

  .green {
    height: 108px;
    background-color: rgba(0, 128, 0, 0.24);
  }
</style>
