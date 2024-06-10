<template>
  <n-select
    ref="selectRef"
    clearable
    :multiple="props.multiple"
    :style="getWidth"
    :label-field="props.labelField"
    :value-field="props.valueField"
    v-model:value="selectValue"
    :consistent-menu-width="false"
    @update:value="selectChange"
    @clear="clearSelect"
  >
    <template #empty>
      <div class="selectContent" :style="getContentWidth">
        <BasicForm
          v-if="props.formProps.schemas"
          @reset="handleFormReset"
          @register="register"
          @submit="handleFormSubmit"
        />
        <BasicTable
          ref="basicTableRef"
          v-bind="getTableProps"
          :columns="getColumns"
          :canResize="false"
          :showTableSetting="false"
          :isKeepRowKeys="true"
          @checked-row-change="tableSelect"
          @select-all="tableSelectAll"
          @fetch-success="tableFetchSuccess"
        />
      </div>
    </template>
  </n-select>
</template>

<script lang="ts" setup>
  import { ref, unref, computed, watch } from 'vue';
  import { BasicTable } from '../index';
  import { TableSelectProps } from './props';
  import { BasicForm, useForm } from '@/components/Form/index';
  import { cloneDeep } from 'lodash-es';
  import { isArray } from '@/utils/is';
  import { BasicColumn, BasicTableProps } from '@/components/Table';

  const selectValue = ref<string[] | number[] | string | number>();
  const returnData = ref<any>([]);
  const basicTableRef = ref();
  const selectRef = ref();
  const selectedRowKeys = ref([]);
  const tableDataMap = ref<object>({});

  const props = defineProps({
    ...TableSelectProps,
  });

  const emit = defineEmits(['press-enter', 'clear', 'change', 'update:value', 'update:formValues']);

  watch(
    () => props.value,
    () => {
      selectValue.value = props.value;
    },
    {
      immediate: true,
      deep: true,
    },
  );

  // 弹出内容宽度
  const getContentWidth = computed(() => {
    return {
      width: props.contentWidth,
    };
  });

  // 选择器宽度
  const getWidth = computed(() => {
    return {
      width: props.width,
    };
  });

  // 表格原始数据列表
  const getTableData = computed(() => {
    return cloneDeep(basicTableRef.value?.getDataSource() || []);
  });

  // 表格参数
  const getTableProps: any = computed((): BasicTableProps => {
    return props.tableProps;
  });

  // 表格 columun
  const getColumns = computed((): BasicColumn[] => {
    let newColumns = cloneDeep(props.tableProps.columns);
    newColumns.unshift({
      type: 'selection',
      multiple: props.multiple,
    });
    return newColumns;
  });

  // 初始化表格
  const [register, {}] = useForm({
    ...props.formProps,
  });

  // 表格数据加载完成
  function tableFetchSuccess() {
    const list = getTableData.value;
    const key = props.valueField;
    list.forEach((item) => {
      if (!tableDataMap.value[item[key]]) {
        tableDataMap.value[item[key]] = item;
      }
    });
  }

  // 表格提交查询
  function handleFormSubmit(values: Recordable) {
    emit('update:formValues', values);
    basicTableRef.value.reload();
  }

  // 重置
  function handleFormReset() {
    basicTableRef.value.reload();
  }

  // 选择器变动
  function selectChange() {
    updateTableSelectedKeys();
  }

  function findKeysData(values) {
    const newList: any[] = [];
    values.forEach((item) => {
      tableDataMap.value[item] && newList.push(tableDataMap.value[item]);
    });
    return newList;
  }

  // 表格选择行触发
  function tableSelect(keys) {
    const unkeys = unref(keys);
    returnData.value = !unkeys.length ? [] : findKeysData(unkeys);
    const lableList = returnData.value.map((item) => {
      return item[props.labelField];
    });
    selectValue.value = getReData(lableList);
    const reData = getReData(returnData.value);
    emit('change', reData);
    emit('update:value', selectValue.value);
  }

  function clearSelect() {
    emit('clear');
  }

  function getReData(value) {
    return props.multiple ? value : value.length ? value[0] : null;
  }

  // 表格全选
  function tableSelectAll(status) {
    const allValues = status ? getSelectAllValues() : [];
    selectValue.value = allValues;
    selectedRowKeys.value = allValues.map((item) => {
      return item[props.valueField];
    });
  }

  //获取全选数据
  function getSelectAllValues() {
    const tableList = getTableData.value;
    return tableList.map((item) => {
      return item[props.labelField];
    });
  }

  //获取表格原始数据
  function getDataSource() {
    return cloneDeep(getTableData.value);
  }

  // 更新表格行数据
  function updateTableSelectedKeys() {
    const rowSelectKeys = returnData.value.map((item) => {
      const values = !isArray(selectValue.value) ? [selectValue.value] : selectValue.value;
      return values.includes(item[props.labelField]) && item[props.valueField];
    });
    basicTableRef.value?.setCheckedRowKeys(unref(rowSelectKeys));
  }

  // 返回 Table Ref
  function getTableRef() {
    return basicTableRef.value;
  }

  defineExpose({
    getDataSource,
    getTableRef,
    updateTableSelectedKeys,
  });
</script>

<style lang="less"></style>
