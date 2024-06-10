<script lang="tsx">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { getSlot } from '@/utils/helper/tsxHelper';
  import { NText, NTooltip, NButton, useMessage, useThemeVars } from 'naive-ui';
  import { CopyOutlined, CheckOutlined } from '@vicons/antd';
  import { renderIcon } from '@/utils/index';
  import { useClipboard } from '@vueuse/core';
  import { isArray } from '@/utils/is';
  import { basicProps } from './props';

  export default defineComponent({
    name: 'Paragraph',
    props: basicProps,
    setup(props, { slots, emit, attrs }) {
      const message = useMessage();
      const isCopyable = ref(false);
      const source: any = ref();

      const themeVars = useThemeVars();

      const copyText = computed(() => {
        const tipsStr = props.copyConfig.tooltips;
        return isArray(tipsStr) && tipsStr.length ? tipsStr[0] : '复制';
      });

      const copyTipText = computed(() => {
        const tipsStr = props.copyConfig.tooltips;
        return isArray(tipsStr) && tipsStr.length ? tipsStr[1] : '复制成功';
      });

      const { copy, isSupported } = useClipboard({ source });

      const getPrimaryColor = computed(() => {
        return themeVars.value.primaryColor;
      });

      const getTooltips = computed(() => {
        return props.copyConfig.tooltips ?? true;
      });

      const getShowTip = computed(() => {
        return props.copyConfig.showTip ?? true;
      });

      const TooltipSlot = {
        default: () => {
          return <span>{isCopyable.value ? copyTipText.value : copyText.value}</span>;
        },
        trigger: () => handleCopyBtn(),
      };

      function handleCopyBtn() {
        const color = { color: getPrimaryColor.value };
        return (
          <NButton text size="small" style="vertical-align: text-top" onClick={handleCopyable}>
            {{
              default: isCopyable.value
                ? renderIcon(CheckOutlined, color)
                : renderIcon(CopyOutlined, color),
            }}
          </NButton>
        );
      }

      function handleCopyable() {
        if (isCopyable.value) return;
        isCopyable.value = true;
        const slotsList = getSlot(slots);
        source.value = slotsList?.length ? slotsList[0].children : '';
        copy(source.value);
        getShowTip.value && message.success(copyTipText.value);
        isSupported.value ? emit('copy-success') : emit('copy-error');
      }

      function renderText() {
        return getSlot(slots);
      }

      function renderCopyable() {
        return (
          <NText copyable {...attrs}>
            <>
              {renderText()}
              {unref(getTooltips) ? (
                <NTooltip trigger="hover" v-slots={TooltipSlot}></NTooltip>
              ) : (
                handleCopyBtn()
              )}
            </>
          </NText>
        );
      }

      return () => {
        return props.copyable ? renderCopyable() : <NText>{renderText()}</NText>;
      };
    },
  });
</script>
