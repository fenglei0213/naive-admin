<script lang="tsx">
  import { defineComponent, computed } from 'vue';
  import { useModal } from '@/components/Modal';
  import { basicProps } from './props';

  export default defineComponent({
    name: 'ModalForm',
    props: basicProps,
    emits: [
      'submit',
      'register',
      'update:isShowHeader',
      'update:isHideForm',
      'update:isShowFooter',
      'update:showAction',
    ],
    setup(props, { emit, slots, expose }) {
      const [modalRegister, { openModal, closeModal, setSubLoading, setProps }] = useModal({
        ...props,
      });

      const formFun = computed(() => {
        return props.form;
      });

      function modalSlots() {
        return slots.action
          ? {
              action: () => slots.action && slots.action(),
            }
          : undefined;
      }

      function showModal() {
        emit('update:isShowHeader', true);
        emit('update:isHideForm', false);
        emit('update:isShowFooter', false);
        emit('update:showAction', true);
        openModal();
      }

      async function submit() {
        const formValues = await formFun?.value?.submit();
        if (!formValues) {
          setLoading(false);
          return;
        }
        emit('submit', formValues, (state: boolean) => {
          if (state === true) {
            setLoading(false);
            closeModal();
          } else {
            setLoading(false);
          }
        });
      }

      function setLoading(value: boolean) {
        setSubLoading(value);
      }

      expose({ submit, setProps, showModal, closeModal, setLoading });

      return () => {
        return (
          <basicModal
            onRegister={modalRegister}
            onOnOk={submit}
            showAction={props.showAction}
            v-slots={modalSlots()}
          >
            {props.isShowHeader && slots.header && (
              <div class="form-dialog-header">{slots.header()}</div>
            )}
            {!props.isHideForm && slots.default && (
              <div class="form-dialog-form">{slots.default()}</div>
            )}
            {props.isShowFooter && slots.footer && (
              <div class="form-dialog-head">{slots.footer()}</div>
            )}
          </basicModal>
        );
      };
    },
  });
</script>
