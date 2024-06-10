<template>
  <PageWrapper title="表单表格" content="主要用在承载批量提交表单集合" showFooter>
    <n-card :bordered="false" class="mt-3 proCard" title="基础使用" content-style="padding-top: 0;">
      <div class="pl-2 mb-6">
        <n-space>
          <span>隐藏年龄</span>
          <n-switch v-model:value="isShowAge" />
        </n-space>
      </div>
      <FormTable ref="formTableRef" :columns="columns" :addTemplate="addTemplate">
        <template #mobile="{ rowData }">
          <!-- <n-button @click="handelCustom(rowData, columnData, index)">自定义插槽</n-button> -->
          <n-input v-model:value="rowData.mobile" />
        </template>
      </FormTable>
      <div class="mt-6">
        <n-space>
          <n-button type="primary" @click="handelSave">保存</n-button>
        </n-space>
      </div>

      <div class="mt-6">
        <n-h4>表单数据</n-h4>
        <n-data-table :columns="columns2" :data="tableData" :pagination="false" :bordered="false" />
      </div>
    </n-card>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { ref, h } from 'vue';
  import { FormTable } from '@/components/FormTable/index';

  const tableData = ref([]);
  const isShowAge = ref(true);

  const columns = ref([
    {
      title: '姓名',
      key: 'name',
      component: 'NInput',
    },
    {
      title: '手机号码',
      key: 'mobile',
      component: 'NInput',
      slots: 'mobile',
    },
    {
      title: '性别',
      key: 'gender',
      width: 150,
      component: 'NSelect',
      componentProps: {
        placeholder: '请选择类型',
        options: [
          {
            label: '男',
            value: 1,
          },
          {
            label: '女',
            value: 2,
          },
        ],
      },
    },
    {
      title: '年龄',
      key: 'age',
      component: 'NInputNumber',
      hidden: isShowAge,
    },
    {
      key: 'makeDate',
      title: '预约时间',
      component: 'NDatePicker',
    },
    {
      key: 'firstMake',
      title: '首次预约',
      component: 'NSwitch',
    },
  ]);

  const columns2 = ref([
    {
      title: '姓名',
      key: 'name',
    },
    {
      title: '手机号码',
      key: 'mobile',
    },
    {
      title: '性别',
      key: 'gender',
      width: 150,
      render(row) {
        return h(
          'span',
          {},
          { default: () => (row.gender === 1 ? '男' : row.gender === 2 ? '女' : '') },
        );
      },
    },
    {
      title: '年龄',
      key: 'age',
    },
    {
      key: 'makeDate',
      title: '预约时间',
    },
    {
      key: 'firstMake',
      title: '首次预约',
      render(row) {
        return h('span', {}, { default: () => (row.firstMake ? '是' : '否') });
      },
    },
  ]);

  const addTemplate = {
    name: '',
    mobile: '',
    type: '',
    age: '',
    makeDate: '',
    firstMake: false,
  };

  const formTableRef = ref();

  function handelSave() {
    const formValues = formTableRef.value.getTableData();
    console.log('🚀 ~ file: formTableRef.VUE ~ line 117 ~ handelSave ~ formValues', formValues);
    tableData.value = formValues;
  }

  // function handelCustom(rowData, columnData, index) {
  //   console.log('🚀 ~ file: formTable.vue ~ line 143 ~ handelCustom ~ rowData', rowData);
  //   console.log('🚀 ~ file: formTable.vue ~ line 143 ~ handelCustom ~ columnData', columnData);
  //   console.log('🚀 ~ file: formTable.vue ~ line 143 ~ handelCustom ~ index', index);
  // }
</script>
