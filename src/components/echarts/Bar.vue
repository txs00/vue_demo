<template>
  <el-card>
    <div ref="echartsRef" style="width: 100%; height: 100%"></div>
  </el-card>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from "vue";
import { ref } from "vue";
import echatrs from "@/assets/echarts";
let timer = null;
const echartsRef = ref(null);
let chartInstance = null;
let data = [];
for (let i = 0; i < 5; ++i) {
  data.push(Math.round(Math.random() * 200));
}

const option = {
  title: {
    text: "1-6月各部门业绩图览",
  },
  xAxis: {
    max: "dataMax",
  },
  yAxis: {
    type: "category",
    data: ["研发技术部", "产品管理部", "业务运营部", "UI设计部", "人事出纳部"],
    inverse: true,
    animationDuration: 300,
    animationDurationUpdate: 300,
    // max: 2, // only the largest 3 bars will be displayed
  },
  series: [
    {
      realtimeSort: true,
      name: "业绩/1-6月",
      type: "bar",
      data: data,
      label: {
        show: true,
        position: "right",
        valueAnimation: true,
      },
    },
  ],
  legend: {
    show: true,
  },
  animationDuration: 3000,
  animationDurationUpdate: 3000,
  animationEasing: "linear",
  animationEasingUpdate: "linear",
};
const chatrInit = () => {
  if (echartsRef.value) {
    chartInstance = echatrs.init(echartsRef.value);
    chartInstance.setOption(option);
  }
};
const update = () => {
  let data = option.series[0].data;
  for (var i = 0; i < data.length; ++i) {
    if (Math.random() > 0.9) {
      data[i] += Math.round(Math.random() * 2000);
    } else {
      data[i] += Math.round(Math.random() * 200);
    }
  }
  chartInstance.setOption(option);
};
const resizeChart = () => {
  if (chartInstance) {
    chartInstance.resize();
  }
};
onMounted(() => {
  chatrInit();
  timer = setInterval(() => {
    update();
  }, 2000);
  window.addEventListener("resize", resizeChart);
});
onBeforeUnmount(() => {
  clearInterval(timer);
  window.removeEventListener("resize", resizeChart);
  chartInstance?.dispose();
});
</script>

<style scoped>
.el-card {
  width: 40%;
  height: 300px;
  margin: 20px;
}
</style>
