<template>
  <div :class="getWrapper" class="flex flex-row region">
    <n-select
      v-model:value="province"
      :options="provinceList"
      clearable
      @update:value="provinceChange"
    />
    <n-select
      v-if="isShowCity"
      v-model:value="city"
      :options="cityList"
      class="ml-2.5"
      clearable
      @update:value="cityChange"
    />
    <n-select
      v-if="isShowArea"
      v-model:value="area"
      :options="areaList"
      class="ml-2.5"
      clearable
      @update:value="areaChange"
    />
    <n-spin v-if="loading" class="ml-2.5" size="small" />
  </div>
</template>
<script lang="ts" setup>
  import { ref, unref, computed, watch, nextTick, onBeforeMount } from 'vue';
  import { basicProps } from './props';
  import { allProvinces, regionParent } from '@/api/region/region';

  const props = defineProps({ ...basicProps });

  const emit = defineEmits(['change']);

  const loading = ref(false);
  const province = ref(null);
  const city = ref(null);
  const area = ref(null);
  const provinceList = ref([]);
  const cityList = ref([]);
  const areaList = ref([]);
  const isDefault = ref(false);
  const defaultIds = ref([]);
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

  const getWrapper = computed(() => {
    return props.wrapper ? props.wrapper : '';
  });

  const isShowArea = computed(() => {
    return areaList.value.length && !props.onlyProvince && !props.hideArea;
  });

  const isShowCity = computed(() => {
    return cityList.value.length && !props.onlyProvince;
  });

  //初始化
  function init() {
    if (!isDefault.value) getAllProvinces();
    else setDefault();
  }

  //设置默认值
  async function setDefault() {
    loading.value = true;
    const provinceId = defaultIds.value[0] || null;
    const cityId = defaultIds.value[1] || null;
    const areaId = defaultIds.value[2] || null;
    provinceList.value = mapRes(await allProvinces());
    cityList.value = await getRegionParent(provinceId, true);
    areaList.value = await getRegionParent(cityId, true);

    await nextTick(() => {
      province.value = provinceId;
      city.value = cityId;
      area.value = areaId;
      loading.value = false;
      emit('change', geResult());
    });
  }

  //获取所有省份
  async function getAllProvinces() {
    const res = await allProvinces();
    provinceList.value = mapRes(res);
    loading.value = false;
  }

  //获取地区子集
  async function getRegionParent(parentId, isSetDefault?: boolean) {
    if (!parentId) return [];
    const res = await regionParent({ parentId: parentId });
    if (!isSetDefault) loading.value = false;
    return res && res.length ? mapRes(res) : [];
  }

  //省切换
  async function provinceChange() {
    loading.value = true;
    const res = await getRegionParent(province.value);
    city.value = null;
    area.value = null;
    areaList.value = [];
    cityList.value = res;
    emit('change', geResult());
    loading.value = false;
  }

  //市切换
  async function cityChange() {
    loading.value = true;
    const res = await getRegionParent(city.value);
    area.value = null;
    areaList.value = res;
    emit('change', geResult());
    loading.value = false;
  }

  //区切换
  async function areaChange() {
    emit('change', geResult());
  }

  //格式化数据
  function mapRes(list) {
    if (!list || !list.length) {
      return [];
    }
    return list.map((item) => {
      return {
        label: item[props.labelField],
        value: item[props.valueField],
      };
    });
  }

  //获取选中地区信息
  function geResult() {
    const provinceInfo = unref(provinceList).filter((item: any) => {
      return item.value === province.value;
    });
    if (props.onlyProvince) {
      return [...provinceInfo];
    }
    const cityInfo = unref(cityList).filter((item: any) => {
      return item.value === city.value;
    });
    if (props.hideArea) {
      return [...provinceInfo, ...cityInfo];
    }
    const areaInfo = unref(areaList).filter((item: any) => {
      return item.value === area.value;
    });
    return [...provinceInfo, ...cityInfo, ...areaInfo];
  }

  onBeforeMount(() => {
    init();
  });
</script>

<style lang="less" scoped></style>
