<template>
  <n-popover
    v-if="badgeValue > 0"
    :style="{ paddingBottom: '0px' }"
    :show-arrow="false"
    placement="bottom-end"
    trigger="hover"
  >
    <template #trigger>
      <div class="badge-item">
        <n-icon size="18">
          <BellOutlined />
        </n-icon>
        <n-badge :value="badgeValue" dot class="news-badge" />
      </div>
    </template>
    <n-tabs class="news-table" type="line">
      <n-tab-pane name="oasis" tab="通知（1）">
        <n-list>
          <n-list-item>
            <template #prefix>
              <n-avatar
                :style="{
                  color: '#fff',
                  backgroundColor: '#2d8cf0',
                }"
                round
                size="large"
              >
                <n-icon size="18">
                  <MailOutlined />
                </n-icon>
              </n-avatar>
            </template>
            <n-thing title="约翰.维尔逊回复了你的邮件">
              <template #description
                ><span class="text-gray-400">2019-05-08 14:33:18</span></template
              >
            </n-thing>
          </n-list-item>
          <n-list-item>
            <template #prefix>
              <n-avatar
                :style="{
                  color: '#fff',
                  backgroundColor: '#5cdbd3',
                }"
                round
                size="large"
              >
                <n-icon size="18">
                  <FlagOutlined />
                </n-icon>
              </n-avatar>
            </template>
            <n-thing title="约翰.维廉邀请您参加会议">
              <template #description
                ><span class="text-gray-400">2021-08-20 14:33:18</span></template
              >
            </n-thing>
          </n-list-item>
          <n-list-item>
            <template #prefix>
              <n-avatar
                :style="{
                  color: '#fff',
                  backgroundColor: '#ff9c6e',
                }"
                round
                size="large"
              >
                <n-icon size="18">
                  <LikeOutlined />
                </n-icon>
              </n-avatar>
            </template>
            <n-thing title="罗德里格斯点赞了您的文章">
              <template #description
                ><span class="text-gray-400">2021-08-21 15:33:18</span></template
              >
            </n-thing>
          </n-list-item>
          <template #footer>
            <div class="flex justify-center">
              <n-button text>
                <template #icon>
                  <n-icon>
                    <TagsOutlined />
                  </n-icon>
                </template>
                清空通知
              </n-button>
            </div>
          </template>
        </n-list>
      </n-tab-pane>
      <n-tab-pane name="the beatles" tab="关注（2）">
        <n-list>
          <n-list-item>
            <template #prefix>
              <n-avatar round size="large" :src="schoolboy" />
            </template>
            <n-thing title="约翰.维尔逊关注了你">
              <template #description
                ><span class="text-gray-400">2019-05-08 14:33:18</span></template
              >
            </n-thing>
          </n-list-item>
          <n-list-item>
            <template #prefix>
              <n-avatar round size="large" :src="schoolboy" />
            </template>
            <n-thing title="约翰.维廉关注了你">
              <template #description
                ><span class="text-gray-400">2021-08-20 14:33:18</span></template
              >
            </n-thing>
          </n-list-item>
          <n-list-item>
            <template #prefix>
              <n-avatar round size="large" :src="schoolboy" />
            </template>
            <n-thing title="罗德里格斯关注了你">
              <template #description
                ><span class="text-gray-400">2021-08-21 15:33:18</span></template
              >
            </n-thing>
          </n-list-item>
          <template #footer>
            <div class="flex justify-center">
              <n-button text>
                <template #icon>
                  <n-icon>
                    <TagsOutlined />
                  </n-icon>
                </template>
                清空关注
              </n-button>
            </div>
          </template>
        </n-list>
      </n-tab-pane>
      <n-tab-pane name="jay chou" tab="待办（3）">
        <n-list>
          <n-list-item>
            <n-thing title="技术部约翰.维尔逊申请离职">
              <template #description
                ><span class="text-gray-400">请在24小时之前完成</span></template
              >
            </n-thing>
            <template #suffix>
              <n-tag type="error"> 即将超时</n-tag>
            </template>
          </n-list-item>
          <n-list-item>
            <n-thing title="统计年后人员和物资">
              <template #description
                ><span class="text-gray-400">请在2021-08-31号之前完成</span></template
              >
            </n-thing>
            <template #suffix>
              <n-tag type="info"> 进行中</n-tag>
            </template>
          </n-list-item>
          <n-list-item>
            <n-thing title="回访上月全部客户">
              <template #description
                ><span class="text-gray-400">请在2021-08-28号之前完成</span></template
              >
            </n-thing>
            <template #suffix>
              <n-tag> 未开始</n-tag>
            </template>
          </n-list-item>
          <template #footer>
            <div class="flex justify-center">
              <n-button text>
                <template #icon>
                  <n-icon>
                    <TagsOutlined />
                  </n-icon>
                </template>
                清空待办
              </n-button>
            </div>
          </template>
        </n-list>
      </n-tab-pane>
    </n-tabs>
  </n-popover>
  <template v-else>
    <n-icon size="18" @click="notifierProClick">
      <BellOutlined />
    </n-icon>
  </template>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import {
    BellOutlined,
    FlagOutlined,
    LikeOutlined,
    MailOutlined,
    TagsOutlined,
  } from '@vicons/antd';
  import schoolboy from '@/assets/images/schoolboy.png';

  import { useMessage } from 'naive-ui';

  const message = useMessage();

  const badgeValue = ref(28);

  function notifierProClick() {
    message.warning('还没有新消息呢！');
  }
</script>

<style lang="less" scoped>
  .badge-item {
    position: relative;
    display: block;
  }

  .news-badge {
    position: absolute;
    right: -2px;
    top: -4px;

    :deep(.n-badge-sup) {
      top: -10px;
    }
  }
</style>
