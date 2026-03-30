<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="auto">
        <el-menu
          default-active="/home"
          unique-opened
          router
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-menu-item index="/home">
            <el-icon><icon-menu /></el-icon>
            <template #title>首页</template>
          </el-menu-item>
          <el-menu-item index="/home/about">
            <el-icon><List /></el-icon>
            <!-- <el-icon><setting /></el-icon> -->
            <template #title>列表</template>
          </el-menu-item>
          <el-menu-item index="/home/map">
            <el-icon><List /></el-icon>
            <!-- <el-icon><setting /></el-icon> -->
            <template #title>地图</template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="collapse">
            <el-icon @click="handleCollapse" size="20" v-show="isCollapse"
              ><Expand
            /></el-icon>
            <el-icon @click="handleCollapse" size="20" v-show="!isCollapse"
              ><Fold
            /></el-icon>
          </div>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>
              {{ route.meta.title }}
            </el-breadcrumb-item>
            <!-- <el-breadcrumb-item :to="{ path: '/home/echarts' }">test</el-breadcrumb-item> -->
          </el-breadcrumb>
        </el-header>
        <el-main>
          <!-- <el-card shadow="always"> -->
          <div class="home_page" v-if="route.name === 'home'">
            <EchartsView />
          </div>
          <RouterView v-else />
          <!-- </el-card> -->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { ref } from "vue";
import EchartsView from "@/components/homepege/EchartsView.vue";
import { Menu as IconMenu, Setting, List, Expand, Fold } from "@element-plus/icons-vue";
import { useRoute } from "vue-router";
const route = useRoute();
console.log(route);

const isCollapse = ref(false);
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
  console.log(key, keyPath);
};
const handleCollapse = () => {
  isCollapse.value = !isCollapse.value;
  // console.log(val);
};
</script>

<style scoped>
.common-layout {
  height: 100%;
  color: #666;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.el-header {
  line-height: 60px;
  display: flex;
  align-items: center;
  .collapse {
    cursor: pointer;
    margin-right: 20px;
    margin-top: 8px;
  }
}
.el-aside {
  text-align: center;
  &.active {
    width: 63px;
  }
}
.el-menu {
  height: 100%;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-main {
  padding: 10px;
}
</style>
