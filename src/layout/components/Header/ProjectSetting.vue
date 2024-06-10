<template>
  <n-drawer v-model:show="isDrawer" placement="right" :default-width="width" resizable>
    <n-drawer-content :title="title" :native-scrollbar="false" closable>
      <div class="drawer">
        <!-- <div class="justify-center drawer-setting-item dark-switch">
          <n-button-group v-model:value="designStore.darkTheme" name="darkThemeGroup">
            <n-button
              :type="designStore.darkTheme ? 'default' : 'primary'"
              round
              @click="designStore.darkTheme = false"
            >
              <template #icon>
                <n-icon><SunnySharp color="#ffd93b" /></n-icon>
              </template>
              浅色
            </n-button>
            <n-button
              :type="designStore.darkTheme ? 'primary' : 'default'"
              round
              @click="designStore.darkTheme = true"
            >
              <template #icon>
                <n-icon color="#000" size="14">
                  <Moon />
                </n-icon>
              </template>
              深色
            </n-button>
          </n-button-group>
        </div> -->

        <n-text depth="3" class="block mt-3 mb-6 text-base">自定义主题</n-text>
        <div class="drawer-setting-item align-items-top">
          <n-color-picker
            class="color-picker-item"
            :swatches="appThemeList"
            :default-value="designStore.appTheme"
            :actions="['confirm']"
            @confirm="colorPickerComplete"
          />
        </div>

        <n-text depth="3" class="block mt-6 mb-6 text-base">导航模式</n-text>

        <div class="drawer-setting-item align-items-top">
          <n-space>
            <n-card
              content-style="padding: 5px;"
              class="nav-mode"
              :class="{ 'nav-mode-on': settingStore.navMode === 'vertical' }"
              @click="togNavMode('vertical')"
            >
              <n-tooltip placement="top">
                <template #trigger>
                  <div class="flex nav-mode-space">
                    <n-el tag="div" class="nav-mode-left" />
                    <n-el tag="div" class="nav-mode-right" />
                  </div>
                </template>
                <span>左侧垂直菜单</span>
              </n-tooltip>
            </n-card>
            <n-card
              content-style="padding: 5px;"
              class="nav-mode"
              :class="{ 'nav-mode-on': settingStore.navMode === 'horizontal' }"
              @click="togNavMode('horizontal')"
            >
              <n-tooltip placement="top">
                <template #trigger>
                  <div class="flex flex-col nav-mode-space">
                    <n-el tag="div" class="nav-mode-top" />
                    <n-el tag="div" class="nav-mode-centre" />
                  </div>
                </template>
                <span>顶部菜单布局</span>
              </n-tooltip>
            </n-card>
            <n-card
              content-style="padding: 5px;"
              class="nav-mode"
              :class="{ 'nav-mode-on': settingStore.navMode === 'vertical-mix' }"
              @click="togNavMode('vertical-mix')"
            >
              <n-tooltip placement="top">
                <template #trigger>
                  <div class="flex flex-col nav-mode-space">
                    <n-el tag="div" class="nav-mode-top" />
                    <n-el tag="div" class="nav-mode-centre">
                      <n-el tag="div" class="nav-mode-left" />
                    </n-el>
                  </div>
                </template>
                <span>左侧垂直混合菜单</span>
              </n-tooltip>
            </n-card>
            <n-card
              content-style="padding: 5px;"
              class="nav-mode"
              :class="{ 'nav-mode-on': settingStore.navMode === 'vertical-sub' }"
              @click="togNavMode('vertical-sub')"
            >
              <n-tooltip placement="top">
                <template #trigger>
                  <div class="flex nav-mode-space">
                    <n-el tag="div" class="nav-mode-left" />
                    <n-el tag="div" class="nav-mode-left nav-mode-left-tow" />
                    <n-el tag="div" class="nav-mode-right" />
                  </div>
                </template>
                <span>左侧垂直分栏菜单</span>
              </n-tooltip>
            </n-card>
          </n-space>
        </div>

        <n-text depth="3" class="block mt-6 mb-6 text-base">导航风格</n-text>
        <div class="drawer-setting-item align-items-top">
          <n-radio-group v-model:value="settingStore.navTheme" name="navStyleGroup">
            <n-radio-button
              key="dark"
              value="dark"
              label="暗色侧边栏"
              :disabled="designStore.darkTheme"
            />
            <n-radio-button
              key="light"
              value="light"
              label="白色侧边栏"
              :disabled="designStore.darkTheme"
            />
            <n-radio-button
              key="header-dark"
              value="header-dark"
              label="暗色顶栏"
              :disabled="designStore.darkTheme"
            />
          </n-radio-group>
        </div>

        <n-text depth="3" class="block mt-6 mb-6 text-base">界面功能</n-text>

        <div class="drawer-setting-item">
          <div class="drawer-setting-item-title"> 折叠菜单</div>
          <div class="drawer-setting-item-action">
            <n-switch v-model:value="settingStore.collapsedNav" />
          </div>
        </div>

        <div class="drawer-setting-item">
          <div class="drawer-setting-item-title"> 固定顶栏</div>
          <div class="drawer-setting-item-action">
            <n-switch v-model:value="settingStore.fixedHeader" />
          </div>
        </div>

        <!-- 
        <div class="drawer-setting-item">
          <div class="drawer-setting-item-title"> 固定侧边栏 </div>
          <div class="drawer-setting-item-action">
            <n-switch v-model:value="settingStore.menuSetting.fixed" />
          </div>
        </div> -->

        <div class="drawer-setting-item">
          <div class="drawer-setting-item-title"> 菜单触发器</div>
          <div class="drawer-setting-item-action">
            <n-select
              v-model:value="settingStore.navTrigger"
              :options="navTriggerOptions"
              style="width: 100px"
            />
          </div>
        </div>

        <div class="drawer-setting-item">
          <div class="drawer-setting-item-title"> 内容区域宽度</div>
          <div class="drawer-setting-item-action">
            <n-select
              v-model:value="settingStore.contentType"
              :options="contentTypeOptions"
              style="width: 100px"
            />
          </div>
        </div>

        <div class="drawer-setting-item">
          <div class="drawer-setting-item-title"> 左侧菜单宽度</div>
          <div class="drawer-setting-item-action">
            <n-input-number v-model:value="settingStore.navWidth" style="width: 100px" />
          </div>
        </div>

        <div class="drawer-setting-item">
          <div class="drawer-setting-item-title"> 分栏主导航宽度</div>
          <div class="drawer-setting-item-action">
            <n-input-number
              :min="1"
              v-model:value="settingStore.partionNavWidth"
              style="width: 100px"
            />
          </div>
        </div>

        <div class="drawer-setting-item">
          <div class="drawer-setting-item-title"> 分栏子导航宽度</div>
          <div class="drawer-setting-item-action">
            <n-input-number
              :min="1"
              v-model:value="settingStore.partionSubNavWidth"
              style="width: 100px"
            />
          </div>
        </div>

        <div class="drawer-setting-item">
          <div class="drawer-setting-item-title"> 分栏子导航收起宽度</div>
          <div class="drawer-setting-item-action">
            <n-input-number
              :min="1"
              v-model:value="settingStore.partionSubNavMinWidth"
              style="width: 100px"
            />
          </div>
        </div>

        <!--        <div class="drawer-setting-item">-->
        <!--          <div class="drawer-setting-item-title"> 固定多页签</div>-->
        <!--          <div class="drawer-setting-item-action">-->
        <!--            <n-switch v-model:value="settingStore.multiTabsSetting.fixed" />-->
        <!--          </div>-->
        <!--        </div>-->

        <n-text depth="3" class="block mt-6 mb-6 text-base">界面显示</n-text>

        <div class="drawer-setting-item">
          <div class="drawer-setting-item-title"> 卡片圆角</div>
          <div class="drawer-setting-item-action">
            <n-input-number
              :min="0"
              v-model:value="settingStore.borderRadius"
              style="width: 100px"
            />
          </div>
        </div>

        <div class="drawer-setting-item">
          <div class="drawer-setting-item-title"> 显示重载页面按钮</div>
          <div class="drawer-setting-item-action">
            <n-switch v-model:value="settingStore.isReload" />
          </div>
        </div>

        <div class="drawer-setting-item">
          <div class="drawer-setting-item-title"> 显示面包屑导航</div>
          <div class="drawer-setting-item-action">
            <n-switch v-model:value="settingStore.isCrumbs" />
          </div>
        </div>

        <div class="drawer-setting-item">
          <div class="drawer-setting-item-title"> 显示面包屑显示图标</div>
          <div class="drawer-setting-item-action">
            <n-switch v-model:value="settingStore.isCrumbsIcon" />
          </div>
        </div>

        <div class="drawer-setting-item">
          <div class="drawer-setting-item-title"> 显示多页签</div>
          <div class="drawer-setting-item-action">
            <n-switch v-model:value="settingStore.isMultiTabs" />
          </div>
        </div>
        <!--1.15废弃，没啥用，占用操作空间-->
        <!--        <div class="drawer-setting-item">-->
        <!--          <div class="drawer-setting-item-title"> 显示页脚 </div>-->
        <!--          <div class="drawer-setting-item-action">-->
        <!--            <n-switch v-model:value="settingStore.showFooter" />-->
        <!--          </div>-->
        <!--        </div>-->

        <n-text depth="3" class="block mt-6 mb-6 text-base">页面动画</n-text>

        <div class="drawer-setting-item">
          <div class="drawer-setting-item-title"> 切换动画</div>
          <div class="drawer-setting-item-action">
            <n-switch v-model:value="settingStore.isPageAnimate" />
          </div>
        </div>

        <div class="drawer-setting-item">
          <div class="drawer-setting-item-title"> 动画类型</div>
          <div class="drawer-setting-item-select">
            <n-select v-model:value="settingStore.pageAnimateType" :options="animateOptions" />
          </div>
        </div>
      </div>
      <template #footer>
        <n-tooltip trigger="hover">
          <template #trigger>
            <n-button strong secondary type="info" @click="resetConfig">
              <template #icon>
                <n-icon :size="18">
                  <QuestionCircleOutlined />
                </n-icon>
              </template>
              重置配置
            </n-button>
          </template>
          清除缓存配置，重置到系统默认配置
        </n-tooltip>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useProjectSettingStore } from '@/store/modules/projectSetting';
  import { useDesignSettingStore } from '@/store/modules/designSetting';
  // import { Moon, SunnySharp } from '@vicons/ionicons5';
  import { animates as animateOptions } from '@/settings/animateSetting';
  import { appThemeList } from '@/settings/designSetting';
  import { QuestionCircleOutlined } from '@vicons/antd';
  import { storage } from '@/utils/Storage';

  const props = defineProps({
    title: {
      type: String,
      default: '系统配置',
    },
    width: {
      type: Number,
      default: 350,
    },
  });
  const settingStore = useProjectSettingStore();
  const designStore = useDesignSettingStore();
  const width = ref(props.width);
  const title = ref(props.title);
  const isDrawer = ref(false);

  const contentTypeOptions = [
    { value: 'fixed', label: '定宽' },
    { value: 'full', label: '流式' },
  ];

  const navTriggerOptions = [
    { value: 'all', label: '全部' },
    { value: 'right', label: '右侧' },
    { value: 'footer', label: '底部' },
  ];

  function colorPickerComplete(value) {
    designStore.appTheme = value;
  }

  function openDrawer() {
    isDrawer.value = true;
  }

  function closeDrawer() {
    isDrawer.value = false;
  }

  function resetConfig() {
    storage.remove('APP-PROJECT-SETTING');
    window.location.reload();
  }

  function togNavMode(mode) {
    settingStore.navMode = mode;
    settingStore.isMixMenu = ['vertical-sub', 'vertical-mix'].includes(mode) ? true : false;
  }

  defineExpose({
    openDrawer,
    closeDrawer,
  });
</script>

<style lang="less" scoped>
  .drawer {
    .n-divider:not(.n-divider--vertical) {
      margin: 10px 0;
    }

    &-setting-item {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      padding: 12px 0;
      flex-wrap: wrap;

      &-style {
        display: inline-block;
        position: relative;
        cursor: pointer;
        text-align: center;

        img {
          display: block;
        }
      }

      .cursor-not-allowed {
        cursor: not-allowed;
      }

      &-title {
        flex: 1 1;
        font-size: 14px;
      }

      &-action {
        flex: 0 0 auto;
      }

      &-select {
        flex: 1;
      }

      .theme-item {
        width: 20px;
        min-width: 20px;
        height: 20px;
        cursor: pointer;
        border: 1px solid #eee;
        border-radius: 2px;
        margin: 0 5px 5px 0;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;

        .n-icon {
          color: #fff;
        }
      }
    }

    .align-items-top {
      align-items: flex-start;
      padding: 2px 0;
    }

    .justify-center {
      justify-content: center;
    }

    .dark-switch .n-switch {
      :deep(.n-switch__rail) {
        background-color: #000e1c;
      }
    }

    .nav-mode {
      width: 66px;
      height: 54px;
      box-sizing: border-box;
      overflow: hidden;
      &:hover {
        cursor: pointer;
      }
      &-space {
        height: 100%;
      }
      &-left {
        width: 20px;
        height: 100%;
        background-color: #18181c;
        border-radius: 5px 0px 0px 5px;
      }
      &-left-tow {
        border-radius: 0;
        border-left: 1px solid #545454;
      }
      &-top {
        width: 100%;
        height: 13px;
        border-radius: 5px 5px 0px 0px;
        background-color: #18181c;
      }
      &-centre {
        width: 100%;
        height: calc(100% - 13px);
        background-color: var(--border-color);
        border-radius: 0 0 5px 5px;
        .nav-mode-left {
          border-radius: 0 0 0px 5px;
          width: 13px;
        }
      }
      &-right {
        width: 60px;
        height: 100%;
        background-color: var(--border-color);
        border-radius: 0px 5px 5px 0px;
      }
    }
    .nav-mode-on {
      border-color: var(--n-color-target);
      .nav-mode-right,
      .nav-mode-centre {
        background-color: var(--n-color-target);
        opacity: 0.3;
      }
      // .nav-mode-centre .nav-mode-left {
      //   background-color: var(--n-color-target);
      //   opacity: 0.3;
      // }
      // &::after {
      //   position: absolute;
      //   bottom: 4px;
      //   right: 5px;
      //   width: 6px;
      //   height: 12px;
      //   transform: rotate(45deg);
      //   border-right: 2px solid var(--n-color-target);
      //   border-bottom: 2px solid var(--n-color-target);
      //   content: '';
      // }
    }
  }

  .color-picker-item {
    width: 50%;
    margin: auto;

    :deep(.n-color-picker-trigger) {
      border-radius: 0.5rem;
    }
  }
</style>
