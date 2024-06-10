<template>
  <PageWrapper>
    <n-card :bordered="false" title="麦芽口腔医院">
      <n-divider title-placement="left" class="divider"> 基本信息 </n-divider>
      <n-descriptions label-placement="left" :column="4">
        <n-descriptions-item label="医院名称" label-style="font-weight:600"
          >麦芽口腔医院</n-descriptions-item
        >
        <n-descriptions-item label-style="font-weight:600" label="医院编码">
          M08659652
        </n-descriptions-item>
        <n-descriptions-item label-style="font-weight:600" label="医院规模">
          连锁
        </n-descriptions-item>
        <n-descriptions-item label-style="font-weight:600" label="医院类型">
          自营
        </n-descriptions-item>
        <n-descriptions-item label-style="font-weight:600" label="省份">
          广东省
        </n-descriptions-item>
        <n-descriptions-item label-style="font-weight:600" label="城市">
          深圳市
        </n-descriptions-item>
        <n-descriptions-item label-style="font-weight:600" label="区域">
          南山区
        </n-descriptions-item>
        <n-descriptions-item label-style="font-weight:600" label="详细地址">
          腾讯科技大厦
        </n-descriptions-item>
        <n-descriptions-item label-style="font-weight:600" label="合同签定人">
          张三
        </n-descriptions-item>
        <n-descriptions-item label-style="font-weight:600" label="联系电话">
          400-88888888
        </n-descriptions-item>
        <n-descriptions-item label-style="font-weight:600" label="签约时间">
          2022-09-25
        </n-descriptions-item>
        <n-descriptions-item label-style="font-weight:600" label="到期时间">
          2023-09-25
        </n-descriptions-item>
      </n-descriptions>
      <n-divider title-placement="left"> 对账信息 </n-divider>
      <n-descriptions label-placement="left" :column="4">
        <n-descriptions-item label-style="font-weight:600" label="对账人">李四</n-descriptions-item>
        <n-descriptions-item label-style="font-weight:600" label="联系电话">
          1898888888
        </n-descriptions-item>
        <n-descriptions-item label-style="font-weight:600" label="QQ">
          28888888
        </n-descriptions-item>
        <n-descriptions-item label-style="font-weight:600" label="微信">
          vx123456
        </n-descriptions-item>
        <n-descriptions-item label-style="font-weight:600" label="邮箱">
          youxiang@qq.com
        </n-descriptions-item>
        <n-descriptions-item label-style="font-weight:600" label="月结方式">
          80天
        </n-descriptions-item>
        <n-descriptions-item label-style="font-weight:600" label="折扣类型">
          销售方案
        </n-descriptions-item>
        <n-descriptions-item label-style="font-weight:600" label="开户银行">
          招商银行
        </n-descriptions-item>
        <n-descriptions-item label-style="font-weight:600" label="银行账号">
          28656654654654
        </n-descriptions-item>
        <n-descriptions-item label-style="font-weight:600" label="注册电话">
          400-88888888
        </n-descriptions-item>
        <n-descriptions-item label-style="font-weight:600" label="注册地址">
          腾讯科技大厦
        </n-descriptions-item>
      </n-descriptions>
      <n-divider title-placement="left"> 收货地址 </n-divider>
      <n-data-table :columns="columns" :data="tableList" :pagination="false" :bordered="false" />
    </n-card>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { ref, h } from 'vue';
  import { NButton } from 'naive-ui';

  const columns = ref([
    { title: '收货人', key: 'consignee' },
    { title: '省/直辖市', key: 'province' },
    { title: '市/直辖市', key: 'city' },
    { title: '区', key: 'dist' },
    { title: '详细地址', key: 'address' },
    { title: '手机号', key: 'mobile' },
    { title: '电话', key: 'phone' },
    { title: '备注', key: 'memo' },
    {
      title: '操作',
      key: 'handel',
      width: 150,
      align: 'center',
      render() {
        return [
          h(
            NButton,
            {
              size: 'small',
              style: 'margin-right: 5px;',
              type: 'info',
            },
            { default: () => '编辑' },
          ),
          h(
            NButton,
            {
              size: 'small',
              type: 'error',
            },
            { default: () => '删除' },
          ),
        ];
      },
    },
  ]);

  const tableList = ref([
    {
      consignee: '李四',
      province: '广东省',
      city: '深圳市',
      dist: '南山区',
      address: '腾讯科技大厦',
      mobile: '18988888888',
      phone: '400-89888888',
      memo: '备注',
    },
    {
      consignee: '李四',
      province: '广东省',
      city: '深圳市',
      dist: '南山区',
      address: '腾讯科技大厦',
      mobile: '18988888888',
      phone: '400-89888888',
      memo: '备注',
    },
    {
      consignee: '李四',
      province: '广东省',
      city: '深圳市',
      dist: '南山区',
      address: '腾讯科技大厦',
      mobile: '18988888888',
      phone: '400-89888888',
      memo: '备注',
    },
    {
      consignee: '李四',
      province: '广东省',
      city: '深圳市',
      dist: '南山区',
      address: '腾讯科技大厦',
      mobile: '18988888888',
      phone: '400-89888888',
      memo: '备注',
    },
  ]);
</script>

<style lang="less" scoped>
  :deep(.divider) {
    margin-top: 10px;
  }
</style>
