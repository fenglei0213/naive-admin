<script lang="tsx">
  import { defineComponent, ref } from 'vue';
  import { NInputGroup, NInput, NButton, useMessage } from 'naive-ui';
  import { basicProps } from './props';

  export default defineComponent({
    name: 'ProCheckbox',
    props: basicProps,
    emits: ['start', 'end', 'change', 'update:value'],
    setup(props, { emit, expose }) {
      const isGetCode = ref(false);
      const tips = ref('');
      const isDisabled = ref(false);
      const seconds = ref(props.seconds);
      const message = useMessage();

      let myInterval;

      function resetCode() {
        tips.value = '';
        seconds.value = props.seconds;
        isDisabled.value = false;
        emit('end');
        clearInterval(myInterval);
      }

      function sendCode() {
        myInterval = setInterval(() => {
          isDisabled.value = true;
          isGetCode.value = true;
          tips.value = `${seconds.value}S${props.changeText}`;
          if (seconds.value === 0) {
            resetCode();
          } else {
            seconds.value--;
            emit('change', seconds.value);
          }
        }, 1000);
      }

      function start() {
        sendCode();
      }

      function reset() {
        resetCode();
      }

      function handelSendCode() {
        // 验证手机号码
        if (props.isVerify) {
          const value = props.value;
          if (!value) {
            return message.error('请填写手机号码');
          }
          if (!/^1[3456789]\d{9}$/.test(value)) {
            return message.error('手机号码不正确');
          }
        }
        emit('start');
      }

      function inputChange(value) {
        emit('update:value', value);
      }

      expose({ start, reset });

      return () => {
        return (
          <NInputGroup>
            <NInput {...props.inputProps} onUpdate:value={inputChange}></NInput>
            <NButton
              type="primary"
              {...props.buttonProps}
              disabled={isDisabled.value}
              onClick={handelSendCode}
            >
              {isGetCode.value && tips.value === ''
                ? props.endText
                : isDisabled.value
                ? tips.value
                : props.startText}
            </NButton>
          </NInputGroup>
        );
      };
    },
  });
</script>
