<template>
  <div class="map_containers">
    <div id="Map"></div>
  </div>
</template>
<script>
export default {
  name: "MapIndex",
  data() {
    return {};
  },
  mounted(){},
  methods:{
    // 初始化地图
  }
};
</script>
<style lang="less" scoped>
.map_containers {
  width: 100vw;
  height: 100vh;
  #Map{
    width: 100%;
    height: 80%;
  }
}
</style>
