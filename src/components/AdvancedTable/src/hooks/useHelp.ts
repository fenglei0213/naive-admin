export function useHelp(columns) {
  //组装查看抽屉数据
  function getDrawerInfo(row) {
    if (!columns) return [];
    const arr: any = [];
    columns.forEach((item) => {
      if (Reflect.has(row, item.key)) {
        arr.push({
          key: item.key,
          label: item.title,
          value: row[item.key],
          render: item.render || null,
          [item.key]: row[item.key],
        });
      }
    });
    return arr;
  }

  //组装编辑弹窗数据
  function getModalInfo() {
    const arr: any = [];
    columns.forEach((item) => {
      if (item.form && item.form.isEditShow != false) {
        arr.push({
          field: item.key,
          label: item.title,
          component: item.form.component,
          componentProps: item.form.componentProps,
          rules: item.form.rules,
        });
      }
    });
    return arr;
  }

  return {
    getDrawerInfo,
    getModalInfo,
  };
}
