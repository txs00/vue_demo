<template>
  <div class="data_presentation">
    <Bar />
    <Pie />
    <Line />
    <Radar />
  </div>
</template>

<script setup>
import Bar from "@/components/echarts/Bar.vue";
import Line from "@/components/echarts/Line.vue";
import Pie from "@/components/echarts/Pie.vue";
import Radar from "@/components/echarts/Radar.vue";
</script>

<style scoped>
.data_presentation {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
</style>
