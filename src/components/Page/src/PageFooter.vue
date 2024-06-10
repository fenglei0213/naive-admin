<template>
  <n-card
    :bordered="false"
    content-style="padding: 0;width:100%"
    class="page-wrapper-footer"
    :class="{ 'dark-bg': getDarkTheme }"
  >
    <div class="flex items-center w-full">
      <div class="flex-1 page-wrapper-footer-left"><slot name="left"></slot></div>
      <div class="page-wrapper-footer-right"><slot name="right"></slot></div>
    </div>
  </n-card>
</template>

<script lang="ts" setup>
  import { useDesignSetting } from '@/hooks/setting/useDesignSetting';

  const { getDarkTheme } = useDesignSetting();
</script>

<style lang="less" scoped>
  .page-wrapper-footer {
    position: fixed;
    right: 0;
    bottom: 0;
    z-index: 999;
    display: flex;
    width: 100%;
    align-items: center;
    padding: 15px 24px;
    transition: all 0.2s ease-in-out;
    background: #fff;
    border-radius: 0;
  }

  .dark-bg {
    background: rgb(24, 24, 28);
  }
</style>
