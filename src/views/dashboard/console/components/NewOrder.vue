<template>
  <n-data-table
    :columns="columns"
    :data="data"
    :pagination="false"
    :bordered="false"
    class="mt-4 mb-1 pb-1.5"
  />
</template>

<script lang="ts" setup>
  import { h, ref } from 'vue';
  import { NAvatar, NProgress, NBadge, NTag } from 'naive-ui';
  import { TableImg } from '@/components/TableImg';

  function toFixedPrice(value) {
    return parseFloat(value).toFixed(2);
  }

  const statusObj = {
    success: '已付款',
    error: '已取消',
    warning: '未付款',
    info: '已付款',
  };

  const columns = ref([
    {
      title: '序号',
      key: 'serial',
      render: (_, index) => {
        return `${index + 1}`;
      },
    },
    {
      title: '下单用户',
      key: 'userHead',
      render(row) {
        return h(NAvatar, {
          round: true,
          src: row.userHead,
          size: 48,
        });
      },
    },
    {
      title: '商品名称',
      key: 'product_name',
    },
    {
      title: '商品库存',
      key: 'stock',
      render(row) {
        return h(NProgress, {
          status: row.status,
          percentage: row.stock,
        });
      },
    },
    {
      title: '订单金额',
      key: 'order_price',
      render(row) {
        return h(
          'span',
          {
            class: 'font-bold',
          },
          { default: () => (row.order_price != null ? `￥${toFixedPrice(row.order_price)}` : '') },
        );
      },
    },
    {
      title: '商品图片',
      key: 'order_images',
      render(row) {
        return h(TableImg as any, {
          imgList: row.order_images,
          imageProps: {
            width: 48,
          },
        });
      },
    },
    {
      title: '付款状态',
      key: 'status',
      render(row) {
        return h(
          NBadge as any,
          {
            dot: true,
            type: row.status,
          },
          {
            default: () => statusObj[row.status],
          },
        );
      },
    },
    {
      title: '客户标签',
      key: 'tags',
      render(row) {
        return row.tags.map((item) => {
          return h(
            NTag as any,
            {
              type: row.status,
              class: 'mr-1',
            },
            {
              default: () => item,
            },
          );
        });
      },
    },
    {
      title: '购买日期',
      key: 'buy_date',
    },
  ]);

  const data = ref([
    {
      id: 1,
      userHead: 'https://img.naiveadmin.com/assets/avatar/avatar-6.jpg',
      product_name: 'Naive Admin',
      stock: 58,
      order_price: 298,
      order_images: [
        'https://img.naiveadmin.com/assets/avatar/avatar-1.jpg',
        'https://img.naiveadmin.com/assets/avatar/avatar-2.jpg',
      ],
      status: 'info',
      tags: ['老客户', '新客户'],
      buy_date: '2022-09-19',
    },
    {
      id: 2,
      userHead: 'https://img.naiveadmin.com/assets/avatar/avatar-4.jpg',
      product_name: 'Naive Admin',
      stock: 75,
      order_price: 298,
      order_images: [
        'https://img.naiveadmin.com/assets/avatar/avatar-3.jpg',
        'https://img.naiveadmin.com/assets/avatar/avatar-4.jpg',
      ],
      status: 'success',
      tags: ['老客户', '新客户'],
      buy_date: '2022-09-19',
    },
    {
      id: 3,
      userHead: 'https://img.naiveadmin.com/assets/avatar/avatar-1.jpg',
      product_name: 'Naive Admin',
      stock: 25,
      order_price: 298,
      order_images: [
        'https://img.naiveadmin.com/assets/avatar/avatar-5.jpg',
        'https://img.naiveadmin.com/assets/avatar/avatar-6.jpg',
      ],
      status: 'warning',
      tags: ['老客户', '新客户'],
      buy_date: '2022-09-19',
    },
    {
      id: 4,
      userHead: 'https://img.naiveadmin.com/assets/avatar/avatar-2.jpg',
      product_name: 'Naive Admin',
      stock: 30,
      order_price: 298,
      order_images: [
        'https://img.naiveadmin.com/assets/avatar/avatar-4.jpg',
        'https://img.naiveadmin.com/assets/avatar/avatar-3.jpg',
      ],
      status: 'error',
      tags: ['老客户', '新客户'],
      buy_date: '2022-09-19',
    },
    {
      id: 5,
      userHead: 'https://img.naiveadmin.com/assets/avatar/avatar-3.jpg',
      product_name: 'Naive Admin',
      stock: 38,
      order_price: 298,
      order_images: [
        'https://img.naiveadmin.com/assets/avatar/avatar-2.jpg',
        'https://img.naiveadmin.com/assets/avatar/avatar-1.jpg',
      ],
      status: 'error',
      tags: ['老客户', '新客户'],
      buy_date: '2022-09-19',
    },
  ]);
</script>
