<template>
  <PageWrapper title="可选列表" content="基于 List 组件扩展" showFooter>
    <n-card :bordered="false" class="mt-3 proCard" title="单选" content-style="padding-top: 0;">
      <CheckCard :options="listProps1" @change="checkCardChange" />
    </n-card>
    <n-card :bordered="false" class="mt-3 proCard" title="多选" content-style="padding-top: 0;">
      <CheckCard
        :options="listProps2"
        multiple
        @change="checkCardChange"
        v-model:value="checkValue"
      />
      <div class="mt-3">
        <n-space>
          <n-button @click="checkValue = [1]">选择第一个</n-button>
          <n-button @click="checkValue = [1, 3]">选择全部</n-button>
        </n-space>
      </div>
    </n-card>
    <n-card :bordered="false" class="mt-3 proCard" title="可悬浮" content-style="padding-top: 0;">
      <CheckCard :options="listProps3" multiple hoverable @change="checkCardChange" />
      <div class="mt-3">
        <n-space>
          <n-button @click="add">添加一个</n-button>
        </n-space>
      </div>
    </n-card>
    <n-card
      :bordered="false"
      class="mt-3 proCard"
      title="选项不可用"
      content-style="padding-top: 0;"
    >
      <CheckCard :options="listProps4" multiple hoverable @change="checkCardChange" />
    </n-card>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { ref, h } from 'vue';
  import { CheckCard, OptionsConfig } from '@/components/CheckCard/index';
  import { NButton } from 'naive-ui';
  import HeaderExtra from './HeaderExtra.vue';

  const options = [
    {
      label: '菜单',
      key: 'menu',
    },
    {
      label: '列表',
      key: 'list',
    },
    {
      label: '表单',
      key: 'form',
    },
  ];

  const listProps1 = ref<OptionsConfig[]>([
    {
      title: 'Spring Boot',
      description: '通过业界流行的技术栈来快速构建 Java 后端应用',
      value: 1,
      avatar: 'https://gw.alipayobjects.com/zos/bmw-prod/2dd637c7-5f50-4d89-a819-33b3d6da73b6.svg',
      headerExtra: h(HeaderExtra, {
        options,
      }),
    },
    {
      title: 'SOFA Boot',
      description: '使用 SOFAStack 中间件来快速构建分布式后端应用',
      value: 2,
      avatar: 'https://gw.alipayobjects.com/zos/bmw-prod/6935b98e-96f6-464f-9d4f-215b917c6548.svg',
    },
    {
      title: 'Node JS',
      description: '使用前后端统一的语言方案快速构建后端应用',
      value: 3,
      avatar: 'https://gw.alipayobjects.com/zos/bmw-prod/d12c3392-61fa-489e-a82c-71de0f888a8e.svg',
    },
  ]);

  const listProps2 = ref<OptionsConfig[]>([
    {
      title: 'Spring Boot',
      description: '通过业界流行的技术栈来快速构建 Java 后端应用',
      value: 1,
      avatar: 'https://gw.alipayobjects.com/zos/bmw-prod/2dd637c7-5f50-4d89-a819-33b3d6da73b6.svg',
    },
    {
      title: 'SOFA Boot',
      description: '使用 SOFAStack 中间件来快速构建分布式后端应用',
      value: 2,
      avatar: 'https://gw.alipayobjects.com/zos/bmw-prod/6935b98e-96f6-464f-9d4f-215b917c6548.svg',
    },
    {
      title: 'Node JS',
      description: '使用前后端统一的语言方案快速构建后端应用',
      value: 3,
      avatar: 'https://gw.alipayobjects.com/zos/bmw-prod/d12c3392-61fa-489e-a82c-71de0f888a8e.svg',
    },
  ]);

  const listProps3 = ref<OptionsConfig[]>([
    {
      title: 'Spring Boot',
      description: '通过业界流行的技术栈来快速构建 Java 后端应用',
      value: 1,
      avatar: 'https://gw.alipayobjects.com/zos/bmw-prod/2dd637c7-5f50-4d89-a819-33b3d6da73b6.svg',
    },
    {
      title: 'SOFA Boot',
      description: '使用 SOFAStack 中间件来快速构建分布式后端应用',
      value: 2,
      avatar: 'https://gw.alipayobjects.com/zos/bmw-prod/6935b98e-96f6-464f-9d4f-215b917c6548.svg',
    },
    {
      title: 'Node JS',
      description: '使用前后端统一的语言方案快速构建后端应用',
      value: 3,
      avatar: 'https://gw.alipayobjects.com/zos/bmw-prod/d12c3392-61fa-489e-a82c-71de0f888a8e.svg',
    },
  ]);

  const listProps4 = ref<OptionsConfig[]>([
    {
      title: 'Spring Boot',
      description: '通过业界流行的技术栈来快速构建 Java 后端应用',
      value: 1,
      avatar: 'https://gw.alipayobjects.com/zos/bmw-prod/2dd637c7-5f50-4d89-a819-33b3d6da73b6.svg',
    },
    {
      title: 'SOFA Boot',
      description: '使用 SOFAStack 中间件来快速构建分布式后端应用',
      value: 2,
      avatar: 'https://gw.alipayobjects.com/zos/bmw-prod/6935b98e-96f6-464f-9d4f-215b917c6548.svg',
      disabled: true,
    },
    {
      title: 'Node JS',
      description: '使用前后端统一的语言方案快速构建后端应用',
      value: 3,
      avatar: 'https://gw.alipayobjects.com/zos/bmw-prod/d12c3392-61fa-489e-a82c-71de0f888a8e.svg',
    },
  ]);

  const checkValue = ref([1, 3]);

  function checkCardChange(value: any) {
    console.log(value);
  }

  function add() {
    const len = listProps3.value.length;
    listProps3.value.push({
      title: `Node JS （新添加-${len}）`,
      description: '使用前后端统一的语言方案快速构建后端应用',
      value: len + 1,
      avatar: 'https://gw.alipayobjects.com/zos/bmw-prod/d12c3392-61fa-489e-a82c-71de0f888a8e.svg',
    });
  }
</script>
