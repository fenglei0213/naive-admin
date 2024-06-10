<template>
  <div>
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="滚动场景"> 比如，卡片列表，文章列表滚动</n-card>
    </div>
    <n-card :bordered="false" class="mt-3 proCard">
      <n-alert title="UI框架内置滚动条" type="info"
        >如果你只是想简单的，实现一个滚动，可以这么写
      </n-alert>
      <div class="mt-3 scrollbar-box">
        <n-scrollbar>
          <p v-for="item in list" :key="item.id">{{ item.name }}</p>
        </n-scrollbar>
      </div>

      <n-alert class="mt-3" title="指令方式" type="info"
        >基于，perfect-scrollbar 使用方式可参考该插件
      </n-alert>
      <div class="mt-3 scrollbar-main">
        <div v-scrollBar class="scrollbar-box">
          <p v-for="item in list" :key="item.id">{{ item.name }}</p>
        </div>
      </div>

      <n-alert class="mt-3" title="UI框架内置滚动条" type="info">演示，函数触发滚动条位置</n-alert>
      <div class="mt-3 scrollbar-box">
        <n-scrollbar ref="scrollbar">
          <p v-for="item in list" :key="item.id">{{ item.name }}</p>
        </n-scrollbar>
      </div>
      <div class="mt-3">
        <n-space>
          <n-button @click="goScrollbar(120)">滚动到120位置</n-button>
          <n-button @click="goScrollbar(900)">滚动到900位置</n-button>
          <n-button @click="goScrollbar(0)">滚动到顶部</n-button>
          <n-button @click="goScrollbar(99999)">滚动到底部</n-button>
        </n-space>
      </div>
    </n-card>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import 'perfect-scrollbar/css/perfect-scrollbar.css';

  interface IList {
    id: string | number;
    name: string;
  }

  function getList() {
    const arr: IList[] = [];
    for (let index = 0; index < 40; index++) {
      arr.push({
        id: `${index}`,
        name: '这内容下面可能还有很多个，鼠标放进来使劲的滚动吧',
      });
    }
    return arr;
  }

  const list = getList();

  const scrollbar = ref();

  function goScrollbar(y) {
    scrollbar.value.scrollTo(0, y);
  }
</script>

<style lang="less" scoped>
  // 如果使用 perfect-scrollbar初始化的DOM，
  // 内部有使用border/margin/padding等会改变元素原有宽高的样式，
  // 就会造成滚动条无限滚动的bug;
  .scrollbar-main {
    width: 360px;
    border: 1px solid #eee;
    overflow: hidden;
  }

  .scrollbar-box {
    width: 360px;
    height: 350px;
    overflow: hidden;
    position: relative;
    border-radius: 4px;
    border: 1px solid #eee;
    padding: 10px;

    p {
      padding: 5px 0;
      color: #666;
    }
  }
</style>
