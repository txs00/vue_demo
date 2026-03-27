<template>
  <div class="home_view">
    <el-table border stripe :data="tableData" style="width: 100%" max-height="400px">
      <el-table-column align="center" type="index" label="序号" />
      <el-table-column prop="title" align="center" label="标题" show-overflow-tooltip />
      <el-table-column prop="brief" align="center" label="描述" show-overflow-tooltip />
      <el-table-column
        :formatter="labelData"
        label="标签"
        align="center"
        show-overflow-tooltip
      >
        <!-- <template #default="scope"> {{ labelData(scope.row) }} </template> -->
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { HomeList } from "@/api/home";
import { onMounted } from "vue";
import { ref } from "vue";
const tableData = ref([]);
onMounted(async () => {
  const res = await HomeList();
  if (res.code === 200) {
    tableData.value = res.items;
  }
  console.log(res);
});
const labelData = (val) => {
  return val.tags?.join("，") || "无";
};
</script>

<style lang="scss" scoped></style>
