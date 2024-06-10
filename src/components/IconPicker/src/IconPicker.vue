<template>
  <n-input-group>
    <n-button>
      <template #icon v-if="iconValue">
        <Icon :icon="getIconValue" :key="getIconValue" />
      </template>
    </n-button>
    <n-select
      placeholder="请选择图标"
      :style="getWidth"
      :consistent-menu-width="false"
      v-model:value="getIconValue"
      class="i-select"
    >
      <template #empty>
        <div class="i-picker" :style="getContentWidth">
          <div class="i-picker-search" v-if="isShowSearch">
            <n-input placeholder="可输入单词搜索图标哦~" v-model:value="keyword" clearable>
              <template #suffix>
                <n-icon :component="SearchOutlined" />
              </template>
            </n-input>
          </div>

          <n-tabs
            type="line"
            class="i-picker-tab"
            @before-leave="beforeLeave"
            @update:value="tabsChange"
          >
            <template #suffix>
              <n-tooltip trigger="hover">
                <template #trigger>
                  <n-icon
                    :component="SearchOutlined"
                    :size="22"
                    class="cursor-pointer"
                    @click="isShowSearch = !isShowSearch"
                    :depth="3"
                  />
                </template>
                {{ isShowSearch ? '隐藏' : '显示' }}搜索
              </n-tooltip>
            </template>
            <n-tab-pane name="antd" tab="antd" display-directive="show:lazy">
              <n-spin :show="loading" description="加载中...">
                <IconItem :list="getAntdIcons" v-model:value="iconValue" />
              </n-spin>
            </n-tab-pane>
            <n-tab-pane name="ionicons5" tab="ionicons5" display-directive="show:lazy">
              <n-spin :show="loading" description="加载中...">
                <IconItem :list="getIonicons5Icons" v-model:value="iconValue" />
              </n-spin>
            </n-tab-pane>
          </n-tabs>
        </div>
      </template>
    </n-select>
  </n-input-group>
</template>

<script lang="ts" setup>
  import { SearchOutlined } from '@vicons/antd';
  import { computed, ref, nextTick } from 'vue';
  import { basicProps } from './props';
  import gather from './resource/gather';
  import IconItem from './components/IconItem.vue';
  import { Icon } from '@/components/Icon';

  const isShowSearch = ref<Boolean>(false);
  const loading = ref<boolean>(false);
  const keyword = ref<string>('');
  const iconValue = ref<string>();

  const getAntdIcons = computed(() => {
    return gather.antd.filter((item) => {
      return filter(item, keyword.value);
    });
  });

  const getIonicons5Icons = computed(() => {
    return gather.ionicons5.filter((item) => {
      return filter(item, keyword.value);
    });
  });

  const getIconValue = computed(() => {
    return iconValue.value;
  });

  const props = defineProps({
    ...basicProps,
  });

  const getWidth = computed(() => {
    return {
      width: props.width,
    };
  });

  const getContentWidth = computed(() => {
    return {
      width: props.contentWidth,
    };
  });

  function filter(item: string, keyword: string) {
    return item.toLowerCase().indexOf(keyword.toLowerCase()) != -1;
  }

  function beforeLeave() {
    loading.value = true;
    return true;
  }

  function tabsChange() {
    nextTick(() => {
      loading.value = false;
    });
  }
</script>

<style lang="less" scoped>
  .i-picker {
    &-search {
      margin-bottom: 10px;
    }
  }
</style>
