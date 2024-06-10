<template>
  <div class="BasicSelect">
    <n-select v-bind="getBindValues">
      <template v-for="item in Object.keys($slots)" :key="item" #[item]="data">
        <slot :name="item">{{ data }}</slot>
      </template>
    </n-select>
  </div>
</template>

<script lang="ts" setup>
  import { ref, unref, computed, onMounted } from 'vue';
  import { basicProps } from './props';
  import { createStorage } from '@/utils/Storage';

  const Storage = createStorage({ storage: localStorage });

  const props = defineProps({ ...basicProps });

  const loading = ref(true);

  const options = ref<any[]>([]);

  const getProps = computed(() => {
    return { ...props };
  });

  const getOptions = computed(() => {
    return props.request != null ? options.value : props.options;
  });

  const selectWidth = props.block ? '100%' : `${props.width}px`;

  const getBindValues = computed(() => {
    return {
      ...unref(getProps),
      loading: loading.value,
      options: getOptions.value,
    };
  });

  const getCacheData = computed(() => {
    return props.cacheKey ? Storage.get(props.cacheKey) : null;
  });

  //初始化
  function init() {
    const { cache, cacheKey } = props;
    //判断是否启用缓存
    if (cache && cacheKey && getCacheData.value) {
      options.value = getCacheData.value || [];
      loading.value = false;
      return;
    }
    //获取新数据
    fetch();
  }

  //触发取新数据
  async function fetch() {
    loading.value = true;
    const { request, cacheKey, cache } = props;
    if (!request) {
      if (props.options && props.options.length) {
        options.value = props.options;
        loading.value = false;
        if (cache && cacheKey) Storage.set(cacheKey, props.options);
      }
      return;
    }
    try {
      const res = await request();
      options.value = res || [];
      loading.value = false;
      if (cache && cacheKey && res && res.length) Storage.set(cacheKey, res);
    } catch (error) {
      console.error(error);
    }
  }

  //获取数据源
  function getData() {
    const { cache, cacheKey } = props;
    return cache && cacheKey ? Storage.get(props.cacheKey) : options.value;
  }

  //获取缓存
  onMounted(() => {
    init();
  });

  //暴露方法
  defineExpose({
    fetch,
    getData,
  });
</script>

<style lang="less" scoped>
  .BasicSelect {
    display: inline-block;
    width: v-bind(selectWidth);
  }
</style>
