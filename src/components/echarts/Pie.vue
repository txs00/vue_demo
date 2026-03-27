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
  series: [
    {
      type: "pie",
      data: [
        {
          value: 300,
          name: "研发技术部",
          label: {
            show: true,
            // position: "inside",
            formatter: "{b} {c} ({d}%)",
          },
        },
        {
          value: 320,
          name: "产品管理部",
          label: {
            show: true,
            formatter: "{b} {c} ({d}%)",
          },
        },
        {
          value: 340,
          name: "业务运营部",
          label: {
            show: true,
            formatter: "{b} {c} ({d}%)",
          },
        },
        {
          value: 360,
          name: "UI设计部",
          label: {
            show: true,
            formatter: "{b} {c} ({d}%)",
          },
        },
        {
          value: 380,
          name: "人事出纳部",
          label: {
            show: true,
            formatter: "{b} {c} ({d}%)",
          },
        },
      ],
      roseType: "area",
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
