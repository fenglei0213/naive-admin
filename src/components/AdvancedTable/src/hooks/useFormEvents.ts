interface EventsIn {
  formRef: any;
  tableRef: any;
}

export function useFormEvents({ tableRef }: EventsIn) {
  // 查询
  function formSubmit(values) {
    tableRef.value.reload(values);
  }

  // 重置
  function formReset(values) {
    tableRef.value.reload(values);
  }

  // 展开 收起
  function redoHeight() {
    tableRef.value.redoHeight();
  }

  return {
    formSubmit,
    formReset,
    redoHeight,
  };
}
