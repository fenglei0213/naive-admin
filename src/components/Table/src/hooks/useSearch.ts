import { ref, h } from 'vue';
import {
  NIcon,
  NSpace,
  NButton,
  NInput,
  NInputNumber,
  NSelect,
  NDatePicker,
  NSwitch,
} from 'naive-ui';
import { FilterOutlined } from '@vicons/antd';
import { BasicColumn } from '../types/table';

export function useSearch(columns: BasicColumn, reloadTable: Function) {
  const searchVal = ref<string | number | boolean>();

  const renderFilterIcon = () => {
    return h(
      NIcon,
      {
        color: searchVal.value ? '#2d8cf0' : '',
      },
      { default: () => h(FilterOutlined) },
    );
  };

  const renderSwitch = (props) => {
    return h(NSwitch, {
      size: 'small',
      value: searchVal.value,
      onUpdateValue: (val) => {
        searchVal.value = val;
      },
      ...props,
    });
  };

  const renderDate = (props) => {
    return h(NDatePicker, {
      size: 'small',
      value: searchVal.value,
      onUpdateValue: (val) => {
        searchVal.value = val;
      },
      ...props,
    });
  };

  const renderSelect = (props) => {
    return h(NSelect, {
      size: 'small',
      value: searchVal.value,
      onUpdateValue: (val) => {
        searchVal.value = val;
      },
      ...props,
    });
  };

  const renderInput = (props) => {
    return h(NInput, {
      size: 'small',
      value: searchVal.value,
      onInput: (val) => {
        searchVal.value = val;
      },
      ...props,
    });
  };

  const renderNumber = (props) => {
    return h(NInputNumber, {
      size: 'small',
      value: searchVal.value,
      onUpdateValue: (val) => {
        searchVal.value = val;
      },
      ...props,
    });
  };

  const renderSearchType = (columns) => {
    const typeMap = {
      text: renderInput(columns.searchProps || {}),
      number: renderNumber(columns.searchProps || {}),
      select: renderSelect(columns.searchProps || {}),
      date: renderDate(columns.searchProps || {}),
      switch: renderSwitch(columns.searchProps || {}),
    };
    return typeMap[columns.searchType || 'text'];
  };

  // 创建底部按钮
  const renderButtons = (ctx) => {
    return [
      h(
        NButton,
        {
          size: 'tiny',
          strong: true,
          secondary: true,
          type: 'tertiary',
          onClick: () => {
            searchVal.value = '';
            reloadTable();
            ctx?.hide();
          },
        },
        { default: () => '重置' },
      ),
      h(
        NButton,
        {
          size: 'tiny',
          type: 'primary',
          onClick: () => {
            reloadTable();
            ctx?.hide();
          },
        },
        { default: () => '确定' },
      ),
    ];
  };

  const renderFilterMenu = (ctx) => {
    return [
      h(
        NSpace,
        {
          class: 'p-3',
          vertical: true,
        },
        {
          default: () => [
            renderSearchType(columns),
            h(
              NSpace,
              {
                justify: 'end',
                class: 'w-full mt-2 ',
              },
              {
                default: () => renderButtons(ctx),
              },
            ),
          ],
        },
      ),
    ];
  };
  return { renderFilterIcon, renderFilterMenu, searchVal };
}
