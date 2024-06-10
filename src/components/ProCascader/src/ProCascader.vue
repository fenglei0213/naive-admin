<script lang="tsx">
  import { defineComponent, ref, watch, onBeforeMount } from 'vue';
  import { basicProps } from './props';
  import { allProvinces, regionParent } from '@/api/region/region';
  import { CascaderOption, NCascader, NSpin } from 'naive-ui';
  import { TypeValue } from './types';

  export default defineComponent({
    name: 'ProCascader',
    props: basicProps,
    emits: ['complete'],
    setup(props, { emit, expose, slots }) {
      const loading = ref<boolean>(false);
      const isDefault = ref<boolean>(false);
      const defaultIds = ref<TypeValue>([]);
      const defaultId = ref<number | string | null>();
      const options = ref<CascaderOption[]>([]);

      watch(
        () => props.value,
        (v: []) => {
          isDefault.value = v && v.length ? true : false;
          defaultIds.value = v;
        },
        {
          immediate: true,
        },
      );

      //初始化
      function init() {
        if (!isDefault.value) getOptions();
        else setDefault();
      }

      function setLoading(value: boolean): void {
        loading.value = value;
      }

      async function setDefault() {
        if (!defaultIds.value.length) {
          return;
        }
        setLoading(true);

        const { onlyProvince, hideArea } = props;

        const provinceId = defaultIds.value[0] || null;
        const cityId = defaultIds.value[1] || null;
        const areaId = defaultIds.value[2] || null;
        const provinceList = mapRes(await allProvinces());
        const cityList = await getRegionParent(provinceId, true);
        const areaList = await getRegionParent(cityId, true);

        const newArr = mapRes(provinceList);

        newArr.forEach((item) => {
          if (!onlyProvince && provinceId === item[props.valueField]) {
            item.children = cityList;
            if (!hideArea) {
              item.children.forEach((items) => {
                if (cityId === items[props.valueField]) {
                  items.children = areaList;
                }
              });
            }
          }
        });
        defaultId.value = (onlyProvince ? provinceId : hideArea ? cityId : areaId) as
          | string
          | number
          | null;
        options.value = newArr;
        setLoading(false);
      }

      //获取地区子集
      async function getRegionParent(parentId, isSetDefault?: boolean) {
        if (!parentId) return [];
        const res = await regionParent({ parentId: parentId });
        if (!isSetDefault) loading.value = false;
        return res && res.length ? mapRes(res) : [];
      }

      async function getOptions() {
        if (props.options && props.options.length) {
          options.value = props.options;
          setLoading(false);
          return;
        }
        const res = await allProvinces();
        options.value = mapRes(res);
        setLoading(false);
      }

      //格式化数据
      function mapRes(list): CascaderOption[] {
        const { onlyProvince, hideArea } = props;
        if (!list || !list.length) {
          return [];
        }
        return list.map((item) => {
          return {
            ...item,
            depth: item.depth,
            isLeaf: onlyProvince || (hideArea && item.depth === 2) ? true : item.depth === 3,
          };
        });
      }

      async function getChildren(option: CascaderOption) {
        const parentId = option[props.valueField];
        const res = await regionParent({ parentId: parentId });
        return res as CascaderOption[];
      }

      function handleLoad(option: CascaderOption) {
        return new Promise<void>(async (resolve) => {
          const res = await getChildren(option);
          option.children = mapRes(res);
          resolve();
        });
      }

      function change(value, option, pathValues) {
        emit('complete', value, option, pathValues);
      }

      function getSlols() {
        return {
          action: slots?.action,
          arrow: slots?.arrow,
          empty: slots?.empty,
          notFound: slots?.notFound,
        };
      }

      onBeforeMount(() => {
        init();
      });

      expose({ setLoading });

      return () => {
        return (
          <NSpin show={loading.value} size="small">
            <NCascader
              {...props}
              check-strategy="child"
              v-model:value={defaultId.value}
              options={options.value}
              onLoad={handleLoad}
              onUpdateValue={change}
              v-slots={getSlols()}
            ></NCascader>
          </NSpin>
        );
      };
    },
  });
</script>
