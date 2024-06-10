<template>
  <div ref="chartRef" :style="{ height, width }"></div>
</template>
<script lang="ts" setup>
  import { onMounted, PropType, ref, Ref } from 'vue';
  import { useECharts } from '@/hooks/web/useECharts';
  import { EChartsOption } from 'echarts';

  defineProps({
    width: {
      type: String as PropType<string>,
      default: '100%',
    },
    height: {
      type: String as PropType<string>,
      default: '385px',
    },
  });

  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions, echarts } = useECharts(chartRef as Ref<HTMLDivElement>);

  const option: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line',
      },
      backgroundColor: 'rgba(9, 24, 48, 0.5)',
      borderColor: 'rgba(75, 253, 238, 0.4)',
      textStyle: {
        color: '#CFE3FC',
      },
    },
    legend: [
      {
        data: ['成交订单(个)'],
        top: '0',
        x: '0',
        itemWidth: 8,
        borderColor: 'rgba(255, 192, 0, 1)',
        textStyle: {
          fontSize: 12,
        },
        icon: 'circle',
      },
      {
        data: ['总订单(个)'],
        top: '0',
        x: '15%',
        itemWidth: 8,
        textStyle: {
          fontSize: 12,
        },
        icon: 'circle',
      },
      {
        data: ['转化率(%)'],
        top: '0',
        x: '30%',
        itemStyle: {
          borderWidth: 2,
        },
        textStyle: {
          fontSize: 12,
        },
        itemWidth: 15,
        itemHeight: 8,
      },
    ],
    grid: {
      left: '20px',
      right: '20px',
      top: '70px',
      bottom: '30px',
      containLabel: true,
    },
    toolbox: {
      show: true,
      orient: 'vertical',
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: true,
        axisTick: {
          show: false,
        },
        data: [
          '西城区',
          '顺义区',
          '朝阳区',
          '大兴区',
          '海淀区',
          '昌平区',
          '西城区',
          '东城区',
          '丰台区',
        ],
        axisLine: {
          show: false,
        },
        axisLabel: {
          interval: 0,
          fontSize: 14,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        axisTick: {
          show: false,
        },
        axisLine: {
          show: true,
          lineStyle: {},
          symbol: ['none', 'arrow'],
          symbolSize: [5, 12],
          symbolOffset: [0, 10],
        },
        max: 100,
        axisLabel: {
          interval: 0,
          fontSize: 14,
        },
        splitLine: {
          show: true,
          lineStyle: {
            width: 1,
            type: 'solid',
          },
        },
      },
      {
        type: 'value',
        axisTick: {
          show: false,
        },

        axisLine: {
          show: false,

          symbol: ['none', 'arrow'],
          symbolSize: [5, 12],
          symbolOffset: [0, 10],
        },
        min: 0,
        max: 100,
        axisLabel: {
          interval: 0,
          fontSize: 14,
          formatter: '{value} %',
        },
        splitLine: {
          show: false,
          lineStyle: {
            width: 1,
            type: 'solid',
          },
        },
      },
    ],
    series: [
      {
        name: '转化率(%)',
        yAxisIndex: 1,
        type: 'line',
        smooth: true,
        showSymbol: false,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(32,128,247,.4)',
            },
            {
              offset: 1,
              color: 'rgba(32,128,247,0)',
            },
          ]),
        },
        data: [30, 50, 58, 42, 68, 72, 20, 78, 24],
        symbol: 'circle',
        symbolSize: 8,
        color: '#2080F7',
        lineStyle: {
          color: '#2080F7',
        },
      },
      {
        z: 2,
        type: 'bar',
        yAxisIndex: 0,
        name: '成交订单(个)',
        color: '#2080F7',
        barWidth: 24,
        data: [89, 46, 92, 64, 48, 82, 25, 44, 95],
      },
      {
        z: 1,
        type: 'bar',
        barGap: '-100%',
        yAxisIndex: 0,
        name: '总订单(个)',
        color: '#B2D4FF',
        barWidth: 24,
        data: [44, 66, 22, 25, 29, 32, 46, 84, 24],
      },
    ],
  };

  onMounted(() => {
    setOptions(option);
  });
</script>
