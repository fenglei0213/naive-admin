<script lang="tsx">
  import { defineComponent, onMounted, computed, ref, h, watch } from 'vue';
  import { basicProps } from './props';
  import { NDataTable, NIcon } from 'naive-ui';
  import { cloneDeep } from 'lodash-es';
  import { CellComponent } from './components/CellComponent/index';
  import DeleteIncon from './components/DeleteIncon/DeleteIncon.vue';
  import { PlusOutlined, DeleteOutlined } from '@vicons/antd';
  import { getSlot } from '@/utils/helper/tsxHelper';
  import { BasicColumn } from './types/table';

  export default defineComponent({
    name: 'FormTable',
    props: basicProps,
    emits: ['on-add', 'on-remove'],
    setup(props, { emit, slots, expose }) {
      const tableData = ref<any[]>([]);
      const tableColumns = ref<any[]>([]);

      watch(
        () => props.columns,
        () => {
          createColumns();
        },
        {
          immediate: true,
          deep: true,
        },
      );

      const getColumns = computed(() => {
        return tableColumns.value.filter((item) => {
          return item.hidden !== true;
        });
      });

      function addForm() {
        tableData.value.push(cloneDeep(props.addTemplate));
        emit('on-add', tableData.value);
      }

      function deleteForm(index) {
        tableData.value.splice(index, 1);
        emit('on-remove', tableData.value);
      }

      function createColumns() {
        const newColumns: BasicColumn[] = cloneDeep(props.columns) as BasicColumn[];
        newColumns.forEach((item) => {
          if (item.component || item.slots) {
            item.render = item.slots ? createSlots(item) : createRender(item);
          }
        });
        newColumns.unshift({
          key: 'custom',
          width: 30,
          title() {
            return h(NIcon, {
              component: PlusOutlined,
              size: 20,
              class: 'cursor-pointer',
              onClick: addForm,
            });
          },
          render(_, index) {
            return props.isPopconfirm
              ? h(
                  DeleteIncon,
                  {
                    onPositiveClick: deleteForm.bind(null, index),
                    ...props.popconfirmProps,
                  },
                  {
                    trigger: () =>
                      h(NIcon, {
                        component: DeleteOutlined,
                        size: 20,
                        class: 'cursor-pointer',
                      }),
                    default: () => '您确定要删除吗？',
                  },
                )
              : h(NIcon, {
                  component: DeleteOutlined,
                  size: 20,
                  class: 'cursor-pointer',
                  onClick: deleteForm.bind(null, index),
                });
          },
        });
        tableColumns.value = newColumns;
      }

      const valueChange = (item, index) => {
        return (value) => {
          tableData.value[index][item.key] = value;
        };
      };

      function createSlots(item) {
        return (_, index) => {
          const rowData = tableData.value[index];
          return getSlot(slots, item.slots, { rowData, columnData: item, index });
        };
      }

      function createRender(item) {
        return (_, index) => {
          const newitem = cloneDeep(item);
          newitem.value = tableData.value[index][item.key] || null;
          newitem.onUpdateValue = valueChange(newitem, index);
          const CellParams = Object.assign(
            newitem,
            { component: newitem.component },
            item.componentProps,
          );
          return h(CellComponent, CellParams);
        };
      }

      function createData() {
        const itemTemplate = cloneDeep(props.addTemplate);
        tableData.value.push(itemTemplate);
      }

      function getTableData() {
        return tableData.value;
      }

      function setTableData(values) {
        tableData.value = values;
      }

      function resetTableData() {
        tableData.value = [cloneDeep(props.addTemplate)];
      }

      expose({ getTableData, setTableData, resetTableData });

      onMounted(() => {
        createColumns();
        createData();
      });

      return () => {
        return <NDataTable columns={getColumns.value} data={tableData.value}></NDataTable>;
      };
    },
  });
</script>
