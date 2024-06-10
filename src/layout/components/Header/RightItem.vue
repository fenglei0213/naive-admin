<template>
  <div class="right-item">
    <!-- 搜索 -->
    <n-button
      strong
      circle
      secondary
      type="tertiary"
      v-for="item in iconList"
      :key="item.icon.name"
      v-on="item.eventObject || {}"
      class="right-item-trigger"
    >
      <template #icon>
        <n-tooltip placement="bottom">
          <template #trigger>
            <n-icon size="18">
              <component :is="item.icon" />
            </n-icon>
          </template>
          <span>{{ item.tips }}</span>
        </n-tooltip>
      </template>
    </n-button>

    <!--语言-->
    <n-button strong circle secondary type="tertiary" class="right-item-trigger" v-if="getIsI18n">
      <template #icon>
        <n-dropdown :options="localeList" trigger="click" @select="languageSelect">
          <n-tooltip placement="bottom">
            <template #trigger>
              <span>
                <n-icon size="18">
                  <LanguageOutline />
                </n-icon>
              </span>
            </template>
            <span>{{ t('common.languageText') }}</span>
          </n-tooltip>
        </n-dropdown>
      </template>
    </n-button>

    <!--切换全屏-->
    <n-button strong circle secondary type="tertiary" class="right-item-trigger">
      <template #icon>
        <n-tooltip placement="bottom">
          <template #trigger>
            <span @click="toggleFullScreen">
              <n-icon size="18" v-if="isFullscreen">
                <FullscreenExitOutlined />
              </n-icon>
              <n-icon size="18" v-else>
                <FullscreenOutlined />
              </n-icon>
            </span>
          </template>
          <span>{{ isFullscreen ? t('common.restoreText') : t('common.fullScreenText') }}</span>
        </n-tooltip>
      </template>
    </n-button>

    <!--深色主题切换-->
    <div class="flex items-center right-item-trigger">
      <CutDark />
    </div>

    <!--消息-->
    <n-button strong circle secondary type="tertiary" class="right-item-trigger">
      <template #icon>
        <NotifierProPlus />
      </template>
    </n-button>

    <!--黑暗模式-->
    <!-- <n-button
      strong
      circle
      secondary
      type="tertiary"
      class="right-item-trigger"
      @click="toggleDarkTheme"
    >
      <template #icon>
        <n-tooltip placement="bottom">
          <template #trigger>
            <SunnySharp v-if="getDarkTheme" />
            <Moon v-else />
          </template>
          <span>{{ getDarkTheme ? t('common.switchLightText') : t('common.switchDarkText') }}</span>
        </n-tooltip>
      </template>
    </n-button> -->

    <!-- 系统配置 -->
    <!-- <n-button
      strong
      circle
      secondary
      type="tertiary"
      class="right-item-trigger"
      @click="openSetting"
    >
      <template #icon>
        <n-tooltip placement="bottom-end">
          <template #trigger>
            <n-icon size="18" style="font-weight: bold">
              <SettingOutlined />
            </n-icon>
          </template>
          <span>{{ t('common.systemConfigText') }}</span>
        </n-tooltip>
      </template>
    </n-button> -->

    <div class="right-item-trigger right-item-divider">
      <n-divider vertical />
    </div>
    <!-- 个人中心 -->
    <div class="right-item-trigger">
      <n-dropdown :options="avatarOptions" trigger="hover" @select="avatarSelect">
        <div class="shadow-lg avatar">
          <n-avatar round :src="schoolboy" />
        </div>
      </n-dropdown>
    </div>

    <!--项目配置-->
    <ProjectSetting ref="drawerSetting" />

    <!-- 搜索 -->
    <AppSearch ref="appSearchRef" />

    <!--修改密码-->
    <AmendPwd ref="amendPwdRef" />
  </div>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useDialog, useMessage } from 'naive-ui';
  import { TABS_ROUTES } from '@/enums/common';
  import { useUserStore } from '@/store/modules/user';
  import { AppSearch } from '@/components/Application/index';
  import { renderIcon } from '@/utils';
  import ProjectSetting from './ProjectSetting.vue';
  import NotifierProPlus from './NotifierProPlus.vue';
  import AmendPwd from './AmendPwd.vue';
  import CutDark from '../CutDark/index.vue';
  import {
    LogoutOutlined,
    SearchOutlined,
    UserSwitchOutlined,
    FullscreenExitOutlined,
    FullscreenOutlined,
  } from '@vicons/antd';
  import { LockClosedOutline, LanguageOutline } from '@vicons/ionicons5';
  import { PageEnum } from '@/enums/pageEnum';
  import schoolboy from '@/assets/images/schoolboy.png';
  import { useFullscreen } from '@vueuse/core';
  import { useAsyncRouteStore } from '@/store/modules/asyncRoute';

  import { useI18n } from '@/hooks/web/useI18n';
  import { useLocale } from '@/locales/useLocale';
  import { LocaleType } from '/#/config';
  import { localeList } from '@/settings/localeSetting';
  import { useProjectSetting } from '@/hooks/setting/useProjectSetting';
  import { resetStore } from '@/store/index';
  import { resetRouter } from '@/router';

  const { t } = useI18n();
  const { changeLocale } = useLocale();
  const { getIsI18n } = useProjectSetting();

  defineEmits(['update:collapsed']);

  const userStore = useUserStore();
  const message = useMessage();
  const dialog = useDialog();
  const appSearchRef = ref();
  const isRefresh = ref(false);

  defineProps({
    inverted: {
      type: Boolean,
    },
  });

  const BASE_LOGIN_NAME = PageEnum.BASE_LOGIN_NAME;

  const drawerSetting = ref();

  const amendPwdRef = ref();

  const router = useRouter();
  const route = useRoute();
  const { isFullscreen, toggle } = useFullscreen();
  const asyncRouteStore = useAsyncRouteStore();

  // console.log(languageStore.getLocale);

  watch(
    () => route.fullPath,
    (to) => {
      isRefresh.value = to.indexOf('/redirect/') != -1;
    },
    { immediate: true },
  );

  // 退出登录
  const doLogout = () => {
    dialog.info({
      title: t('common.tipsText'),
      content: t('common.logoutTip'),
      positiveText: t('common.okText'),
      negativeText: t('common.closeText'),
      onPositiveClick: () => {
        userStore.logout().then(() => {
          message.success(t('common.logoutSuccess'));
          // 移除标签页
          localStorage.removeItem(TABS_ROUTES);
          asyncRouteStore.setDynamicAddedRoute(false);
          // 重置 Store
          resetStore();
          //重置 Router
          resetRouter();
          router.replace({
            name: BASE_LOGIN_NAME,
            query: {
              redirect: route.fullPath,
            },
          });
        });
      },
      onNegativeClick: () => {},
    });
  };

  // 全屏切换
  const toggleFullScreen = () => {
    toggle();
  };

  // 图标列表
  const iconList = [
    {
      icon: SearchOutlined,
      tips: t('common.searchText'),
      eventObject: {
        click: () => openAppSearch(),
      },
    },
  ];

  const avatarOptions = [
    {
      label: t('common.userSetting'),
      key: 1,
      icon: renderIcon(UserSwitchOutlined),
    },
    {
      label: t('common.editPassword'),
      key: 3,
      icon: renderIcon(LockClosedOutline),
    },
    {
      label: t('common.logout'),
      key: 2,
      icon: renderIcon(LogoutOutlined),
    },
  ];

  //头像下拉菜单
  const avatarSelect = (key) => {
    switch (key) {
      case 1:
        router.push({ name: 'Setting' });
        break;
      case 2:
        doLogout();
        break;
      case 3:
        amendPwdRef.value.showModal();
        break;
    }
  };

  // 语言切换
  async function languageSelect(key: LocaleType) {
    await changeLocale(key);
    location.reload();
  }

  function openAppSearch() {
    appSearchRef.value && appSearchRef.value.show();
  }
</script>
<style lang="less" scoped>
  .right-item {
    display: flex;
    height: 68px;
    align-items: center;
    padding-right: 20px;

    &-trigger {
      margin: -5px 8px 0;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      // background-color: rgba(46, 51, 56, 0.05);
      // border-radius: 50%;
    }

    &-divider {
      margin: 0;
    }
  }

  .avatar {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    display: flex;
  }
</style>
