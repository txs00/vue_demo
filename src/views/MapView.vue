<template>
  <el-card>
    <div class="map_control" v-draggable>
      <el-switch
        v-model="Mode_3d"
        inactive-text="标准地图"
        @click="initAMap"
        active-text="3d地图"
      >
      </el-switch>
      <span>地图主题:</span>
      <el-select v-model="Theme" @change="changeTheme" placeholder="请选择主题">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div id="map_demo" v-loading="loadingMap"></div>
  </el-card>
</template>

<script setup>
import AMapLoader from "@amap/amap-jsapi-loader";
import { onMounted, onUnmounted, ref, reactive } from "vue";

// 地图初始化/3d切换功能
let map = null; // 地图对象
const loadingMap = ref(true); // 地图加载状态
const Mode_3d = ref(false); // 是否开启3D模式

const initAMap = async () => {
  //地图初始化
  window._AMapSecurityConfig = {
    securityJsCode: "8c548420d145848faa2b0cb859d71c53",
  };
  //   创建地图模型对象
  const AMap = await AMapLoader.load({
    key: "1ac6a701e6fbe056d033937b56ec59db", // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ["AMap.Scale"], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  });

  // 获取用户位置功能 高精度定位
  let geolocation = null;
  AMap.plugin("AMap.Geolocation", function () {
    geolocation = new AMap.Geolocation({
      enableHighAccuracy: true, // 是否使用高精度定位，默认值：false

      timeout: 10000, // 超过10秒后停止定位，默认值：无穷大

      maximumAge: 0, // 定位结果缓存0毫秒，默认值：0
    });
  });
  geolocation.getCurrentPosition((status, result) => {
    //   渲染地图
    map = new AMap.Map("map_demo", {
      pitch: 50, //地图俯仰角度，有效范围 0 度- 83 度
      viewMode: Mode_3d.value ? "3D" : "2D", //地图模式
      rotateEnable: true, //是否开启地图旋转交互 鼠标右键 + 鼠标画圈移动 或 键盘Ctrl + 鼠标左键画圈移动
      pitchEnable: true, //是否开启地图倾斜交互 鼠标右键 + 鼠标上下移动或键盘Ctrl + 鼠标左键上下移动
      zoom: 17, //初始化地图层级
      // rotation: -15, //初始地图顺时针旋转的角度
      zooms: [2, 20], //地图显示的缩放级别范围
      center: [result.position.lng, result.position.lat], //地图中心点位置
    });
    // 添加标记点
    const maker = new AMap.Marker({
      position: [result.position.lng, result.position.lat], //标记位置
      title: "中心点",
    });
    map.add(maker);
    loadingMap.value = false;
  });
};

// 切换主题功能
const Theme = ref("amap://styles/normal"); // 当前主题

// 主题选项列表
const options = reactive([
  {
    value: "amap://styles/normal",
    label: "标准",
  },
  {
    value: "amap://styles/dark",
    label: "幻影黑",
  },
  {
    value: "amap://styles/light",
    label: "月光银",
  },
  {
    value: "amap://styles/whitesmoke",
    label: "远山黛",
  },
  {
    value: "amap://styles/fresh",
    label: "草色青",
  },
  {
    value: "amap://styles/grey",
    label: "雅士灰",
  },
  {
    value: "amap://styles/graffiti",
    label: "涂鸦",
  },
  {
    value: "amap://styles/macaron",
    label: "马卡龙",
  },
  {
    value: "amap://styles/blue",
    label: "靛青蓝",
  },
  {
    value: "amap://styles/darkblue",
    label: "极夜蓝",
  },
  {
    value: "amap://styles/wine",
    label: "酱籽",
  },
]);

const changeTheme = (value) => {
  // 选中主题变更时调用
  map.setMapStyle(value);
};
onMounted(() => {
  initAMap();
});

onUnmounted(() => {
  map?.destroy();
});
</script>

<style scoped>
.el-card {
  width: 1000px;
  height: 800px;
  position: relative;
}
#map_demo {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
.map_control {
  width: 500px;
  height: 50px;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  position: absolute;
  z-index: 1;
  right: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  span {
    margin: 0 10px 0 40px;
  }
  .el-select {
    width: 200px;
  }
}
</style>
