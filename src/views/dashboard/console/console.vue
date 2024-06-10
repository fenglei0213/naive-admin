<template>
  <div class="console">
    <n-grid x-gap="12" :cols="4">
      <n-gi>
        <n-card :bordered="false">
          <div class="flex items-center root-item">
            <div class="flex items-center iocn-circle person-circle">
              <n-icon :component="UsergroupAddOutlined" :size="22" />
            </div>
            <div class="flex justify-between w-full root-item-text">
              <n-text depth="3" class="flex items-center pl-2">本月注册人数</n-text>
              <n-button round strong secondary type="tertiary" size="small">详情</n-button>
            </div>
          </div>

          <div class="flex items-center justify-center my-4 root-item number-animation">
            <n-icon :component="ArrowUpOutlined" :size="22" color="rgb(87, 202, 34)" />
            <n-number-animation :from="0" :to="1689" />
          </div>

          <div class="flex justify-center root-item">
            <n-text depth="3">
              <div class="flex items-center">
                <div class="flex items-center mr-1 font-bold">
                  <n-icon
                    :component="CaretUpFilled"
                    color="rgb(87, 202, 34)"
                    :size="12"
                    class="mr-1"
                  />
                  51%</div
                >
                <div>已超过上周</div>
              </div>
            </n-text>
          </div>
        </n-card>
      </n-gi>
      <n-gi>
        <n-card :bordered="false">
          <div class="flex items-center root-item">
            <div class="flex items-center iocn-circle order-circle">
              <n-icon :component="FileProtectOutlined" :size="22" />
            </div>
            <div class="flex justify-between w-full root-item-text">
              <n-text depth="3" class="flex items-center pl-2">本月订单总数</n-text>
              <n-button round strong secondary type="tertiary" size="small">详情</n-button>
            </div>
          </div>

          <div class="flex items-center justify-center my-4 root-item number-animation">
            <n-icon :component="ArrowDownOutlined" :size="22" color="rgb(255, 25, 67)" />
            <n-number-animation :from="0" :to="2580" />
          </div>

          <div class="flex justify-center root-item">
            <n-text depth="3">
              <div class="flex items-center">
                <div class="flex items-center mr-1 font-bold">
                  <n-icon
                    :component="CaretDownOutlined"
                    color="rgb(255, 25, 67)"
                    :size="12"
                    class="mr-1"
                  />
                  12%</div
                >
                <div>已少于上周</div>
              </div>
            </n-text>
          </div>
        </n-card>
      </n-gi>
      <n-gi>
        <n-card :bordered="false">
          <div class="flex items-center root-item">
            <div class="flex items-center iocn-circle pay-circle">
              <n-icon :component="CreditCardOutlined" :size="22" />
            </div>
            <div class="flex justify-between w-full root-item-text">
              <n-text depth="3" class="flex items-center pl-2">本周支付金额</n-text>
              <n-button round strong secondary type="tertiary" size="small">详情</n-button>
            </div>
          </div>

          <div class="flex items-center justify-center my-4 root-item number-animation">
            <n-icon :component="ArrowDownOutlined" :size="22" color="rgb(255, 25, 67)" />
            <span>￥</span>
            <n-number-animation show-separator :from="0" :to="3980" />
          </div>

          <div class="flex justify-center root-item">
            <n-text depth="3">
              <div class="flex items-center">
                <div class="flex items-center mr-1 font-bold">
                  <n-icon
                    :component="CaretDownOutlined"
                    color="rgb(255, 25, 67)"
                    :size="12"
                    class="mr-1"
                  />
                  8%</div
                >
                <div>已少于上周</div>
              </div>
            </n-text>
          </div>
        </n-card>
      </n-gi>
      <n-gi>
        <n-card :bordered="false">
          <div class="flex items-center root-item">
            <div class="flex items-center iocn-circle sale-circle">
              <n-icon :component="DollarCircleOutlined" :size="22" />
            </div>
            <div class="flex justify-between w-full root-item-text">
              <n-text depth="3" class="flex items-center pl-2">本月销售总额</n-text>
              <n-button round strong secondary type="tertiary" size="small">详情</n-button>
            </div>
          </div>

          <div class="flex items-center justify-center my-4 root-item number-animation">
            <n-icon :component="ArrowUpOutlined" :size="22" color="rgb(87, 202, 34)" />
            <span>￥</span>
            <n-number-animation show-separator :from="0" :to="16895" />
          </div>

          <div class="flex justify-center root-item">
            <n-text depth="3">
              <div class="flex items-center">
                <div class="flex items-center mr-1 font-bold">
                  <n-icon
                    :component="CaretUpFilled"
                    color="rgb(87, 202, 34)"
                    :size="12"
                    class="mr-1"
                  />
                  61%</div
                >
                <div>已超过上周</div>
              </div>
            </n-text>
          </div>
        </n-card>
      </n-gi>
    </n-grid>

    <n-grid x-gap="12" :cols="5" class="mt-3">
      <n-gi :span="3">
        <n-card
          title="订单来源"
          :segmented="{
            content: true,
          }"
          :bordered="false"
          size="small"
        >
          <Order />
        </n-card>
      </n-gi>
      <n-gi :span="2">
        <n-card
          :bordered="false"
          title="用户分析"
          :segmented="{
            content: true,
          }"
          size="small"
          content-style="padding-top: 0;padding-bottom:0"
        >
          <UserAnalysis />
        </n-card>
      </n-gi>
    </n-grid>

    <n-grid x-gap="12" :cols="3" class="mt-3">
      <n-gi :span="2">
        <n-card
          :bordered="false"
          title="最新订单"
          :segmented="{
            content: true,
          }"
          size="small"
          content-style="padding-top: 0;padding-bottom:0"
        >
          <NewOrder />
        </n-card>
      </n-gi>
      <n-gi :span="1">
        <n-card
          :bordered="false"
          title="消费排行"
          :segmented="{
            content: true,
          }"
          size="small"
          content-style="padding-top: 0;padding-bottom:0"
        >
          <Registered />
        </n-card>
      </n-gi>
    </n-grid>
  </div>
</template>

<script lang="ts" setup>
  import {
    CaretUpFilled,
    CaretDownOutlined,
    ArrowUpOutlined,
    ArrowDownOutlined,
    UsergroupAddOutlined,
    FileProtectOutlined,
    CreditCardOutlined,
    DollarCircleOutlined,
  } from '@vicons/antd';
  import UserAnalysis from './components/UserAnalysis.vue';
  import Order from './components/Order.vue';
  import NewOrder from './components/NewOrder.vue';
  import Registered from './components/Registered.vue';
</script>

<style lang="less" scoped>
  .number-animation {
    font-weight: 700;
    font-size: 30px;
  }

  .red-color {
    color: rgb(208, 48, 80);
  }

  .iocn-circle {
    display: flex;
    width: 40px;
    height: 40px;
    min-width: 40px;
    border-radius: 50%;
    color: rgb(255, 255, 255);
    justify-content: center;
  }

  .person-circle {
    background: linear-gradient(135deg, rgb(255, 247, 32) 0%, rgb(60, 213, 0) 100%);
  }

  .order-circle {
    background: linear-gradient(135deg, rgb(107, 115, 255) 0%, rgb(45, 140, 240) 100%);
  }

  .pay-circle {
    background: linear-gradient(135deg, rgb(252, 207, 49) 0%, rgb(245, 85, 85) 100%);
  }

  .sale-circle {
    background: linear-gradient(135deg, rgb(45, 140, 240) 0%, rgb(151, 8, 204) 100%);
  }

  .registered {
    .right-item {
      width: 80px;
    }
  }

  .order {
    .right-item {
      width: 180px;
    }
  }
</style>
