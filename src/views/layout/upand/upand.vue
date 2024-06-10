<template>
  <PageWrapper
    title="上下布局"
    content="比较典型的排版方式，适用于，页面有多组内容展示"
    :showFooter="false"
  >
    <n-grid x-gap="12" y-gap="12" :cols="1">
      <n-gi>
        <n-card title="今日订单" :bordered="false">
          <div class="light-green"></div>
        </n-card>
      </n-gi>
      <n-gi>
        <n-card title="本周订单" :bordered="false">
          <div class="green"></div>
        </n-card>
      </n-gi>
      <n-gi>
        <n-card title="本月订单" :bordered="false">
          <div class="light-green"></div>
        </n-card>
      </n-gi>
      <n-gi>
        <n-card title="会员订单排行" :bordered="false">
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
