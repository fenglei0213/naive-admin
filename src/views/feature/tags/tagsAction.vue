<template>
  <div>
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="多页签">
        有些时候，可能要操作多页签标题，比如页面特定交互，详情页面区分，该操作仅限于，当前打开过并且显示的标签
      </n-card>
    </div>
    <n-card
      :bordered="false"
      title="多页签操作"
      class="mt-3 proCard"
      size="small"
      :segmented="{ content: true }"
    >
      <n-space>
        <n-button type="primary" @click="setTabsTitle">更新当前页面标题</n-button>
        <n-button type="primary" @click="setTabsTitleSpecific">更新指定页面标题</n-button>
        <n-button type="primary" @click="closeCurrent">关闭当前页</n-button>
      </n-space>
      <n-h2>设置多页签状态</n-h2>
      <n-space>
        <n-button type="warning" @click="setTabState('undone')">设置当前页面状态未完成</n-button>
        <n-button type="success" @click="setTabState('done')">设置当前页面状态已完成</n-button>
      </n-space>
    </n-card>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue';
  import { useTabs } from '@/hooks/web/useTags';
  import { useMessage } from 'naive-ui';

  const useTagsHooks = useTabs();
  const message = useMessage();

  function setTabsTitle() {
    useTagsHooks.setTitle('货品详情：编码-3695');
    message.success('设置成功');
  }

  function setTabsTitleSpecific() {
    useTagsHooks.setTitle('指定页面标题', { name: '/list/basic-list' });
    message.success('设置成功');
  }

  function closeCurrent() {
    useTagsHooks.closeCurrent();
  }

  function setTabState(state: string) {
    useTagsHooks.setTabState({
      state,
      dialogOptions: {
        content: '页面尚未提交，是否关闭？',
      },
    });
    const msg =
      state === 'undone'
        ? '设置成功，点击当前页标签关闭按钮，试试效果'
        : '取消成功，当前页标签，可以正常关闭';
    message.success(msg);
  }

  //如果需要每次进入页面，都自定义，需要在 onMounted 中调用
  onMounted(() => {
    //setTabsTitle();
  });
</script>
