<template>
  <el-card>
    <div ref="echartsRef" style="width: 100%; height: 100%"></div>
  </el-card>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from "vue";
import { ref } from "vue";
import echatrs from "@/assets/echarts";
const echartsRef = ref(null);
let chartInstance = null;
const option = {
  title: {
    text: "1-6月各部门业绩图览",
  },
  xAxis: {
    type: "category",
    data: ["研发技术部", "产品管理部", "业务运营部", "UI设计部", "人事出纳部"],
    axisLabel: {
      interval: 0,
      rotate: 45,
    },
  },
  yAxis: {},
  series: [
    {
      data: [10, 22, 28, 23, 19],
      type: "line",
      areaStyle: {},
    },
    {
      data: [25, 14, 23, 35, 10],
      type: "line",
      areaStyle: {
        color: "#ff0",
        opacity: 0.5,
      },
    },
  ],
};
const chatrInit = () => {
  if (echartsRef.value) {
    chartInstance = echatrs.init(echartsRef.value);
    chartInstance.setOption(option);
  }
};
const resizeChart = () => {
  if (chartInstance) {
    chartInstance.resize();
  }
};
onMounted(() => {
  chatrInit();
  window.addEventListener("resize", resizeChart);
});
onBeforeUnmount(() => {
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
