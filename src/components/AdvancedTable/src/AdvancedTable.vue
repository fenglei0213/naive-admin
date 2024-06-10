<template>
  <n-card :bordered="false" class="proCard">
    <n-collapse-transition :show="foldQuery">
      <basic-form
        ref="formRef"
        v-bind="getFormProps"
        @advanced="redoHeight"
        @submit="formSubmit"
        @reset="formReset"
      />
    </n-collapse-transition>
    <basic-table
      ref="tableRef"
      checkedRowAlert
      v-bind="getTableProps"
      :tableSetting="getTableSetting"
      :row-key="(row) => row.id"
      :scroll-x="1360"
      @checked-row-change="checkedRowKeys"
      @fold-query-change="foldQueryChange"
    >
      <template #tableTitle>
        <slot name="tableTitle"></slot>
      </template>

      <template #toolbar> </template>
    </basic-table>

    <!-- 查看详情抽屉 -->
    <table-drawer ref="tableDrawerRef" :data="tableDrawerInfo" />

    <!-- 编辑/添加弹窗 -->
    <table-modal
      ref="tableModalRef"
      :data="tableModalInfo"
      :form-data="rowInfo"
      @fetch-edit="fetchEdit"
      @fetch-add="fetchAdd"
    />

    <!-- 删除确认弹窗 -->
    <table-modal-delete ref="tableModalDeleteRef" :data="rowInfo" @fetch-delete="fetchDelete" />
  </n-card>
</template>

<script lang="ts" setup>
  import { ref, nextTick, computed } from 'vue';
  import { BasicTable } from '@/components/Table';
  import { BasicForm } from '@/components/Form/index';
  import tableDrawer from './components/Drawer.vue';
  import tableModal from './components/Modal.vue';
  import tableModalDelete from './components/DeleteModal.vue';
  import { useProps } from './hooks/useProps';
  import { useHelp } from './hooks/useHelp';
  import { useTableEvents } from './hooks/useTableEvents';
  import { useFormEvents } from './hooks/useFormEvents';
  import { useModalEvents } from './hooks/useModalEvents';
  import { BasicTableProps } from '@/components/Table/src/types/table';
  import { FormProps } from '@/components/Form/src/types/form';

  interface AdvancedTableType {
    formProps?: FormProps;
    tableProps: BasicTableProps;
  }

  const formRef = ref();
  const tableRef = ref();
  const tableDrawerRef = ref();
  const tableModalRef = ref();
  const tableDrawerInfo = ref();
  const tableModalInfo = ref();
  const tableModalDeleteRef = ref();
  const rowInfo = ref();
  const foldQuery = ref(true);

  const props = defineProps<AdvancedTableType>();

  const { getFormProps, getTableProps } = useProps(props);
  const { getDrawerInfo, getModalInfo } = useHelp(getTableProps.columns);

  const emit = defineEmits(['fetch-add', 'fetch-edit', 'fetch-delete', 'fold-query-change']);

  const { checkedRowKeys } = useTableEvents({ emit });
  const { fetchEdit, fetchAdd, fetchDelete } = useModalEvents({ emit });

  const { formSubmit, formReset, redoHeight } = useFormEvents({ formRef, tableRef });

  const getTableSetting = computed(() => {
    return {
      query: getFormProps.schemas && getFormProps.schemas.length,
    };
  });

  function foldQueryChange() {
    foldQuery.value = !foldQuery.value;
    emit('fold-query-change', foldQuery.value);
    nextTick(() => {
      redoHeight();
    });
  }

  function openDrawer(record: Recordable) {
    tableDrawerInfo.value = getDrawerInfo(record);
    nextTick(() => {
      tableDrawerRef.value.openDrawer();
    });
  }

  function openModal(record: Recordable) {
    if (!record) {
      tableModalInfo.value = getModalInfo();
      nextTick(() => {
        tableModalRef.value.openModal();
        tableModalRef.value.setTitle('新增');
      });
      return;
    }
    tableModalInfo.value = getModalInfo();
    rowInfo.value = record;
    tableModalRef.value.openModal();
    tableModalRef.value.setTitle('编辑');
    nextTick(() => {
      tableModalRef.value.setFieldsValue(record);
    });
  }

  function openDeleteModal(record: Recordable) {
    rowInfo.value = record;
    tableModalDeleteRef.value.openModal();
  }

  function getFormRef() {
    return formRef?.value;
  }

  function getTableRef() {
    return tableRef?.value;
  }

  defineExpose({
    openDrawer,
    openModal,
    openDeleteModal,
    getFormRef,
    getTableRef,
  });
</script>
<style lang="less" scoped></style>
