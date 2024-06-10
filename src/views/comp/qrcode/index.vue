<template>
  <div>
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="二维码组件">
        二维码组件使用示例，通常用于一些商品、促销活动、或者分享推广二维码展示，推荐直接使用官方组件：n-qr-code
      </n-card>
    </div>
    <n-grid class="mt-3" cols="1 s:2 m:2 l:3 xl:3 2xl:3" responsive="screen" :x-gap="12" :y-gap="9">
      <n-gi>
        <n-card :segmented="{ content: true }" :bordered="false" size="small" title="基础实例">
          <n-space justify="center" class="qrcode-space">
            <QrCode :value="qrCodeUrl" />
          </n-space>
        </n-card>
      </n-gi>
      <n-gi>
        <n-card
          :segmented="{ content: true }"
          :bordered="false"
          size="small"
          title="渲染成img标签示例"
        >
          <n-space justify="center" class="qrcode-space">
            <QrCode :value="qrCodeUrl" tag="img" />
          </n-space>
        </n-card>
      </n-gi>
      <n-gi>
        <n-card :segmented="{ content: true }" :bordered="false" size="small" title="配置样式示例">
          <n-space justify="center" class="qrcode-space">
            <QrCode
              :value="qrCodeUrl"
              :options="{
                color: { dark: '#55D187' },
              }"
            />
          </n-space>
        </n-card>
      </n-gi>
      <n-gi>
        <n-card :segmented="{ content: true }" :bordered="false" size="small" title="本地logo示例">
          <n-space justify="center" class="qrcode-space">
            <QrCode :value="qrCodeUrl" :logo="LogoImg" />
          </n-space>
        </n-card>
      </n-gi>
      <n-gi>
        <n-card :segmented="{ content: true }" :bordered="false" size="small" title="在线logo示例">
          <n-space justify="center" class="qrcode-space">
            <QrCode
              :value="qrCodeUrl"
              logo="https://assets.naiveadmin.com/images/logo.png"
              :options="{
                color: { dark: '#55D187' },
              }"
            />
          </n-space>
        </n-card>
      </n-gi>
      <n-gi>
        <n-card :segmented="{ content: true }" :bordered="false" size="small" title="LOGO配置示例">
          <n-space justify="center" class="qrcode-space">
            <QrCode
              :value="qrCodeUrl"
              :logo="{
                src: 'https://assets.naiveadmin.com/images/logo.png',
                logoSize: 0.2,
                borderSize: 0.05,
                borderRadius: 50,
                bgColor: 'blue',
              }"
            />
          </n-space>
        </n-card>
      </n-gi>
      <n-gi>
        <n-card :segmented="{ content: true }" :bordered="false" size="small" title="下载示例">
          <n-space justify="center" class="qrcode-space">
            <QrCode :value="qrCodeUrl" ref="qrRef" :logo="LogoImg" />
          </n-space>
          <n-space justify="center" class="qrcode-space">
            <n-button class="mt-3" type="primary" @click="download"> 下载 </n-button>
          </n-space>
          <n-space justify="center" class="qrcode-space">
            <div class="msg">(在线logo会导致图片跨域，需要下载图片需要自行解决跨域问题)</div>
          </n-space>
        </n-card>
      </n-gi>
      <n-gi>
        <n-card :segmented="{ content: true }" :bordered="false" size="small" title="扩展绘制示例">
          <n-space justify="center" class="qrcode-space">
            <QrCode
              :value="qrCodeUrl"
              :width="200"
              :options="{ margin: 5 }"
              ref="qrDiyRef"
              :logo="LogoImg"
              @done="onQrcodeDone"
            />
          </n-space>
          <n-space justify="center" class="qrcode-space">
            <n-button class="mt-3" type="primary" @click="downloadDiy"> 下载 </n-button>
          </n-space>
          <n-space justify="center" class="qrcode-space">
            <div class="msg">要进行扩展绘制则不能将tag设为img</div>
          </n-space>
        </n-card>
      </n-gi>
      <n-gi>
        <n-card :segmented="{ content: true }" :bordered="false" size="small" title="配置大小示例">
          <n-space justify="center" class="qrcode-space">
            <QrCode :value="qrCodeUrl" :width="280" />
          </n-space>
        </n-card>
      </n-gi>
    </n-grid>
  </div>
</template>

<script lang="ts" setup>
  import { ref, unref } from 'vue';
  import { QrCode, QrCodeActionType } from '@/components/Qrcode/index';
  import LogoImg from '@/assets/images/logo.png';
  const qrCodeUrl = 'https://www.naiveadmin.com';

  const qrRef = ref<Nullable<QrCodeActionType>>(null);
  const qrDiyRef = ref<Nullable<QrCodeActionType>>(null);

  function download() {
    const qrEl = unref(qrRef);
    if (!qrEl) return;
    qrEl.download('img');
  }

  function downloadDiy() {
    const qrEl = unref(qrDiyRef);
    if (!qrEl) return;
    qrEl.download('Qrcode');
  }

  function onQrcodeDone({ ctx }: any) {
    if (ctx instanceof CanvasRenderingContext2D) {
      // 额外绘制
      ctx.fillStyle = 'black';
      ctx.font = '16px "微软雅黑"';
      ctx.textBaseline = 'bottom';
      ctx.textAlign = 'center';
      ctx.fillText('扫描关注Star点一点', 100, 195, 200);
    }
  }
</script>

<style lang="less" scoped>
  .qrcode-space {
    position: relative;
    bottom: 0;
    transition: bottom 0.4s;
    &:hover {
      bottom: 6px;
    }
  }
</style>
