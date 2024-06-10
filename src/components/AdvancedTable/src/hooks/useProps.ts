export function useProps(propsRef) {
  const getFormProps = propsRef.formProps;

  const getTableProps = propsRef.tableProps;

  return {
    getFormProps,
    getTableProps,
  };
}
