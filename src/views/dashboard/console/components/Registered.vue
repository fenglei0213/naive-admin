<template>
  <n-list hoverable clickable>
    <n-list-item v-for="item in data" :key="item.id">
      <template #prefix>
        <n-avatar :size="48" :src="item.userHead" />
      </template>
      <template #suffix>
        <n-tag type="success">￥{{ toFixedPrice(item.order_price) }}</n-tag>
      </template>
      <n-thing :title="item.name">
        <template #description>
          <n-text depth="3">IP归属地：{{ item.location }}</n-text>
        </template>
      </n-thing>
    </n-list-item>
  </n-list>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';

  function toFixedPrice(value) {
    return parseFloat(value).toFixed(2);
  }

  const data = ref([
    {
      id: 1,
      userHead: 'https://img.naiveadmin.com/assets/avatar/avatar-1.jpg',
      location: '北京市/东城区',
      name: 'Naive Admin',
      order_price: 69800,
      tags: ['老客户', '新客户'],
      buy_date: '2022-09-19',
    },
    {
      id: 2,
      userHead: 'https://img.naiveadmin.com/assets/avatar/avatar-2.jpg',
      location: '上海市/黄浦区',
      name: 'Naive Admin',
      stock: 75,
      order_price: 59800,
      order_images: [
        'https://img.naiveadmin.com/assets/logo.png',
        'https://img.naiveadmin.com/assets/logo.png',
      ],
      status: 'success',
      tags: ['老客户', '新客户'],
      buy_date: '2022-09-19',
    },
    {
      id: 3,
      userHead: 'https://img.naiveadmin.com/assets/avatar/avatar-3.jpg',
      location: '浙江省/杭州市',
      name: 'Naive Admin',
      stock: 25,
      order_price: 49800,
      order_images: [
        'https://img.naiveadmin.com/assets/logo.png',
        'https://img.naiveadmin.com/assets/logo.png',
      ],
      status: 'warning',
      tags: ['老客户', '新客户'],
      buy_date: '2022-09-19',
    },
    {
      id: 4,
      userHead: 'https://img.naiveadmin.com/assets/avatar/avatar-4.jpg',
      name: 'Naive Admin',
      location: '江西省/萍乡市',
      stock: 30,
      order_price: 39800,
      order_images: [
        'https://img.naiveadmin.com/assets/logo.png',
        'https://img.naiveadmin.com/assets/logo.png',
      ],
      status: 'error',
      tags: ['老客户', '新客户'],
      buy_date: '2022-09-19',
    },
    {
      id: 5,
      userHead: 'https://img.naiveadmin.com/assets/avatar/avatar-5.jpg',
      name: 'Naive Admin',
      location: '广东省/深圳市',
      stock: 38,
      order_price: 29800,
      order_images: [
        'https://img.naiveadmin.com/assets/logo.png',
        'https://img.naiveadmin.com/assets/logo.png',
      ],
      status: 'error',
      tags: ['老客户', '新客户'],
      buy_date: '2022-09-19',
    },
    {
      id: 6,
      userHead: 'https://img.naiveadmin.com/assets/avatar/avatar-6.jpg',
      location: '湖南省/衡阳市',
      name: 'Naive Admin',
      stock: 38,
      order_price: 19800,
      order_images: [
        'https://img.naiveadmin.com/assets/logo.png',
        'https://img.naiveadmin.com/assets/logo.png',
      ],
      status: 'error',
      tags: ['老客户', '新客户'],
      buy_date: '2022-09-19',
    },
  ]);
</script>
