<template>
  <div>
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="地区">
        地区组件，用于选择省市区，比如填写地址，配送地址，等...
      </n-card>
    </div>
    <n-card :bordered="false" class="mt-3 proCard">
      <n-alert title="添加场景" type="info"> 自动加载数据，显示省市区</n-alert>
      <Region class="Region mt-3" @change="regionChange" />
      <n-divider />

      <n-alert title="回显场景" type="info"> 设置默认值，自动加载数据，并且选中</n-alert>
      <Region v-model:value="regionIds" class="Region mt-3" @change="regionChange" />
      <n-divider />

      <n-alert title="只显示省市" type="info" />
      <Region
        v-model:value="regionIds"
        :hideArea="true"
        class="Region mt-3"
        @change="regionChange"
      />
      <n-divider />

      <n-alert title="只显示省" type="info" />
      <Region :onlyProvince="true" class="Region mt-3" @change="regionChange" />
    </n-card>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { Region } from '@/components/Region';

  const regionIds = ref([1, 11, 111]);

  //地区变动回调
  function regionChange(result) {
    console.log(result);
  }
</script>

<style lang="less">
  .Region {
    width: 320px;
  }
</style>
