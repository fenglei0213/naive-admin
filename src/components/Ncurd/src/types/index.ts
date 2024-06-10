import type { DataTableColumns, DataTableProps, FormRules } from 'naive-ui';

export type ComponentType =
  | 'NInput'
  | 'NInputNumber'
  | 'NSelect'
  | 'NTreeSelect'
  | 'NRadio'
  | 'NRadioGroup'
  | 'NCheckbox'
  | 'NAutoComplete'
  | 'NCascader'
  | 'NDatePicker'
  | 'NTimePicker'
  | 'NSwitch'
  | 'NUpload'
  | 'NSlider'
  | 'NRate'
  | 'BasicSelect';

export interface FormTypeComponent {
  name: ComponentType;
}

export interface FormType {
  component: FormTypeComponent;
  formItem: FormRules[];
}

export interface BasicColumns extends DataTableColumns {
  form: FormType;
}

export interface NCurdProps extends DataTableProps {
  componentName?: String;
  form?: FormType;
  // columns: DataTableColumns<any>[];
  requestData: Function;
  dataSource: [];
}
