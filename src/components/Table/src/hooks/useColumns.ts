import { ref, ComputedRef, unref, computed, watch, toRaw, h } from 'vue';
import type { BasicColumn, BasicTableProps } from '../types/table';
import { cloneDeep } from 'lodash-es';
import { isArray, isBoolean, isFunction } from '@/utils/is';
import { usePermission } from '@/hooks/web/usePermission';
import { ActionItem } from '@/components/Table';
import { renderEditCell } from '../components/editable';
import { NTooltip, NIcon } from 'naive-ui';
import { FormOutlined, QuestionCircleOutlined } from '@vicons/antd';

export function useColumns(propsRef: ComputedRef<BasicTableProps>) {
  const columnsRef = ref(unref(propsRef).columns);
  let cacheColumns = unref(propsRef).columns;

  const getColumnsRef = computed(() => {
    const columns = cloneDeep(unref(columnsRef));

    handleActionColumn(propsRef, columns);
    if (!columns) return [];
    return columns;
  });

  const { hasPermission } = usePermission();

  function isIfShow(action: ActionItem): boolean {
    const ifShow = action.ifShow;

    let isIfShow = true;

    if (isBoolean(ifShow)) {
      isIfShow = ifShow;
    }
    if (isFunction(ifShow)) {
      isIfShow = ifShow(action);
    }
    return isIfShow;
  }

  const renderTooltip = (trigger, content, helpMessageProps?) => {
    return h(
      NTooltip,
      { ...helpMessageProps },
      {
        trigger: () => trigger,
        default: () => content,
      },
    );
  };

  const tipIcon = (title, icon = FormOutlined) => {
    return h('span', {}, [
      h('span', { style: { 'margin-right': '5px' } }, title),
      h(
        NIcon,
        {
          size: 14,
        },
        {
          default: () => h(icon),
        },
      ),
    ]);
  };

  const getPageColumns = computed(() => {
    const pageColumns = unref(getColumnsRef);
    const columns = cloneDeep(pageColumns);
    return columns
      .filter((column) => {
        return hasPermission(column.auth as string[]) && isIfShow(column as any);
      })
      .map((column) => {
        //默认 ellipsis 为true
        column.ellipsis = typeof column.ellipsis === 'undefined' ? { tooltip: true } : false;
        const { edit, title, helpMessage, helpMessageProps } = column;
        // 支持 helpMessage
        if (helpMessage) {
          column.title = () => {
            return renderTooltip(
              tipIcon(title, QuestionCircleOutlined),
              helpMessage,
              helpMessageProps,
            );
          };
        }
        if (edit) {
          column.render = renderEditCell(column);
          if (edit) {
            const title: any = column.title;
            column.title = () => {
              return renderTooltip(tipIcon(title), '该列可编辑');
            };
          }
        }
        return column;
      });
  });

  watch(
    () => unref(propsRef).columns,
    (columns) => {
      columnsRef.value = columns;
      cacheColumns = columns;
    },
  );

  function handleActionColumn(propsRef: ComputedRef<BasicTableProps>, columns: BasicColumn[]) {
    const { actionColumn } = unref(propsRef);
    if (!actionColumn) return;
    const hasIndex = columns.findIndex((item) => item.key === 'action');
    if (hasIndex === -1) {
      columns.push({
        ...(actionColumn as any),
      });
    }
  }

  //设置
  function setColumns(columnList: string[]) {
    const columns: any[] = cloneDeep(columnList);
    if (!isArray(columns)) return;

    if (!columns.length) {
      columnsRef.value = [];
      return;
    }
    columnsRef.value = columns as BasicColumn[];
  }

  //获取
  function getColumns(): BasicColumn[] {
    const columns = toRaw(unref(getColumnsRef));
    return columns;
  }

  //获取原始
  function getCacheColumns(isKey?: boolean): any[] {
    return isKey ? cacheColumns.map((item) => item.key) : cacheColumns;
  }

  //更新原始数据单个字段
  function setCacheColumnsField(key: string | undefined, value: Partial<BasicColumn>) {
    if (!key || !value) {
      return;
    }
    cacheColumns.forEach((item) => {
      if (item.key === key) {
        Object.assign(item, value);
        return;
      }
    });
  }

  return {
    getColumnsRef,
    getCacheColumns,
    setCacheColumnsField,
    setColumns,
    getColumns,
    getPageColumns,
  };
}
