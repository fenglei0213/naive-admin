<template>
  <PageWrapper
    title="左右布局"
    content="比较常用的布局了，比如左边显示查询列表，右边显示详情，左边切换，右边刷新，等..."
    :showFooter="false"
  >
    <n-grid x-gap="12" y-gap="12" :cols="2">
      <n-gi>
        <n-card :bordered="false">
          <div class="light-green"></div>
        </n-card>
      </n-gi>
      <n-gi>
        <n-card :bordered="false">
          <div class="green"></div>
        </n-card>
      </n-gi>
    </n-grid>
    <n-grid x-gap="12" y-gap="12" :cols="3" class="mt-3">
      <n-gi :span="2">
        <n-card :bordered="false">
          <div class="light-green"></div>
        </n-card>
      </n-gi>
      <n-gi :span="1">
        <n-card :bordered="false">
          <div class="green"></div>
        </n-card>
      </n-gi>
    </n-grid>
    <n-grid x-gap="12" y-gap="12" :cols="3" class="mt-3">
      <n-gi :span="1">
        <n-card :bordered="false">
          <div class="light-green"></div>
        </n-card>
      </n-gi>
      <n-gi :span="2">
        <n-card :bordered="false">
          <div class="green"></div>
        </n-card>
      </n-gi>
    </n-grid>
    <n-grid x-gap="12" y-gap="12" :cols="5" class="mt-3">
      <n-gi :span="3">
        <n-card :bordered="false">
          <div class="light-green"></div>
        </n-card>
      </n-gi>
      <n-gi :span="2">
        <n-card :bordered="false">
          <div class="green"></div>
        </n-card>
      </n-gi>
    </n-grid>
    <n-grid x-gap="12" y-gap="12" :cols="7" class="mt-3">
      <n-gi :span="3">
        <n-card :bordered="false">
          <div class="light-green"></div>
        </n-card>
      </n-gi>
      <n-gi :span="4">
        <n-card :bordered="false">
          <div class="green"></div>
        </n-card>
      </n-gi>
    </n-grid>
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
