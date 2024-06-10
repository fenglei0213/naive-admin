<template>
  <div>
    <!-- 搜索框 -->
    <n-card :bordered="false" class="search-box radius-10">
      <h2 class="text-lg">搜索列表（视频）</h2>
      <div class="mt-4 text-center">
        <n-input round placeholder="请输入关键字" :style="{ width: '400px' }">
          <template #prefix>
            <n-icon :component="Search" />
          </template>
        </n-input>
      </div>
    </n-card>

    <!-- 视频部分 start -->
    <div class="mt-3 tab2">
      <!-- 分类 -->
      <n-card :bordered="false" class="radius-10">
        <div>
          <div class="flex items-start justify-between pb-2 classification">
            <n-space vertical :inline="false" v-if="loading" style="width: 100%">
              <n-skeleton text :repeat="3" size="small" height="10px" />
            </n-space>
            <template v-else>
              <div class="flex-none label">分类: </div>
              <div class="flex-grow">
                <n-space size="small" :class="!isCollapse ? 'height-limited' : ''">
                  <n-tag
                    v-for="(item, index) in categoryListData"
                    :key="index"
                    @click="selectedHandle(index)"
                    :bordered="false"
                    :checked="categoryIndex != index ? false : true"
                    checkable
                    class="mb-3"
                    >{{ item.name }}</n-tag
                  >
                </n-space>
              </div>
              <div
                class="flex items-center justify-end flex-none cursor-pointer collapse-btn"
                @click="collapseHandle"
                >{{ isCollapse ? '收起' : '展开' }}
                <n-icon size="20">
                  <ChevronUp class="ml-1" v-if="isCollapse" />
                  <ChevronDown class="ml-1" v-else />
                </n-icon>
              </div>
            </template>
          </div>

          <div class="flex items-start justify-between pt-5 border-none classification">
            <div class="flex-none label">排序:</div>
            <div class="flex-grow mt-1">
              <n-radio-group v-model:value="sort">
                <n-radio value="1">最新</n-radio>
                <n-radio value="2" class="ml-3">最热</n-radio>
                <n-radio value="3" class="ml-3">评分最高</n-radio>
              </n-radio-group>
            </div>
          </div>
        </div>
      </n-card>

      <!-- 视频列表 -->
      <n-grid
        cols="2 s:3 m:3 l:4 xl:4 2xl:6"
        responsive="screen"
        :x-gap="12"
        :y-gap="12"
        class="mt-3 list"
      >
        <n-grid-item v-for="item in videoListData" :key="item.id">
          <n-card :bordered="false" class="card radius-10">
            <n-image width="100%" :src="item.cover" class="cover" />
            <div class="p-2">
              <div>
                <h3 class="text-base font-bold truncate">{{ item.title }}</h3>
                <p class="py-1 text-gray-500 roy-line-2">简介：{{ item.summary }}</p>
              </div>
              <div class="flex items-center justify-between text-gray-400">
                <div
                  ><n-icon size="16" class="mr-1">
                    <PlayCircleOutlined />
                  </n-icon>
                  <span class="text-xs">{{ item.viewingtimes }}万</span></div
                >
                <n-avatar-group :options="item.avatargroup" :size="30" :max="3">
                  <template #avatar="{ option: { src } }">
                    <n-avatar :src="src" />
                  </template>
                </n-avatar-group>
              </div>
            </div>
          </n-card>
        </n-grid-item>
      </n-grid>

      <!-- 加载更多 -->
      <n-card :bordered="false" class="mt-3 text-center radius-10">
        <n-button :loading="loadingMore" @click="loadMore">加载更多</n-button>
      </n-card>
    </div>
    <!-- 视频部分 end -->
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { Search, ChevronDown, ChevronUp } from '@vicons/ionicons5';
  import { PlayCircleOutlined } from '@vicons/antd';
  import { useThemeVars } from 'naive-ui';
  import { categoryList } from '@/api/search/category';
  import { videoList } from '@/api/search/video';

  const loading = ref(true);
  const categoryIndex = ref(-1);
  const isCollapse = ref(false);
  const categoryListData = ref();
  const videoListData = ref();
  const pageSize = ref(12);
  const loadingMore = ref(true);
  const sort = ref('1');
  const themeVars = useThemeVars();

  //获取分类列表
  async function getCategoryList() {
    const res = await categoryList();
    categoryListData.value = res && res.list ? res.list : [];
    loading.value = false;
  }

  //分类选中
  function selectedHandle(index) {
    categoryIndex.value = index;
  }

  //是否展开
  function collapseHandle() {
    isCollapse.value = !isCollapse.value;
  }

  //获取视频列表
  async function getVideoList() {
    const res = await videoList({ pageSize: pageSize.value });
    videoListData.value = res && res.list ? res.list : [];
    loadingMore.value = false;
  }

  //加载更多
  function loadMore() {
    loadingMore.value = true;
    pageSize.value = pageSize.value + 12;
    getVideoList();
  }

  onMounted(() => {
    //获取分类
    getCategoryList();
    //获取视频
    getVideoList();
  });
</script>

<style lang="less" scoped>
  //分类
  .classification {
    border-bottom: 1px dotted v-bind('themeVars.borderColor');
    .label,
    .collapse-btn {
      height: 32px;
      font-size: 14px;
      line-height: 30px;
    }
    .label {
      width: 60px;
    }
    .collapse-btn {
      width: 60px;
      color: v-bind('themeVars.primaryColor');
    }
    .height-limited {
      height: 40px;
      overflow: hidden;
    }

    .n-tag {
      margin-bottom: 10px;
    }
  }

  .roy-line-2 {
    -webkit-line-clamp: 2;
    overflow: hidden;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }

  .radius-10 {
    border-radius: 10px;
    overflow: hidden;
  }

  //视频
  .tab2 {
    .list {
      :deep(.n-card > .n-card__content) {
        padding: 0;
      }
      .card {
        :deep(img) {
          width: 100%;
        }
      }
      .card:hover {
        box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 20px;
      }
    }
  }
</style>
