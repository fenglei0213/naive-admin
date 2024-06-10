<template>
  <div>
    <!-- 搜索框 -->
    <n-card :bordered="false" class="search-box radius-10">
      <h2 class="text-lg">搜索列表（文章）</h2>
      <div class="mt-4 text-center">
        <n-input round placeholder="请输入关键字" :style="{ width: '400px' }">
          <template #prefix>
            <n-icon :component="Search" />
          </template>
        </n-input>
      </div>
    </n-card>

    <!-- 文章部分 start -->
    <div class="mt-3 tab1">
      <n-card :bordered="false" class="radius-10">
        <!-- 分类 -->
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

          <div class="flex items-start justify-between py-5 classification">
            <div class="flex-none label">作者:</div>
            <div class="flex-grow">
              <n-space vertical :wrap="false" :style="{ width: '380px' }">
                <n-select
                  v-model:value="multipleSelectValue"
                  filterable
                  multiple
                  tag
                  :options="options"
                />
              </n-space>
            </div>
          </div>

          <div class="flex items-start justify-between pt-5 border-none classification">
            <div class="flex-none label">排序:</div>
            <div class="flex-grow mt-1">
              <n-radio-group v-model:value="sort">
                <n-radio value="1">最新发表</n-radio>
                <n-radio value="2" class="ml-3">最多收藏</n-radio>
                <n-radio value="3" class="ml-3">最多阅读</n-radio>
              </n-radio-group>
            </div>
          </div>
        </div>
      </n-card>

      <!-- 文章列表 -->
      <n-card :bordered="false" class="mt-3 radius-10">
        <ul class="article-list">
          <li
            class="flex items-start justify-between"
            v-for="item in articleListData"
            :key="item.id"
          >
            <div class="left-box">
              <div>
                <n-h2 class="mb-3">{{ item.title }}</n-h2>
                <n-space class="mb-3">
                  <n-tag v-for="(tag, i) in item.tags" :key="i" :bordered="false">{{ tag }}</n-tag>
                </n-space>
                <p>
                  {{ item.summary }}
                </p>
              </div>
              <div class="flex items-center mt-3 text-xs">
                <n-avatar :size="24" round :src="item.avatar" />
                <span class="ml-1 mr-1">{{ item.author }}</span
                >发表于 <span class="ml-1">{{ item.date }}</span>
              </div>
              <div class="mt-4 text-gray-400">
                <span>
                  <n-icon size="16">
                    <StarOutlined />
                  </n-icon>
                  <b class="ml-1 text-xs">{{ item.collection }}</b>
                </span>
                <n-divider vertical class="mx-3" />
                <span>
                  <n-icon size="16"> <LikeOutlined /> </n-icon
                  ><b class="ml-1 text-xs">{{ item.like }}</b></span
                >
                <n-divider vertical class="mx-3" />
                <span>
                  <n-icon size="16"> <CommentOutlined /> </n-icon
                  ><b class="ml-1 text-xs">{{ item.comment }}</b></span
                >
              </div>
            </div>
            <div class="thumb"><n-image width="100%" :src="item.cover" /></div>
          </li>
        </ul>
      </n-card>

      <!-- 加载更多 -->
      <n-card :bordered="false" class="mt-3 text-center radius-10">
        <n-button :loading="loadingMore" @click="loadMore">加载更多</n-button>
      </n-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { Search, ChevronDown, ChevronUp } from '@vicons/ionicons5';
  import { StarOutlined, LikeOutlined, CommentOutlined } from '@vicons/antd';
  import { useThemeVars } from 'naive-ui';
  import { categoryList } from '@/api/search/category';
  import { articleList } from '@/api/search/article';

  const loading = ref(true);
  const categoryIndex = ref(-1);
  const isCollapse = ref(false);
  const categoryListData = ref();
  const articleListData = ref();
  const pageSize = ref(5);
  const loadingMore = ref(true);
  const themeVars = useThemeVars();
  const sort = ref('1');
  const multipleSelectValue = ref(null);

  const options = [
    {
      label: '啊俊',
      value: '1',
    },
    {
      label: '小马',
      value: '2',
    },
    {
      label: 'jack',
      value: '3',
    },
    {
      label: 'roy',
      value: '4',
    },
    {
      label: '马云',
      value: '5',
    },
    {
      label: '麻麻',
      value: '6',
    },
  ];

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

  //获取文章列表
  async function getArticleList() {
    const res = await articleList({ pageSize: pageSize.value });
    articleListData.value = res && res.list ? res.list : [];
    loadingMore.value = false;
  }

  //加载更多
  function loadMore() {
    loadingMore.value = true;
    pageSize.value = pageSize.value + 5;
    getArticleList();
  }

  onMounted(async () => {
    loading.value = false;
    //获取分类
    getCategoryList();
    //获取文章
    getArticleList();
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
  .radius-10 {
    border-radius: 10px;
    overflow: hidden;
  }
  //文章
  .tab1 {
    // 文章列表
    .article-list {
      li {
        padding: 20px 0;
        border-bottom: 1px solid v-bind('themeVars.borderColor');
        .left-box {
          max-width: 800px;
        }
        .thumb {
          max-width: 250px;
          margin-left: 40px;
          :deep(img) {
            width: 100%;
          }
        }
      }
    }

    @media (max-width: 767px) {
      .article-list {
        li {
          flex-wrap: wrap-reverse;
          .thumb {
            margin: 0 auto;
          }
        }
      }
    }
  }
</style>
