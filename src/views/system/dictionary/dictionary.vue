<template>
  <div>
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="字典管理">
        可代替后台管理系统，设置的大量枚举值和配置，统一标准化管理，随时修改或增加
      </n-card>
    </div>
    <n-grid class="mt-3" cols="1 s:1 m:1 l:3 xl:3 2xl:3" responsive="screen" :x-gap="12">
      <n-gi span="1" class="mb-4">
        <n-card :segmented="{ content: true }" :bordered="false" size="small">
          <template #header>
            <n-space>
              <n-button type="primary" @click="addDictionary">新建</n-button>
              <n-button type="primary" @click="editDictionary" :disabled="!selectedKey"
                >编辑</n-button
              >
              <n-button type="error" @click="removeDictionary" :disabled="!selectedKey"
                >删除</n-button
              >
            </n-space>
          </template>
          <template #header-extra>
            <n-input type="text" v-model:value="pattern">
              <template #prefix>
                <n-icon>
                  <SearchOutlined />
                </n-icon>
              </template>
            </n-input>
          </template>
          <n-table :bordered="false" :single-line="false">
            <thead>
              <tr>
                <th width="60">ID</th>
                <th>字典名称</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>
                  <div class="w-full">
                    <div class="text-center" v-if="loading">
                      <n-spin size="medium" style="margin-left: auto" />
                    </div>
                    <n-tree
                      v-else
                      block-line
                      draggable
                      :data="treeData"
                      :pattern="pattern"
                      @update:selected-keys="selectedTree"
                      selectable
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </n-table>
        </n-card>
      </n-gi>
      <n-gi span="2">
        <n-card :bordered="false" class="mb-4 proCard">
          <BasicTable
            :columns="columns"
            :request="loadDataTable"
            :row-key="(row) => row.id"
            ref="tableRef"
            :actionColumn="actionColumn"
            @update:checked-row-keys="onCheckedRow"
            :scroll-x="1090"
          >
            <template #tableTitle>
              <n-space>
                <n-input type="text" v-model:value="params.keywords">
                  <template #prefix>
                    <n-icon>
                      <SearchOutlined />
                    </n-icon>
                  </template>
                </n-input>
                <n-button type="primary" @click="reloadTable"> 查询 </n-button>
                <n-button type="primary" :disabled="!selectedKey" @click="addDictionaryValue"
                  >新建</n-button
                >
                <n-button type="error" :disabled="!rowKeys.length" @click="removeDictionaryValues"
                  >删除</n-button
                >
              </n-space>
            </template>
          </BasicTable>
        </n-card>
      </n-gi>
    </n-grid>

    <basicModal
      @register="lightModalRegister"
      class="basicModalLight"
      ref="modalRef"
      @on-ok="removeOkModal"
    >
      <template #default>
        <p class="text-gray-600" style="padding-left: 35px"
          >您确认要删除，<n-text strong>{{ rowKeysName }} ?</n-text></p
        >
      </template>
    </basicModal>

    <CreateModal ref="createModalRef" :createType="createType" :isEdit="isEdit" />
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive, h, onMounted, nextTick, unref } from 'vue';
  import { SearchOutlined } from '@vicons/antd';
  import { BasicColumn, BasicTable, TableAction } from '@/components/Table';
  import { getDictionary, getDictionaryInfo } from '@/api/system/dictionary';
  import { basicModal, useModal } from '@/components/Modal';
  import CreateModal from './CreateModal.vue';
  import { columns } from './columns';
  import { getTreeItem } from '@/utils';
  import { useMessage } from 'naive-ui';

  const message = useMessage();
  const createModalRef = ref();
  const tableRef = ref();
  const loading = ref(true);
  const selectedKey = ref('');
  const treeData = ref<any[]>([]);
  const dictionaryValues = ref<any[]>([]);
  const rowKeys = ref<any[]>([]);
  const rowKeysName = ref('');
  const createType = ref(1);
  const isEdit = ref(false);
  const pattern = ref('');

  const params = ref({
    pageSize: 10,
    name: 'xiaoMa',
    keywords: '',
  });

  const actionColumn: BasicColumn = reactive({
    width: 150,
    title: '操作',
    key: 'action',
    fixed: 'right',
    render(record) {
      return h(TableAction as any, {
        style: 'text',
        actions: [
          {
            label: '删除',
            onClick: removeDictionaryValueOne.bind(null, record),
          },
          {
            label: '编辑',
            onClick: editDictionaryValue.bind(null, record),
          },
        ],
      });
    },
  });

  //左右共用删除确认
  const [
    lightModalRegister,
    { openModal: lightOpenModal, closeModal: lightCloseModal, setSubLoading: lightSetSubLoading },
  ] = useModal({
    title: '删除确认',
    showIcon: true,
    type: 'warning',
    closable: false,
    maskClosable: true,
    width: 380,
  });

  //新建字典
  function addDictionary() {
    createType.value = 1;
    createModalRef.value.setProps({ title: '添加字典' });
    createModalRef.value.openModal();
  }

  //新建字典项
  function addDictionaryValue() {
    createType.value = 2;
    createModalRef.value.setProps({ title: '添加字典项' });
    createModalRef.value.openModal();
  }

  //确认删除
  function removeOkModal() {
    lightCloseModal();
    lightSetSubLoading();
    message.error('抱歉，您没有操作权限');
  }

  //选择字典项
  function onCheckedRow(keys) {
    rowKeys.value = keys;
  }

  //刷新字典项值列表
  function reloadTable() {
    tableRef.value.reload();
  }

  //删除字典值
  function openRemoveModal() {
    lightOpenModal();
  }

  //加载字典项值列表
  const loadDataTable = async (res) => {
    const key = selectedKey.value.length ? selectedKey.value[0] : '';
    const result = await getDictionaryInfo({ ...params.value, key, ...res });
    dictionaryValues.value = result.list;
    return result;
  };

  //删除字典项
  function removeDictionaryValues() {
    //自行简化，仅为演示
    rowKeysName.value = dictionaryValues.value
      .filter((item) => {
        return rowKeys.value.includes(item.id as number);
      })
      .map((item) => {
        return item.label;
      })
      .join('，');
    openRemoveModal();
  }

  //删除单个字典项
  function removeDictionaryValueOne(record: Recordable) {
    console.log('点击了删除', record);
    rowKeysName.value = record.label;
    openRemoveModal();
  }

  //删除字典
  function removeDictionary() {
    //自行简化，仅为演示
    if (!selectedKey.value.length) return;
    const treeItem = getTreeItem(treeData.value, unref(selectedKey)[0]);
    rowKeysName.value = treeItem.label;
    openRemoveModal();
  }

  //左侧字典选择
  function selectedTree(key: string) {
    selectedKey.value = key.length ? key : '';
    rowKeysName.value = getLabelStr(treeData.value, key);
    reloadTable();
  }

  //组装label字符串
  function getLabelStr(data: any[], key: string): string {
    return data
      .filter((item) => {
        return key.includes(item.key);
      })
      .map((item) => {
        return item.label;
      })
      .join('，');
  }

  //编辑字典项
  function editDictionaryValue(record: Recordable) {
    console.log('点击了编辑', record);
    createModalRef.value.openModal();
    nextTick(() => {
      isEdit.value = true;
      createModalRef.value.setProps({ title: '编辑字典项' });
      createModalRef.value.setFieldsValue({
        ...unref(record),
      });
    });
  }

  //编辑字典
  function editDictionary() {
    if (!selectedKey.value.length) return;
    const treeItem = getTreeItem(treeData.value, unref(selectedKey)[0]);
    createModalRef.value.openModal();
    nextTick(() => {
      isEdit.value = true;
      createModalRef.value.setProps({ title: '编辑字典' });
      createModalRef.value.setFieldsValue({
        ...unref(treeItem),
      });
    });
  }

  //初始化数据
  async function init() {
    const res = await getDictionary();
    treeData.value = res;
    loading.value = false;
  }

  onMounted(() => {
    init();
  });
</script>
