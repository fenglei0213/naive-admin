<template>
  <div>
    <!-- 搜索框 -->
    <n-card :bordered="false" class="search-box radius-10">
      <h2 class="text-lg">搜索列表（预约）</h2>
      <div class="mt-4 text-center">
        <n-input round placeholder="请输入关键字" :style="{ width: '400px' }">
          <template #prefix>
            <n-icon :component="Search" />
          </template>
        </n-input>
      </div>
    </n-card>

    <!-- 应用部分 start -->
    <div class="mt-3 tab3">
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

          <div class="flex items-start justify-between pt-5 border-none classification">
            <div class="flex-none label">排序:</div>
            <div class="flex-grow mt-1">
              <n-radio-group v-model:value="sort">
                <n-radio value="1">最新</n-radio>
                <n-radio value="2" class="ml-3">最热</n-radio>
              </n-radio-group>
            </div>
          </div>
        </div>
      </n-card>

      <!-- 应用列表 -->
      <n-grid
        cols="2 s:3 m:3 l:4 xl:4 2xl:6"
        responsive="screen"
        :x-gap="12"
        :y-gap="12"
        class="mt-3 list"
      >
        <n-grid-item v-for="item in makeListData" :key="item.id">
          <n-card :bordered="false" class="card radius-10">
            <div class="flex items-center px-4">
              <n-avatar round :size="40" :src="item.avatar" />
              <span class="ml-2 text-base">{{ item.doctor }} 医师</span>
            </div>
            <dl class="px-4 my-4 text-gray-500">
              <dt>科室：{{ item.subject }}</dt>
              <dd>最后预约时间：{{ item.date }}</dd>
            </dl>
            <n-grid cols="4" class="grid-box">
              <n-grid-item class="flex items-center justify-center wrap">
                <n-tooltip trigger="hover">
                  <template #trigger>
                    <a href="https://www.naiveadmin.com/home" target="_blank">
                      <n-icon size="16">
                        <EyeOutline />
                      </n-icon>
                    </a>
                  </template>
                  查看
                </n-tooltip>
              </n-grid-item>
              <n-grid-item class="flex items-center justify-center wrap">
                <n-tooltip trigger="hover">
                  <template #trigger>
                    <div>
                      <n-icon size="16">
                        <ExportOutlined />
                      </n-icon>
                    </div>
                  </template>
                  导出
                </n-tooltip>
              </n-grid-item>
              <n-grid-item class="flex items-center justify-center wrap">
                <n-tooltip trigger="hover">
                  <template #trigger>
                    <n-icon size="16">
                      <EditOutlined />
                    </n-icon>
                  </template>
                  编辑
                </n-tooltip>
              </n-grid-item>
              <n-grid-item class="flex items-center justify-center wrap">
                <n-dropdown trigger="hover" @select="handleSelect" :options="options">
                  <n-icon size="16">
                    <DeleteOutlined />
                  </n-icon>
                </n-dropdown>
              </n-grid-item>
            </n-grid>
          </n-card>
        </n-grid-item>
      </n-grid>

      <!-- 加载更多 -->
      <n-card :bordered="false" class="mt-3 text-center radius-10">
        <n-button :loading="loadingMore" @click="loadMore">加载更多</n-button>
      </n-card>
    </div>
    <!-- 应用部分 end -->
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { Search, ChevronDown, ChevronUp, EyeOutline } from '@vicons/ionicons5';
  import { ExportOutlined, EditOutlined, DeleteOutlined } from '@vicons/antd';
  import { useThemeVars } from 'naive-ui';
  import { categoryList } from '@/api/search/category';
  import { makeList } from '@/api/search/make';

  const loading = ref(true);
  const categoryIndex = ref(-1);
  const isCollapse = ref(false);
  const categoryListData = ref();
  const makeListData = ref();
  const pageSize = ref(12);
  const loadingMore = ref(true);
  const sort = ref('1');
  const themeVars = useThemeVars();
  const options = [
    {
      label: '确定',
      key: 1,
    },
    {
      label: '取消',
      key: 0,
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

  //获取预约列表
  async function getMakeList() {
    const res = await makeList({ pageSize: pageSize.value });
    makeListData.value = res && res.list ? res.list : [];
    loadingMore.value = false;
  }

  //删除下拉列表
  function handleSelect(key) {
    if (key) {
      alert('你确定要删除吗');
    }
  }

  //加载更多
  function loadMore() {
    loadingMore.value = true;
    pageSize.value = pageSize.value + 12;
    getMakeList();
  }

  onMounted(() => {
    //获取分类
    getCategoryList();
    //获取预约
    getMakeList();
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

  //预约
  .tab3 {
    .list {
      :deep(.n-card > .n-card__content) {
        padding: 16px 0 0;
      }
      .grid-box {
        border-top: 1px solid v-bind('themeVars.borderColor');
        background-color: v-bind('themeVars.bodyColor');
        .wrap {
          position: relative;
          height: 60px;
          padding: 8px 0;
          cursor: pointer;
          a {
            color: v-bind('themeVars.textColor2');
          }
          &::before {
            content: '';
            position: absolute;
            right: 0;
            top: 8px;
            bottom: 8px;
            width: 1px;
            background-color: v-bind('themeVars.borderColor');
          }
        }
        .wrap:last-child {
          &::before {
            content: none;
          }
        }
      }
      .item:hover {
        box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 20px;
      }
    }
  }
</style>
