<template>
  <n-dropdown trigger="hover" :options="getOptions" placement="top" width="trigger">
    <n-el tag="div" class="user-control">
      <div class="user-control-left">
        <n-avatar round size="large" :src="schoolboy" />
      </div>
      <div class="user-control-middle" v-show="!getCollapsedNav">
        <div class="title">小马哥</div>
        <div class="describe">ID：36895</div>
      </div>
      <div class="user-control-right" v-show="!getCollapsedNav">
        <n-icon size="10">
          <CaretUpFilled />
        </n-icon>
        <n-icon size="10">
          <CaretDownOutlined />
        </n-icon>
      </div>
    </n-el>
  </n-dropdown>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { CaretUpFilled, CaretDownOutlined } from '@vicons/antd';
  import schoolboy from '@/assets/images/schoolboy.png';
  import { renderIcon } from '@/utils';
  import { LogoutOutlined, UserSwitchOutlined } from '@vicons/antd';
  import { useProjectSetting } from '@/hooks/setting/useProjectSetting';

  const { getCollapsedNav } = useProjectSetting();

  const getOptions = computed(() => {
    return [
      {
        label: getCollapsedNav.value ? '我的' : '我的中心',
        key: 'user',
        icon: renderIcon(UserSwitchOutlined),
      },
      {
        label: getCollapsedNav.value ? '退出' : '退出登录',
        key: 'logout',
        icon: renderIcon(LogoutOutlined),
      },
    ];
  });
</script>

<style lang="less" scoped>
  .user-control {
    width: 80%;
    margin: 0 auto;
    //background: #011d3a;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    border-radius: 3px;

    &:hover {
      cursor: pointer;
    }

    &-left {
      display: flex;
      align-items: center;
    }

    &-middle {
      flex: 1;
      padding-left: 10px;
      transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1), border 0.3s cubic-bezier(0.4, 0, 0.2, 1),
        background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);

      .title {
        max-width: 70px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        //color: var(--card-color);
      }

      .describe {
        color: var(--text-color-3);
        font-size: 12px;
      }
    }

    &-right {
      padding: 0 8px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1), border 0.3s cubic-bezier(0.4, 0, 0.2, 1),
        background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);

      .n-icon {
        color: #999;
      }
    }
  }
</style>
