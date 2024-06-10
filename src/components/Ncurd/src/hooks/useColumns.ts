import { ComputedRef, Ref, computed, ref, unref } from 'vue';
import { BasicColumns, NCurdProps } from '../types';
import { cloneDeep } from 'lodash-es';

export function useColumns(propsRef: ComputedRef<NCurdProps>) {
  const columnsRef = ref(unref(propsRef.value.columns)) as unknown as Ref<BasicColumns[]>;

  const getColumnsRef = computed(() => {
    const columns = cloneDeep(unref(columnsRef));
    return columns;
  });

  return {
    getColumnsRef,
  };
}
