<template>
  <div>
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="右键菜单"> 右键菜单示例，指定元素右键显示操作菜单 </n-card>
    </div>
    <n-card :bordered="false" class="mt-3 proCard">
      <n-alert :show-icon="false" title="右键展示菜单" type="info">
        <n-button class="mt-2" type="primary" @contextmenu="handleContextMenu">右键试试</n-button>
      </n-alert>

      <n-alert :show-icon="false" title="头像组件右键展示菜单" type="info" class="mt-3">
        <n-avatar
          :size="80"
          src="https://naive-ui-admin-docs.vercel.app/logo.png"
          @contextmenu="handleContextMenu"
        />
      </n-alert>

      <n-dropdown
        placement="bottom-start"
        @select="handleSelect"
        trigger="manual"
        :x="xRef"
        :y="yRef"
        :options="options"
        :show="showDropdownRef"
        :on-clickoutside="onClickoutside"
      />
    </n-card>
  </div>
</template>

<script lang="ts" setup>
  import { ref, nextTick } from 'vue';
  import { useMessage } from 'naive-ui';
  import {
    MailOutlined,
    AndroidOutlined,
    EllipsisOutlined,
    QqOutlined,
    WechatOutlined,
  } from '@vicons/antd';
  import { renderIcon } from '@/utils';
  const options = [
    {
      label: '发送到邮箱',
      key: 'email',
      icon: renderIcon(MailOutlined),
    },
    {
      label: '发送到手机',
      key: 'mobile',
      icon: renderIcon(AndroidOutlined),
    },
    {
      label: '其他',
      key: 'others',
      icon: renderIcon(EllipsisOutlined),
      children: [
        {
          label: 'QQ',
          key: 'qq',
          icon: renderIcon(QqOutlined),
        },
        {
          label: '微信',
          key: 'weixin',
          icon: renderIcon(WechatOutlined),
        },
      ],
    },
  ];
  const showDropdownRef = ref(false);
  const message = useMessage();
  const xRef = ref(0);
  const yRef = ref(0);

  function handleSelect(key) {
    showDropdownRef.value = false;
    message.info(`${key}-这个是你点击的菜单吧？`);
  }

  function handleContextMenu(e) {
    e.preventDefault();
    showDropdownRef.value = false;
    nextTick().then(() => {
      showDropdownRef.value = true;
      xRef.value = e.clientX;
      yRef.value = e.clientY;
    });
  }

  function onClickoutside() {
    message.info('您点击了外部区域，菜单不见了哈！');
    showDropdownRef.value = false;
  }
</script>
