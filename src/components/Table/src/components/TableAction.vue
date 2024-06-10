<template>
  <div class="tableAction">
    <div class="flex items-center justify-center">
      <template v-for="action in getActions" :key="action.label">
        <template v-if="!action.isConfirm">
          <n-button v-bind="action" class="mr-2">
            {{ action.label }}
            <template #icon v-if="action.icon">
              <component :is="action.icon" />
            </template>
          </n-button>
        </template>
        <template v-else>
          <n-popconfirm v-bind="action">
            <template #trigger>
              <n-button class="mr-2" v-bind="action">
                {{ action.label }}
                <template #icon v-if="action.icon">
                  <component :is="action.icon" />
                </template>
              </n-button>
            </template>
            {{ action.confirmContent }}
          </n-popconfirm>
        </template>
      </template>
      <n-dropdown
        v-if="dropDownActions && getDropdownList.length"
        trigger="hover"
        :options="getDropdownList"
        @select="select"
      >
        <slot name="more"></slot>
        <n-button icon-placement="right" v-bind="getMoreProps" class="mr-2" v-if="!$slots.more">
          <template #icon v-if="getMoreProps.icon">
            <component :is="getMoreProps.icon" />
          </template>
          <div class="flex items-center">
            <span>{{ dropDownProps.label }}</span>
            <n-icon size="14" class="ml-1" v-if="!getMoreProps.icon">
              <DownOutlined />
            </n-icon>
          </div>
        </n-button>
      </n-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType, computed, toRaw } from 'vue';
  import { ActionItem } from '@/components/Table';
  import { usePermission } from '@/hooks/web/usePermission';
  import { isBoolean, isFunction } from '@/utils/is';
  import { DownOutlined } from '@vicons/antd';
  import { Render } from '@/components/Render';
  import { SelectProps } from 'naive-ui';

  export default defineComponent({
    name: 'TableAction',
    components: { DownOutlined, Render },
    props: {
      actions: {
        type: Array as PropType<ActionItem[]>,
        default: null,
        required: true,
      },
      dropDownActions: {
        type: Array as PropType<ActionItem[]>,
        default: null,
      },
      style: {
        type: String as PropType<String>,
        default: 'button',
      },
      select: {
        type: Function as PropType<SelectProps>,
        default: () => {},
      },
      dropDownProps: {
        type: Object as PropType<ActionItem>,
        default: () => {
          return {
            label: '更多',
          };
        },
      },
    },
    setup(props) {
      const { hasPermission } = usePermission();

      const actionType =
        props.style === 'button' ? 'default' : props.style === 'text' ? 'primary' : 'default';
      const actionText =
        props.style === 'button' ? undefined : props.style === 'text' ? true : undefined;

      const getMoreProps: any = computed(() => {
        const { dropDownProps } = props;
        return {
          text: actionText,
          type: actionType,
          size: 'small',
          ...dropDownProps,
        };
      });

      const getDropdownList = computed(() => {
        return (toRaw(props.dropDownActions) || [])
          .filter((action) => {
            return hasPermission(action.auth as string[]) && isIfShow(action);
          })
          .map((action) => {
            const { popConfirm } = action;
            return {
              size: 'small',
              text: actionText,
              type: actionType,
              ...action,
              ...popConfirm,
              onConfirm: popConfirm?.confirm,
              onCancel: popConfirm?.cancel,
            } as any;
          });
      });

      function isIfShow(action: ActionItem): boolean {
        const ifShow = action.ifShow;

        let isIfShow = true;

        if (isBoolean(ifShow)) {
          isIfShow = ifShow;
        }
        if (isFunction(ifShow)) {
          isIfShow = ifShow(action);
        }
        return isIfShow;
      }

      const getActions = computed(() => {
        return (toRaw(props.actions) || [])
          .filter((action) => {
            return hasPermission(action.auth as string[]) && isIfShow(action);
          })
          .map((action: any) => {
            const { popConfirm } = action;
            //需要展示什么风格，自己修改一下参数
            return {
              size: 'small',
              text: actionText,
              type: actionType,
              ...action,
              ...(popConfirm || {}),
              onConfirm: popConfirm?.confirm,
              onCancel: popConfirm?.cancel,
              enable: !!popConfirm,
            };
          });
      });

      return {
        getActions,
        getDropdownList,
        getMoreProps,
      };
    },
  });
</script>
