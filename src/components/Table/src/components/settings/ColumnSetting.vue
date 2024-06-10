<template>
  <n-tooltip trigger="hover">
    <template #trigger>
      <div class="cursor-pointer table-toolbar-right-icon">
        <n-popover
          :width="getPopoverWidth"
          class="toolbar-popover"
          placement="bottom-end"
          trigger="click"
          scrollable
          style="max-height: 50vh"
        >
          <template #trigger>
            <n-icon size="18">
              <SettingOutlined />
            </n-icon>
          </template>
          <template #header>
            <div class="table-toolbar-inner-popover-title">
              <n-space justify="space-between">
                <n-checkbox
                  v-model:checked="checkAll"
                  :indeterminate="!checkAll && checkPart"
                  @update:checked="onCheckAll"
                  >列展示
                </n-checkbox>
                <!--                <n-checkbox v-model:checked="selection" @update:checked="onSelection"-->
                <!--                  >勾选列-->
                <!--                </n-checkbox>-->
                <n-button class="mt-1" size="small" text type="primary" @click="resetColumns"
                  >重置
                </n-button>
              </n-space>
            </div>
          </template>
          <div class="table-toolbar-inner">
            <n-checkbox-group v-model:value="checkList" @update:value="onChange">
              <Draggable
                v-model="basicColumns"
                animation="300"
                item-key="key"
                filter=".no-draggable"
                :move="onMove"
                @end="draggableEnd"
              >
                <template #item="{ element }">
                  <div
                    v-if="element.type != 'selection' && element.type != 'expand'"
                    :class="{
                      'table-toolbar-inner-checkbox-dark': getDarkTheme === true,
                      'no-draggable': element.draggable === false,
                    }"
                    class="table-toolbar-inner-checkbox"
                  >
                    <span
                      class="drag-icon"
                      :class="{ 'drag-icon-hidden': element.draggable === false }"
                    >
                      <n-icon size="18">
                        <DragOutlined />
                      </n-icon>
                    </span>
                    <n-checkbox :label="element.title" :value="element.key" />
                    <div class="fixed-item">
                      <n-tooltip placement="top" trigger="hover">
                        <template #trigger>
                          <n-icon
                            :color="element.fixed === 'left' ? getAppTheme : undefined"
                            class="cursor-pointer"
                            size="18"
                            @click="fixedColumn(element, 'left')"
                          >
                            <VerticalRightOutlined />
                          </n-icon>
                        </template>
                        <span>固定到左侧</span>
                      </n-tooltip>
                      <n-divider vertical />
                      <n-tooltip placement="top" trigger="hover">
                        <template #trigger>
                          <n-icon
                            :color="element.fixed === 'right' ? getAppTheme : undefined"
                            class="cursor-pointer"
                            size="18"
                            @click="fixedColumn(element, 'right')"
                          >
                            <VerticalLeftOutlined />
                          </n-icon>
                        </template>
                        <span>固定到右侧</span>
                      </n-tooltip>
                    </div>
                  </div>
                </template>
              </Draggable>
            </n-checkbox-group>
          </div>
        </n-popover>
      </div>
    </template>
    <span>列设置</span>
  </n-tooltip>
</template>

<script lang="ts" setup>
  import { ref, unref, toRaw, watchEffect, computed } from 'vue';
  import { useTableContext } from '../../hooks/useTableContext';
  import { cloneDeep } from 'lodash-es';
  import {
    SettingOutlined,
    DragOutlined,
    VerticalRightOutlined,
    VerticalLeftOutlined,
  } from '@vicons/antd';
  import Draggable from 'vuedraggable/src/vuedraggable';
  import { useDesignSetting } from '@/hooks/setting/useDesignSetting';
  import type { TableSetting } from '../../types/table';

  interface Options {
    title: string;
    key: string;
    fixed?: boolean | 'left' | 'right';
  }

  const emit = defineEmits(['columnsChange']);

  const props = defineProps({
    tableSetting: {
      type: Object as PropType<TableSetting>,
    },
  });

  const { getDarkTheme, getAppTheme } = useDesignSetting();
  const table: any = useTableContext();
  const basicColumns = ref<Options[]>([]);
  const cacheColumnsList = ref<Options[]>([]);

  const selection = ref(false);
  const checkAll = ref(true);
  const checkPart = ref(false);
  const checkList = ref<string[]>([]);
  const defaultCheckList = ref([]);

  const getPopoverWidth = computed(() => {
    return props.tableSetting?.width;
  });

  watchEffect(() => {
    const columns = table.getColumns();
    if (columns.length) {
      init();
    }
  });

  //初始化
  function init() {
    const columns: any[] = getColumns();
    //同时兼容 全选 反选，单选
    const checkListArr: any =
      !checkAll.value && !checkPart.value && checkList.value.length
        ? checkList.value
        : columns.map((item) => item.key);
    //重新赋值
    checkList.value = !checkAll.value && !checkPart.value ? [] : checkListArr;
    defaultCheckList.value = !checkAll.value && !checkPart.value ? [] : checkListArr;

    const newColumns = columns.filter((item) => item.key != 'action' && item.title != '操作');
    if (!basicColumns.value.length) {
      let reNewColumns = cloneDeep(newColumns);
      basicColumns.value = reNewColumns;
      cacheColumnsList.value = cloneDeep(newColumns);
    }
  }

  //切换
  function onChange(list) {
    if (selection.value) {
      list.unshift('selection');
    }
    const filterColumns = basicColumns.value.filter((item) => {
      return list.includes(item.key);
    });
    const isAction = list.includes('action');
    const len = isAction ? list.length - 1 : list.length;
    checkPart.value = basicColumns.value.length != len;
    checkAll.value = basicColumns.value.length == len;
    setColumns(filterColumns);
    table.isShowTable.value = true;
    emit('columnsChange', table.getColumns());
  }

  //设置
  function setColumns(columns) {
    table.setColumns(columns);
  }

  //获取
  function getColumns() {
    let newRet: any[] = [];
    table.getColumns().forEach((item) => {
      newRet.push({ ...item });
    });
    return newRet;
  }

  //重置
  function resetColumns() {
    checkList.value = [...defaultCheckList.value];
    checkAll.value = true;
    let cacheColumnsKeys: any[] = table.getCacheColumns();
    let newColumns = cacheColumnsKeys.map((item) => {
      return {
        ...item,
        fixed: undefined,
      };
    });
    setColumns(newColumns);
    basicColumns.value = newColumns;
    table.isShowTable.value = true;
    emit('columnsChange', table.getColumns());
  }

  //全选
  function onCheckAll(e) {
    let checkList = table.getCacheColumns();
    checkPart.value = false;
    if (e) {
      setColumns(checkList);
      checkAll.value = true;
      checkList.value = checkList;
      table.isShowTable.value = true;
    } else {
      table.isShowTable.value = false;
      checkList.value = [];
      checkAll.value = false;
      setColumns([]);
    }
    emit('columnsChange', table.getColumns());
  }

  //拖拽排序
  function draggableEnd() {
    const newColumns = toRaw(unref(basicColumns));
    basicColumns.value = newColumns;
    const filterColumns = newColumns.filter((item) => {
      return checkList.value.includes(item.key as string);
    });
    checkList.value = filterColumns.map((item) => item.key) as string[];
    setColumns(filterColumns);
    emit('columnsChange', table.getColumns());
  }

  //勾选列
  // function onSelection(e) {
  //   let checkList = table.getCacheColumns();
  //   if (e) {
  //     checkList.unshift({ type: 'selection', key: 'selection' });
  //     setColumns(checkList);
  //   } else {
  //     checkList.splice(0, 1);
  //     setColumns(checkList);
  //   }
  // }

  function onMove(e) {
    if (e.draggedContext.element.draggable === false) return false;
    return true;
  }

  //固定
  function fixedColumn(item, fixed) {
    if (!unref(checkList).includes(item.key as never)) return;
    let columns = getColumns();
    const isFixed = item.fixed === fixed ? undefined : fixed;
    let index = columns.findIndex((res) => res.key === item.key);
    if (index !== -1) {
      columns[index].fixed = isFixed;
    }
    table.setCacheColumnsField(item.key, { fixed: isFixed });
    basicColumns.value[index].fixed = isFixed;
    setColumns(columns);
    emit('columnsChange', table.getColumns());
  }
</script>

<style lang="less">
  .table-toolbar {
    &-inner-popover-title {
      padding: 3px 0;
    }

    &-right {
      &-icon {
        margin-left: 12px;
        font-size: 16px;
        color: var(--n-text-color);
        cursor: pointer;

        :hover {
          color: v-bind(getAppTheme);
        }
      }
    }
  }

  .table-toolbar-inner {
    &-checkbox {
      display: flex;
      align-items: center;
      padding: 10px 14px;

      &:hover {
        background: #e6f7ff;
      }

      .drag-icon {
        display: inline-flex;
        margin-right: 8px;
        cursor: move;
        &-hidden {
          visibility: hidden;
          cursor: default;
        }
      }

      .fixed-item {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-left: auto;
      }

      .ant-checkbox-wrapper {
        flex: 1;

        &:hover {
          color: v-bind(getAppTheme) !important;
        }
      }
    }

    &-checkbox-dark {
      &:hover {
        background: hsla(0, 0%, 100%, 0.08);
      }
    }
  }

  .toolbar-popover {
    .n-popover__content {
      padding: 0;
    }
  }
</style>
