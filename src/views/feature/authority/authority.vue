<template>
  <PageWrapper>
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="权限判断">
        中后台系统，权限事关重要，可能在任意页面都会存在，前端可以通过多种方式来实现权限控制
      </n-card>
    </div>
    <n-card
      :bordered="false"
      title="方法判断"
      class="mt-3 proCard"
      size="small"
      :segmented="{ content: true }"
    >
      <n-space>
        <n-button type="success" v-if="hasPermission(['delete_user'])" @click="handleDeleteSueeess"
          >有删除用户权限可见</n-button
        >
        <n-button type="error" @click="handleDeleteError">没有删除列表权限</n-button>
      </n-space>
    </n-card>
    <n-card
      :bordered="false"
      title="指令判断"
      class="mt-3 proCard"
      size="small"
      :segmented="{ content: true }"
    >
      <n-space>
        <n-button type="error" v-permission="{ action: ['delete_list'], effect: 'disabled' }"
          >没有删除列表权限禁用</n-button
        >
        <n-button type="error" v-permission="{ action: ['delete_list'] }"
          >没有删除列表权限隐藏</n-button
        >
      </n-space>
    </n-card>
    <n-card
      :bordered="false"
      title="组件判断"
      class="mt-3 proCard"
      size="small"
      :segmented="{ content: true }"
    >
      <n-space>
        <Authority :value="['delete_user']">
          <n-button type="success" @click="handleDeleteSueeess">有删除用户权限可见</n-button>
        </Authority>
        <Authority :value="['delete_list']">
          <n-button type="error" @click="handleDeleteSueeess">没有删除列表权限隐藏</n-button>
        </Authority>
      </n-space>
    </n-card>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { usePermission } from '@/hooks/web/usePermission';
  import { useMessage } from 'naive-ui';

  const message = useMessage();
  const { hasPermission } = usePermission();

  function handleDeleteSueeess() {
    if (hasPermission(['delete_user'])) {
      message.success('恭喜，您拥有该操作权限');
    }
  }

  function handleDeleteError() {
    if (!hasPermission(['delete_list'])) {
      message.warning('抱歉，您没有操作权限');
    }
  }
</script>
