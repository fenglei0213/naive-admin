<template>
  <n-list>
    <n-list-item v-for="item in listData" :key="item.id">
      <template #prefix>
        <n-avatar round :size="48" :src="item.src" />
      </template>
      <n-thing :title="item.name">
        <template #description>
          <div class="flex justify-between items-center w-full pb-2.9">
            <n-text depth="3" class="w-2/6">{{ item.description }}</n-text>
            <div class="flex items-center w-3/6">
              <n-progress
                type="line"
                :percentage="item.ratio"
                :indicator-placement="'inside'"
                processing
              />
              <div class="flex items-center w-16 ml-1 font-bold">
                <n-icon
                  :component="CaretUpFilled"
                  color="rgb(87, 202, 34)"
                  :size="12"
                  class="mr-1"
                />
                {{ item.ratio }}%
              </div>
            </div>
            <n-button round strong secondary type="info" size="small">查看</n-button>
          </div>
        </template>
      </n-thing>
    </n-list-item>
  </n-list>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { CaretUpFilled } from '@vicons/antd';

  const listData = ref([
    {
      id: 1,
      src: 'https://img.naiveadmin.com/assets/avatar/avatar-1.jpg',
      name: '小猪妹',
      description: '高级成本会计师',
      ratio: 35,
    },
    {
      id: 2,
      src: 'https://img.naiveadmin.com/assets/avatar/avatar-2.jpg',
      name: '妖姬妹',
      description: '药剂师',
      ratio: 45,
    },
    {
      id: 3,
      src: 'https://img.naiveadmin.com/assets/avatar/avatar-3.jpg',
      name: '爱斯',
      description: '高级成本会计师',
      ratio: 55,
    },
    {
      id: 4,
      src: 'https://img.naiveadmin.com/assets/avatar/avatar-4.jpg',
      name: '罗威娜',
      description: '药剂师',
      ratio: 65,
    },
    {
      id: 5,
      src: 'https://img.naiveadmin.com/assets/avatar/avatar-5.jpg',
      name: '小娜',
      description: '药剂师',
      ratio: 65,
    },
  ]);
</script>
