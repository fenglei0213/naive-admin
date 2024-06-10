<template>
  <n-drawer
    v-model:show="isDrawer"
    :width="width"
    placement="right"
    :auto-focus="false"
    @after-leave="handleReset"
  >
    <n-drawer-content :title="title" closable>
      <n-form
        :model="formParams"
        :rules="rules"
        ref="formRef"
        label-placement="left"
        :label-width="80"
      >
        <n-form-item label="角色编码" path="roleCode">
          <n-input
            placeholder="请输入角色编码"
            v-model:value="formParams.roleCode"
            :disabled="formParams.roleId ? true : false"
          />
        </n-form-item>

        <n-form-item label="角色名称" path="roleName">
          <n-input placeholder="请输入角色名称" v-model:value="formParams.roleName" />
        </n-form-item>
        <n-form-item label="角色权限" path="permissionIds">
          <n-card>
            <n-space>
              <n-checkbox v-model:checked="isSpread" @update:checked="packHandle"
                >展开/收起</n-checkbox
              >
              <n-checkbox v-model:checked="isAll" @update:checked="handleCheckAll"
                >全选/全不选</n-checkbox
              >
            </n-space>
            <n-divider />
            <n-tree
              ref="treeRef"
              block-line
              cascade
              checkable
              :virtual-scroll="true"
              :data="(props.permissionList as TreeOption[])"
              :checked-keys="formParams.permissions"
              :expandedKeys="expandedKeys"
              style="max-height: 950px; overflow: hidden"
              @update:checked-keys="checkedTree"
              @update:indeterminate-keys="indeterminateChange"
              @update:expanded-keys="onExpandedKeys"
            />
          </n-card>
        </n-form-item>
        <n-form-item label="备注" path="remark">
          <n-input type="textarea" placeholder="请输入备注" v-model:value="formParams.remark" />
        </n-form-item>
      </n-form>

      <template #footer>
        <n-space>
          <n-button @click="handleReset">重置</n-button>
          <n-button type="primary" :loading="subLoading" @click="formSubmit">提交</n-button>
        </n-space>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { TreeOption, useMessage } from 'naive-ui';
  import type { formParamsType } from './types';

  const rules = {
    roleCode: {
      required: true,
      message: '角色编码不能为空',
      trigger: 'blur',
    },
    roleName: {
      required: true,
      message: '角色名称不能为空',
      trigger: 'blur',
    },
  };

  defineEmits(['change']);

  const props = defineProps({
    title: {
      type: String,
      default: '添加角色',
    },
    width: {
      type: Number,
      default: 450,
    },
    permissionList: {
      type: Array,
    },
  });

  const defaultValueRef = () => ({
    roleId: null,
    roleName: '',
    roleCode: '',
    remark: '',
    permissions: [],
    permissionKeys: [],
  });

  const message = useMessage();
  const checkedKeys = ref<number[]>([]);
  const formRef: any = ref(null);
  const isDrawer = ref(false);
  const subLoading = ref(false);
  const isSpread = ref(false);
  const isAll = ref(false);
  const treeRef = ref();
  const expandedKeys = ref();

  const formParams = ref<formParamsType>(defaultValueRef());

  function onExpandedKeys(keys) {
    expandedKeys.value = keys;
  }

  function packHandle(value) {
    if (!value) {
      expandedKeys.value = [];
    } else {
      expandedKeys.value = props?.permissionList?.map((item: any) => item.key as string) as [];
    }
  }

  function handleCheckAll(value) {
    if (!value) {
      formParams.value.permissions = [];
    } else {
      formParams.value.permissions = getAllIds(
        props?.permissionList as { key: number; children: [] }[],
      );
    }
  }

  function getAllIds(list: { key: number; children: [] }[] = [], ids: number[] = []) {
    for (let item of list) {
      !ids.includes(item.key) && ids.push(item.key);
      if (item.children && item.children.length) getAllIds(item.children, ids);
    }
    return ids;
  }

  function checkedTree(keys: number[]) {
    formParams.value.permissions = keys;
    checkedKeys.value = keys;
  }

  function indeterminateChange(keys: number[]) {
    formParams.value.permissionKeys = keys;
  }

  function openDrawer(roleId) {
    if (roleId) {
      formParams.value.roleId = roleId;
      // 凭角色id 获取角色信息
      getInfo();
      return;
    }
    isDrawer.value = true;
  }

  function getInfo() {
    // 拿到信息 赋值给表单
    // formParams.value = res;
    isDrawer.value = true;
  }

  function closeDrawer() {
    isDrawer.value = false;
  }

  function formSubmit() {
    formRef.value.validate((errors) => {
      if (!errors) {
        console.log(formParams.value);
        // TOOD 请自行对接接口
        message.success('操作成功');
        closeDrawer();
      } else {
        message.error('请填写完整信息');
      }
    });
  }

  function handleReset() {
    formRef.value.restoreValidation();
    formParams.value = Object.assign(formParams.value, defaultValueRef());
  }

  onMounted(() => {});

  defineExpose({
    openDrawer,
    closeDrawer,
  });
</script>
