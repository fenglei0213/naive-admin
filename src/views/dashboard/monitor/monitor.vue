<template>
  <div class="console">
    <n-grid cols="1 s:2 m:3 l:4 xl:4 2xl:4" responsive="screen" :x-gap="12" :y-gap="8">
      <n-grid-item>
        <n-card size="small" :bordered="false" hoverable>
          <n-space justify="space-between" align="center">
            <div>
              <img src="~@/assets/images/visits.svg" class="top-card-img" />
              <div class="pt-2">访问量</div>
            </div>
            <div>
              <n-text depth="3">周</n-text>
            </div>
          </n-space>
          <n-space justify="space-between" align="center">
            <n-h1 class="mb-0">98735</n-h1>
            <div>
              <n-tag
                :color="{ color: '#18a058', textColor: '#fff', borderColor: '#18a058' }"
                type="success"
                round
                size="small"
              >
                +10%
              </n-tag>
              <n-text type="success" class="ml-2">
                <n-icon size="16">
                  <ArrowUpOutlined />
                </n-icon>
              </n-text>
            </div>
          </n-space>
        </n-card>
      </n-grid-item>
      <n-grid-item>
        <n-card size="small" :bordered="false" hoverable>
          <n-space justify="space-between" align="center">
            <div>
              <img src="~@/assets/images/sale.svg" class="top-card-img" />
              <div class="pt-2">销售额</div>
            </div>
            <div>
              <n-text depth="3">周</n-text>
            </div>
          </n-space>
          <n-space justify="space-between" align="center">
            <n-h1 class="mb-0">￥3980</n-h1>
            <div>
              <n-tag
                :color="{ color: '#d03050', textColor: '#fff', borderColor: '#d03050' }"
                type="error"
                round
                size="small"
              >
                -20%
              </n-tag>
              <n-text type="error" class="ml-2">
                <n-icon size="16">
                  <ArrowDownOutlined />
                </n-icon>
              </n-text>
            </div>
          </n-space>
        </n-card>
      </n-grid-item>
      <n-grid-item>
        <n-card size="small" :bordered="false" hoverable>
          <n-space justify="space-between" align="center">
            <div>
              <img src="~@/assets/images/order_count.svg" class="top-card-img" />
              <div class="pt-2">订单量</div>
            </div>
            <div>
              <n-text depth="3">周</n-text>
            </div>
          </n-space>
          <n-space justify="space-between" align="center">
            <n-h1 class="mb-0">3685</n-h1>
            <div>
              <n-tag
                :color="{ color: '#18a058', textColor: '#fff', borderColor: '#18a058' }"
                type="success"
                round
                size="small"
              >
                +35%
              </n-tag>
              <n-text type="success" class="ml-2">
                <n-icon size="16">
                  <ArrowUpOutlined />
                </n-icon>
              </n-text>
            </div>
          </n-space>
        </n-card>
      </n-grid-item>
      <n-grid-item>
        <n-card size="small" :bordered="false" hoverable>
          <n-space justify="space-between" align="center">
            <div>
              <img src="~@/assets/images/volume.svg" class="top-card-img" />
              <div class="pt-2">成交额</div>
            </div>
            <div>
              <n-text depth="3">月</n-text>
            </div>
          </n-space>
          <n-space justify="space-between" align="center">
            <n-h1 class="mb-0">￥29856</n-h1>
            <div>
              <n-tag
                :color="{ color: '#d03050', textColor: '#fff', borderColor: '#d03050' }"
                type="error"
                round
                size="small"
              >
                -5%
              </n-tag>
              <n-text type="error" class="ml-2">
                <n-icon size="16">
                  <ArrowDownOutlined />
                </n-icon>
              </n-text>
            </div>
          </n-space>
        </n-card>
      </n-grid-item>
    </n-grid>

    <n-grid cols="1 s:1 m:1 l:2 xl:2 2xl:2" responsive="screen" :x-gap="12" :y-gap="8" class="mt-3">
      <n-grid-item>
        <n-card
          size="small"
          title="访问量"
          :segmented="{ content: true }"
          :bordered="false"
          hoverable
        >
          <NewVisitAmount />
        </n-card>
      </n-grid-item>
      <n-grid-item>
        <n-card
          size="small"
          title="区域排行"
          :segmented="{ content: true }"
          :bordered="false"
          hoverable
        >
          <AreaRanking />
          <!-- <div class="-mt-6">
            <n-space justify="space-around">
              <n-statistic label="搜索引擎" value="45.8%" />
              <n-statistic label="直接访问" value="35.5%" />
              <n-statistic label="邮件营销" value="25.56%" />
            </n-space>
          </div> -->
        </n-card>
      </n-grid-item>
    </n-grid>

    <n-grid cols="1 s:1 m:2 l:2 xl:2 2xl:2" responsive="screen" :x-gap="12" :y-gap="8" class="mt-3">
      <n-grid-item>
        <n-card
          size="small"
          title="销售额"
          :segmented="{ content: true }"
          :bordered="false"
          hoverable
        >
          <Percent />
        </n-card>
      </n-grid-item>
      <n-grid-item>
        <n-card
          size="small"
          title="访问来源"
          :segmented="{ content: true }"
          :bordered="false"
          hoverable
        >
          <VisitSource />
          <!-- <div class="-mt-6">
            <n-space justify="space-around">
              <n-statistic label="搜索引擎" value="45.8%" />
              <n-statistic label="直接访问" value="35.5%" />
              <n-statistic label="邮件营销" value="25.56%" />
            </n-space>
          </div> -->
        </n-card>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script lang="ts" setup>
  import { ArrowUpOutlined, ArrowDownOutlined } from '@vicons/antd';
  import NewVisitAmount from './components/NewVisitAmount.vue';
  import VisitSource from './components/VisitSource.vue';
  import Percent from './components/Percent.vue';
  import AreaRanking from './components/AreaRanking.vue';
</script>

<style lang="less" scoped>
  .top-card-img {
    width: 32px;
    margin-left: 5px;
  }
</style>
