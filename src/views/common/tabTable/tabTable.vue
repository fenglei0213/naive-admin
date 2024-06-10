<template>
  <page-wrapper>
    <n-card :bordered="false" class="pt-0 mb-3 proCard" content-style="padding-top: 16px;">
      <n-tabs type="card" animated>
        <n-tab-pane name="proprietary" tab="自 营">
          <Table />
        </n-tab-pane>
        <n-tab-pane name="agency" tab="代 理">
          <Table />
        </n-tab-pane>
        <template #suffix>
          <n-space>
            <n-button size="small" type="info" dashed> 新增店铺 </n-button>
          </n-space>
        </template>
      </n-tabs>
    </n-card>
  </page-wrapper>
</template>

<script lang="ts" setup>
  import Table from './Table.vue';
</script>
