export function useModalEvents({ emit }) {
  // 添加
  function fetchAdd(values, callback) {
    emit('fetch-add', values, callback);
  }

  // 编辑
  function fetchEdit(values, callback) {
    emit('fetch-edit', values, callback);
  }

  // 删除
  function fetchDelete(values, callback) {
    emit('fetch-delete', values, callback);
  }

  return {
    fetchAdd,
    fetchEdit,
    fetchDelete,
  };
}
