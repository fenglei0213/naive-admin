<script lang="tsx">
  import { defineComponent, computed, ref } from 'vue';
  import { basicProps } from './props';
  import { NButton, NDrawer, NDrawerContent, NSpace } from 'naive-ui';

  export default defineComponent({
    name: 'DrawerForm',
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
      const isDrawer = ref<boolean>(false);
      const loading = ref<boolean>(false);

      const formFun = computed(() => {
        return props.form;
      });

      function hideDrawer() {
        loading.value = false;
        isDrawer.value = false;
        emit('update:isShowHeader', true);
        emit('update:isHideForm', false);
        emit('update:isShowFooter', false);
        emit('update:showAction', true);
      }

      function showDrawer() {
        isDrawer.value = true;
      }

      function setLoading(value: boolean) {
        loading.value = value;
      }

      function drawerContentSlots() {
        return {
          footer: () =>
            slots.action
              ? slots.action()
              : props.showAction && (
                  <NSpace>
                    <NButton {...props.negativeButtonProps} onClick={hideDrawer}>
                      {props.negativeText}
                    </NButton>
                    <NButton
                      type="primary"
                      {...props.positiveButtonProps}
                      loading={loading.value}
                      onClick={submit}
                    >
                      {props.positiveText}
                    </NButton>
                  </NSpace>
                ),
        };
      }

      async function submit() {
        loading.value = true;
        const formValues = await formFun?.value?.submit();
        if (!formValues) {
          setTimeout(() => {
            setLoading(false);
          }, 200);
          return;
        }
        emit('submit', formValues, (state: boolean) => {
          if (state === true) {
            setLoading(false);
            hideDrawer();
          } else {
            setLoading(false);
          }
        });
      }

      expose({ showDrawer, hideDrawer, setLoading, submit });

      return () => {
        return (
          <NDrawer {...props} v-model:show={isDrawer.value}>
            <NDrawerContent {...props.drawerContent} v-slots={drawerContentSlots()}>
              {props.isShowHeader && slots.header && (
                <div class="form-dialog-header">{slots.header()}</div>
              )}
              {!props.isHideForm && slots.default && (
                <div class="form-dialog-form">{slots.default()}</div>
              )}
              {props.isShowFooter && slots.footer && (
                <div class="form-dialog-head">{slots.footer()}</div>
              )}
            </NDrawerContent>
          </NDrawer>
        );
      };
    },
  });
</script>
