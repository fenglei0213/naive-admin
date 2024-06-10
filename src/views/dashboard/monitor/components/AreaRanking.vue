<template>
  <div ref="chartRef" :style="{ height, width }"></div>
</template>
<script lang="ts" setup>
  import { onMounted, PropType, ref, Ref } from 'vue';
  import { useECharts } from '@/hooks/web/useECharts';
  import { EChartsOption } from 'echarts';

  let data = [
    {
      name: '四川省',
      value: (Math.random() * 10).toFixed(0),
      sum: 10,
    },
    {
      name: '江西省',
      value: (Math.random() * 10).toFixed(0),
      sum: 10,
    },
    {
      name: '湖南省',
      value: (Math.random() * 10).toFixed(0),
      sum: 10,
    },
    {
      name: '浙江省',
      value: (Math.random() * 10).toFixed(0),
      sum: 10,
    },
    {
      name: '广东省',
      value: (Math.random() * 10).toFixed(0),
      sum: 10,
    },
    {
      name: '山西省',
      value: (Math.random() * 10).toFixed(0),
      sum: 10,
    },
    {
      name: '上海市',
      value: (Math.random() * 10).toFixed(0),
      sum: 10,
    },
    {
      name: '江苏省',
      value: (Math.random() * 10).toFixed(0),
      sum: 10,
    },
    {
      name: '福建省',
      value: (Math.random() * 10).toFixed(0),
      sum: 10,
    },
    {
      name: '河南省',
      value: (Math.random() * 10).toFixed(0),
      sum: 10,
    },
  ];
  const getArrByKey = (data, k) => {
    let key = k || 'value';
    let res: string[] = [];
    if (data) {
      data.forEach(function (t) {
        res.push(t[key]);
      });
    }
    return res;
  };
  const opt = {
    index: 0,
  };
  const color = ['#FC619D', '#FF904D', '#48BFE3'];
  data = data.sort((a, b) => {
    return (b.value as any) - (a.value as any);
  });

  const option: EChartsOption = {
    grid: {
      top: '2%',
      bottom: -15,
      right: 30,
      left: -30,
      containLabel: true,
    },
    xAxis: {
      show: false,
    },
    yAxis: [
      {
        triggerEvent: true,
        show: true,
        inverse: true,
        data: getArrByKey(data, 'name'),
        axisLine: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          interval: 0,
          color: '#666',
          align: 'left',
          margin: 80,
          fontSize: 13,
          formatter: function (value, index) {
            if (opt.index === 0 && index < 3) {
              return '{idx' + index + '|' + (1 + index) + '} {title|' + value + '}';
            } else if (opt.index !== 0 && index + opt.index < 9) {
              return '{idx|0' + (1 + index + opt.index) + '} {title|' + value + '}';
            } else {
              return '{idx|' + (1 + index + opt.index) + '} {title|' + value + '}';
            }
          },
          rich: {
            idx0: {
              color: '#FB375E',
              backgroundColor: '#FFE8EC',
              borderRadius: 100,
              padding: [5, 8],
            },
            idx1: {
              color: '#FF9023',
              backgroundColor: '#FFEACF',
              borderRadius: 100,
              padding: [5, 8],
            },
            idx2: {
              color: '#01B599',
              backgroundColor: '#E1F7F3',
              borderRadius: 100,
              padding: [5, 8],
            },
            idx: {
              color: '#333',
              borderRadius: 100,
              padding: [5, 8],
            },
            title: {
              width: 165,
            },
          },
        },
      },
      {
        triggerEvent: true,
        show: true,
        inverse: true,
        data: getArrByKey(data, 'name'),
        axisLine: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          interval: 0,
          color: '#666',
          align: 'left',
          margin: 20,
          fontSize: 13,
          formatter: function (_, index) {
            return (
              '转化率：' +
              (((data[index]?.value as unknown as number) / data[index].sum) * 100).toFixed(2) +
              '%'
            );
          },
        },
      },
    ],
    series: [
      {
        name: '条',
        type: 'bar',
        yAxisIndex: 0,
        data: data,
        barWidth: 10,
        itemStyle: {
          color: (val) => {
            if (val.dataIndex < 3 && opt.index === 0) {
              return color[val.dataIndex];
            } else {
              return '#1990FF';
            }
          },
          borderRadius: 30,
        },
      },
    ],
  };

  defineProps({
    width: {
      type: String as PropType<string>,
      default: '100%',
    },
    height: {
      type: String as PropType<string>,
      default: '350px',
    },
  });
  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

  onMounted(() => {
    setOptions(option);
  });
</script>
