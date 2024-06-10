export function useTableEvents({ emit }) {
  function checkedRowKeys(rowKeys) {
    emit('update:checked-row-keys', rowKeys);
  }

  return {
    checkedRowKeys,
  };
}
