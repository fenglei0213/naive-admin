<template>
  <n-popover trigger="click" placement="bottom-start" style="padding: 0" :show-arrow="false">
    <template #trigger>
      <n-button ref="handelBtnRef" tertiary round type="info" class="mx-3">常用</n-button>
    </template>
    <div class="stock-nav">
      <n-card :bordered="false" class="stock-nav-left">
        <div class="stock-nav-title">
          <div class="title">我的收藏</div>
          <div class="flex action">
            <n-button
              :type="isShowMenus ? 'info' : 'tertiary'"
              size="tiny"
              text
              @click="toggleShowMenus"
              class="ml-2"
            >
              <template #icon>
                <n-icon :size="16"><OptionsSharp /></n-icon>
              </template>
            </n-button>
          </div>
        </div>
        <div class="stock-nav-list">
          <div class="stock-nav-item" v-for="item in getMyStore" :key="item.name">
            <div class="item-btn">
              <div
                class="item-btn-text"
                :class="{ 'cursor-pointer': !isShowMenus }"
                @click="goPage(item)"
                >{{ t(item.meta?.title as string) }}</div
              >
              <div class="item-btn-icon" @click="addMystore(item)">
                <n-icon :size="14" class="cursor-pointer" v-if="isShowMenus"
                  ><MinusCircleOutlined
                /></n-icon>
              </div>
            </div>
          </div>
          <n-text depth="3" v-if="!getMyStore.length" class="w-full my-3 text-center"
            >暂无数据</n-text
          >
        </div>
      </n-card>
      <n-card embedded :bordered="false" class="stock-nav-right" v-if="isShowMenus">
        <div class="mb-4 stock-nav-title">
          <div class="title">全部导航菜单</div>
          <div class="action">
            <n-button circle type="tertiary" size="tiny" text @click="hideShowMenus">
              <template #icon>
                <n-icon :size="22"><CloseOutline /></n-icon>
              </template>
            </n-button>
          </div>
        </div>
        <n-tabs type="line" animated>
          <n-tab-pane
            v-for="item in menusList"
            :key="item.name"
            :name="item.name"
            :tab="t(item.meta?.title as string)"
          >
            <div class="stock-nav-list right-nav-list">
              <div class="stock-nav-item" v-for="items in item.children" :key="items.name">
                <n-button
                  icon-placement="right"
                  dashed
                  class="stock-nav-item"
                  @click="addMystore(items)"
                >
                  {{ t(items.meta?.title as string) }}
                  <template #icon>
                    <n-icon :size="14" v-if="items.isCollect">
                      <MinusCircleOutlined />
                    </n-icon>
                    <n-icon :size="14" v-else color="#2d8cf0">
                      <AddCircleSharp />
                    </n-icon>
                  </template>
                </n-button>
              </div>
            </div>
          </n-tab-pane>
        </n-tabs>
      </n-card>
    </div>
  </n-popover>
</template>

<script lang="ts" setup>
  import { ref, onMounted, computed } from 'vue';
  import { OptionsSharp, AddCircleSharp, CloseOutline } from '@vicons/ionicons5';
  import { MinusCircleOutlined } from '@vicons/antd';
  import { useAsyncRouteStore } from '@/store/modules/asyncRoute';
  import { cloneDeep } from 'lodash-es';
  import { clapMultipleRoute } from '@/router/create/index';
  import { useI18n } from '@/hooks/web/useI18n';
  import { useTabsViewStore } from '@/store/modules/tabsView';
  import { useRoute } from 'vue-router';
  import { useGo } from '@/hooks/web/usePage';
  import { useMessage } from 'naive-ui';

  const { t } = useI18n();
  const route = useRoute();
  const message = useMessage();
  const go = useGo();
  const handelBtnRef = ref();
  const asyncRouteStore = useAsyncRouteStore();
  const tabsViewStore = useTabsViewStore();

  const isShowMenus = ref(false);
  const menusList = ref<any[]>([]);

  const getMyStore = computed(() => tabsViewStore.getMystore);

  function isExist(name) {
    return getMyStore.value.some((store) => {
      return store.name === name;
    });
  }

  function updateMenus() {
    const newMenus = clapMultipleRoute(cloneDeep(asyncRouteStore.getMenus));
    newMenus.forEach((item: any) => {
      item.isCollect = isExist(item.name);
      if (item.children && item.children.length) {
        item.children.forEach((children) => {
          children.isCollect = isExist(children.name);
        });
      }
    });
    menusList.value = newMenus;
  }

  function goPage(item) {
    if (isShowMenus.value) return;
    const { name } = item;
    if (name === route.name) {
      return message.warning('您当前已经是该页面了');
    }
    handelBtnRef.value?.onClick();
    go(item, true);
  }

  function addMystore(item) {
    tabsViewStore.addMystore(item);
    updateMenus();
  }

  // function treeMenusToArr(menus: RouteRecordRaw[]) {
  //   let arrs: RouteRecordRaw[] = [];
  //   let result = [];
  //   arrs = arrs.concat(menus);
  //   while (arrs.length) {
  //     let first = arrs.shift(); // 弹出第一个元素
  //     if (first?.children) {
  //       //如果有children
  //       arrs = arrs.concat(first.children);
  //       delete first['children'];
  //     }
  //     result.push(first as never);
  //   }
  //   return result;
  // }

  function toggleShowMenus() {
    isShowMenus.value = !isShowMenus.value;
  }

  function hideShowMenus() {
    isShowMenus.value = false;
  }

  onMounted(() => {
    updateMenus();
  });
</script>

<style lang="less" scope>
  .stock-nav {
    display: flex;

    &-left {
      width: 266px;
      max-width: 266px;
    }

    &-right {
      min-width: 530px;
      max-width: 530px;
    }

    &-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title {
        font-size: 14px;
        font-weight: 700;
      }
    }
    &-list {
      display: flex;
      flex-wrap: wrap;
      padding-top: 15px;
      .stock-nav-item {
        margin-bottom: 10px;
        margin-right: 8px;
        .item-btn {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          &-text {
            opacity: 0.8;
          }
          &-text.cursor-pointer {
            &:hover {
              opacity: 1;
            }
          }
          &-icon {
            margin-left: 8px;
            margin-top: -3px;
          }
        }
      }
    }
    .right-nav-list {
      padding-top: 5px;
      .stock-nav-item {
        width: auto;
        margin: 0 10px 10px 0;
        .n-button {
          opacity: 1;
          .n-button__content {
            // font-weight: 700;
            font-size: 14px;
          }
        }
      }
    }
  }
</style>
