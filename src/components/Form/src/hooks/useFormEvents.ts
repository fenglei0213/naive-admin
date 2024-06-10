import type { ComputedRef, Ref } from 'vue';
import type { FormProps, FormSchema, FormActionType, FormGroupRow } from '../types/form';
import { unref, toRaw } from 'vue';
import { isDef, isFunction } from '@/utils/is';
import { Eval } from '@/utils';

declare type EmitType = (event: string, ...args: any[]) => void;

interface UseFormActionContext {
  emit: EmitType;
  getProps: ComputedRef<FormProps>;
  getSchema: ComputedRef<FormSchema[]>;
  getGroupSchemas: ComputedRef<FormGroupRow[]>;
  formModel: Recordable;
  formElRef: Ref<FormActionType>;
  defaultFormModel: Recordable;
  loading: Ref<boolean>;
  handleFormValues: Function;
}

export function useFormEvents({
  emit,
  getProps,
  formModel,
  getSchema,
  getGroupSchemas,
  formElRef,
  defaultFormModel,
  loading,
  handleFormValues,
}: UseFormActionContext) {
  // 验证
  async function validate(names?: string[]) {
    if (!names || !names.length) {
      return unref(formElRef).validate();
    }
    return unref(formElRef).validate(
      () => {},
      (rule) => names?.includes(rule?.key),
    );
  }

  // 提交
  async function handleSubmit(e?: Event): Promise<object | boolean> {
    e && e.preventDefault();
    setLoading(true);
    const { submitFunc } = unref(getProps);
    if (submitFunc && isFunction(submitFunc)) {
      await submitFunc();
      setLoading(false);
      return false;
    }
    const formEl = unref(formElRef);
    if (!formEl) return false;
    try {
      await validate();
      const values = getFieldsValue();
      setLoading(false);
      emit('submit', values);
      return values;
    } catch (error: any) {
      emit('submit', false);
      setLoading(false);
      console.error(error);
      return false;
    }
  }

  //清空校验
  async function clearValidate() {
    await unref(formElRef as any)?.restoreValidation();
  }

  //重置
  async function resetFields(): Promise<void> {
    const { resetFunc, submitOnReset } = unref(getProps);
    resetFunc && isFunction(resetFunc) && (await resetFunc());
    const formEl = unref(formElRef);
    if (!formEl) return;
    Object.keys(formModel).forEach((key) => {
      formModel[key] = unref(defaultFormModel)[key] || null;
    });
    await clearValidate();
    const fromValues = handleFormValues(toRaw(unref(formModel)));
    emit('reset', fromValues);
    submitOnReset && (await handleSubmit());
  }

  //获取表单值
  function getFieldsValue(): Recordable {
    const formEl = unref(formElRef);
    if (!formEl) return {};
    return handleFormValues(toRaw(unref(formModel)));
  }

  // 获取分组 schemas
  function filterGroupSchemas(groupSchemas: FormGroupRow[]) {
    return groupSchemas.flatMap((item) => item.columns);
  }

  //设置表单字段值
  function setFieldsValue(values: Recordable): void {
    const groupSchemas = filterGroupSchemas(unref(getGroupSchemas));
    const schemas = groupSchemas.length ? groupSchemas : unref(getSchema);
    const fields = schemas.map((item) => item.field).filter(Boolean);

    // 兼容 a.b.c 写法
    const decimal = '.';
    const decimalKeyList = fields.filter((item) => item.indexOf(decimal) >= 0);

    Object.keys(values).forEach((key) => {
      const value = values[key];
      const isKey = Reflect.has(values, key);
      if (isKey && fields.includes(key)) {
        formModel[key] = value;
      } else {
        decimalKeyList.forEach((itemKey: string) => {
          try {
            const value = Eval('values' + decimal + itemKey);
            if (isDef(value)) {
              formModel[itemKey] = value;
            }
          } catch (e) {
            console.error(e);
          }
        });
      }
    });
  }

  function setLoading(value: boolean): void {
    if (!value) {
      setTimeout(() => {
        loading.value = value;
      }, 500);
    } else {
      loading.value = value;
    }
  }

  return {
    handleSubmit,
    validate,
    resetFields,
    getFieldsValue,
    clearValidate,
    setFieldsValue,
    setLoading,
  };
}
