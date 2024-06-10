<script lang="tsx">
  import { defineComponent, ref, computed, unref, toRaw } from 'vue';

  import { NDataTable } from 'naive-ui';

  import { useColumns } from './hooks/useColumns';
  import { useDataSource } from './hooks/useDataSource';

  import { basicProps } from './props';
  import { NCurdProps } from './types';
  import { usePagination } from './hooks/usePagination';
  import { useLoading } from './hooks/useLoading';
  export default defineComponent({
    name: 'NCurd',
    props: basicProps,
    emits: ['change'],
    setup(props, { emit }) {
      const getProps = computed(() => {
        return props as unknown as NCurdProps;
      });
      const tableData = ref<Recordable[]>([]);
      const { getLoading, setLoading } = useLoading(getProps);
      const { getColumnsRef } = useColumns(getProps);
      const { getPaginationInfo, setPagination } = usePagination(getProps);

      const { getDataSourceRef } = useDataSource(
        getProps,
        {
          getPaginationInfo,
          setPagination,
          tableData,
          setLoading,
        },
        emit,
      );

      //组装表格信息
      const getBindValues = computed(() => {
        const tableData = unref(getDataSourceRef);
        return {
          ...unref(getProps),
          loading: unref(getLoading),
          columns: unref(getColumnsRef.value),
          data: tableData,
          remote: true,
        };
      });

      //获取分页信息
      const pagination = computed(() => toRaw(unref(getPaginationInfo)));

      return () => {
        return <NDataTable {...getBindValues.value} pagination={pagination}></NDataTable>;
      };
    },
  });
</script>
