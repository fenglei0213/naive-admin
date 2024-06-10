<template>
  <n-config-provider :theme="getDarkTheme">
    <n-modal v-model:show="isModal" class="app-search">
      <n-card
        :bordered="false"
        class="app-search-card"
        :class="{ 'light-item-bg': !getDarkTheme }"
        footer-style="padding:0"
        size="small"
      >
        <div class="app-search-card-input">
          <n-input
            ref="searchInput"
            v-model:value="searchKeyword"
            :loading="loading"
            clearable
            placeholder="请输入关键词搜索"
            size="large"
            @input="handleSearch"
          >
            <template #prefix>
              <n-icon v-if="loading">
                <LoadingOutlined />
              </n-icon>
              <n-icon v-else>
                <SearchOutline />
              </n-icon>
            </template>
          </n-input>
        </div>

        <div class="app-search-card-result">
          <div v-if="!loading && !searchResult.length" class="no-result">
            <p v-if="!loading">暂无搜索结果</p>
            <n-spin v-else size="small" />
          </div>
          <div v-else-if="loading" class="no-result">
            <n-spin size="small" />
          </div>
          <ul v-else class="result-ul">
            <n-scrollbar>
              <li
                v-for="(item, index) in searchResult"
                :key="item.key"
                :class="{ 'result-ul-li-on': index === activeIndex }"
                :data-index="index"
                class="result-ul-li"
                @click="handleEnter"
                @mouseenter="handleMouseenter"
              >
                <a href="javascript:;">
                  <div class="result-ul-li-icon">
                    <n-icon>
                      <InteractionOutlined />
                    </n-icon>
                  </div>
                  <div class="result-ul-li-content"> {{ item.name }}</div>
                  <div class="result-ul-li-action">
                    <n-icon>
                      <EnterOutlined />
                    </n-icon>
                  </div>
                </a>
              </li>
            </n-scrollbar>
          </ul>
        </div>

        <template #footer>
          <div class="app-search-card-footer">
            <ul class="commands">
              <li>
                <n-icon class="commands-icon">
                  <EnterOutlined />
                </n-icon>
                <span>确认</span>
              </li>
              <li>
                <n-icon class="mr-2 commands-icon">
                  <ArrowUpOutlined />
                </n-icon>
                <n-icon class="commands-icon">
                  <ArrowDownOutlined />
                </n-icon>
                <span>切换</span>
              </li>
              <li>
                <n-icon class="commands-icon">
                  <CloseOutlined />
                </n-icon>
                <span>ESC关闭</span>
              </li>
            </ul>
          </div>
        </template>
      </n-card>
    </n-modal>
  </n-config-provider>
</template>

<script lang="ts" setup>
  import type { Menu } from '@/router/types';
  import { ref, unref, onBeforeMount, nextTick, computed } from 'vue';
  import { SearchOutline } from '@vicons/ionicons5';
  import {
    EnterOutlined,
    ArrowUpOutlined,
    ArrowDownOutlined,
    CloseOutlined,
    InteractionOutlined,
    LoadingOutlined,
  } from '@vicons/antd';
  import { onKeyStroke, useDebounceFn } from '@vueuse/core';
  import { getMenus } from '@/router/menus';
  import { cloneDeep } from 'lodash-es';
  import { filter } from '@/utils/helper/treeHelper';
  import { useGo } from '@/hooks/web/usePage';
  import { darkTheme } from 'naive-ui';
  import { useDesignSettingStore } from '@/store/modules/designSetting';
  import { useI18n } from '@/hooks/web/useI18n';

  const isModal = ref(false);
  const loading = ref(false);
  const searchInput = ref();
  const searchKeyword = ref('');
  const searchResult = ref<SearchResult[]>([]);
  const activeIndex = ref(-1);
  let menuList: Menu[] = [];
  const go = useGo();
  const designStore = useDesignSettingStore();
  const getDarkTheme = computed(() => (designStore.darkTheme ? darkTheme : undefined));
  const { t } = useI18n();

  interface SearchResult {
    name: string;
    path: string;
    icon?: string;
    key: string;
  }

  onBeforeMount(async () => {
    const list = await getMenus();
    menuList = cloneDeep(list);
  });

  function show() {
    isModal.value = true;
    nextTick(() => {
      searchInput.value.focus();
    });
  }

  function hide() {
    isModal.value = false;
  }

  const handleSearch = useDebounceFn(search, 200);

  function search() {
    loading.value = true;
    searchKeyword.value = searchKeyword.value.trim();
    if (!searchKeyword.value) {
      searchResult.value = [];
      loading.value = false;
      return;
    }
    const reg = createSearchReg(unref(searchKeyword));
    const filterMenu = filter(menuList, (item) => {
      return reg.test(t(item.title)) && !item.meta?.hidden;
    });
    searchResult.value = handlerSearchResult(filterMenu, reg);
    activeIndex.value = 0;
    nextTick(() => {
      loading.value = false;
    });
  }

  function handlerSearchResult(filterMenu: Menu[], reg: RegExp, parent?: Menu) {
    const ret: SearchResult[] = [];
    filterMenu.forEach((item) => {
      const { title, path, key, icon, children, meta } = item;
      if (!meta?.hidden && reg.test(t(title)) && !children?.length) {
        ret.push({
          name: parent?.title ? `${t(parent.title)} > ${t(title)}` : t(title),
          path,
          icon,
          key,
        });
      }
      if (!meta?.hideChildrenInMenu && Array.isArray(children) && children.length) {
        ret.push(...handlerSearchResult(children as Menu[], reg, item));
      }
    });
    return ret;
  }

  // Translate special characters
  function transform(c: string) {
    const code: string[] = ['$', '(', ')', '*', '+', '.', '[', ']', '?', '\\', '^', '{', '}', '|'];
    return code.includes(c) ? `\\${c}` : c;
  }

  function createSearchReg(key: string) {
    const keys = [...key].map((item) => transform(item));
    const str = ['', ...keys, ''].join('.*');
    return new RegExp(str);
  }

  function handleMouseenter(e) {
    const index = e?.target?.dataset?.index;
    activeIndex.value = Number(index);
  }

  function handleClose() {
    searchResult.value = [];
    searchKeyword.value = '';
    hide();
  }

  async function handleEnter() {
    if (!searchResult.value.length) {
      return;
    }
    const result = unref(searchResult);
    const index = unref(activeIndex);
    if (result.length === 0 || index < 0) {
      return;
    }
    const to = result[index];
    handleClose();
    await nextTick();
    go(to.path);
  }

  // 按方向上键
  function handleUp() {
    if (!searchResult.value.length) return;
    activeIndex.value--;
    if (activeIndex.value < 0) {
      activeIndex.value = searchResult.value.length - 1;
    }
  }

  // 按方向下键
  function handleDown() {
    if (!searchResult.value.length) return;
    activeIndex.value++;
    if (activeIndex.value > searchResult.value.length - 1) {
      activeIndex.value = 0;
    }
  }

  // 回车搜索
  onKeyStroke('Enter', handleEnter);

  // 按方向上键
  onKeyStroke('ArrowUp', handleUp);

  // 按方向下键
  onKeyStroke('ArrowDown', handleDown);

  // 键盘 esc 取消弹窗
  onKeyStroke('Escape', handleClose);

  defineExpose({
    show,
  });
</script>

<style lang="less" scoped>
  .app-search {
    position: fixed;
    top: 60px;
    left: 50%;
    margin-left: -235px;

    &-card {
      width: 560px;
      padding: 0;
      background: var(--n-color);
      box-shadow: var(--n-box-shadow);

      &-input {
        margin-top: 6px;
      }

      :deep(.n-card .n-card__footer) {
        padding: 0;
      }

      &-result {
        .no-result {
          font-size: 0.9em;
          margin: 0 auto;
          padding: 36px 0;
          text-align: center;
          width: 80%;

          p {
            color: #969faf;
          }
        }

        .result-ul {
          list-style: none;
          margin: 14px 0 0 0;
          padding: 0;

          :deep(.n-scrollbar .n-scrollbar-container .n-scrollbar-content) {
            max-height: 640px;
          }

          &-li {
            border-radius: 4px;
            display: flex;
            padding-bottom: 8px;
            position: relative;

            a {
              display: flex;
              align-items: center;
              background: var(--n-color);
              border-radius: 4px;
              padding: 0 12px;
              width: 100%;
              color: var(--n-text-color);
              border-bottom: 1px solid var(--n-border-color);

              .n-icon {
                color: #969faf;
              }
            }

            &-content {
              align-items: center;
              color: var(--n-text-color);
              display: flex;
              flex-direction: row;
              height: 56px;
              padding-left: 6px;
              padding-right: 12px;
              flex: 1;
              box-sizing: border-box;
            }

            &-icon {
              font-size: 18px;
            }

            &-on {
              a {
                background-color: var(--n-color-target);
                color: #fff;

                .n-icon {
                  color: #fff;
                }

                .result-ul-li-content {
                  color: #fff;
                }
              }
            }
          }
        }
      }

      &-footer {
        align-items: center;
        background: var(--n-color);
        border-radius: 0 0 8px 8px;
        box-shadow: var(--n-box-shadow);
        display: flex;
        flex-shrink: 0;
        height: 44px;
        padding: 0 14px;
        position: relative;
        user-select: none;
        width: 100%;
        box-sizing: border-box;

        .commands {
          display: flex;
          align-items: center;
          overflow: hidden;
          padding-left: 2px;

          li {
            display: flex;
            align-items: center;
            margin-right: 14px;

            span {
              color: #969faf;
            }
          }

          &-icon {
            align-items: center;
            background: linear-gradient(-225deg, var(--n-color), var(--n-color));
            border-radius: 2px;
            box-shadow: inset 0 -2px 0 0 #cdcde6, inset 0 0 1px 1px #fff,
              0 1px 2px 1px rgba(30, 35, 90, 0.4);
            display: flex;
            height: 18px;
            justify-content: center;
            margin-right: 0.4em;
            padding-bottom: 2px;
            width: 20px;
          }
        }
      }
    }
  }

  .light-item-bg {
    background: var(--n-border-color);
  }
</style>
