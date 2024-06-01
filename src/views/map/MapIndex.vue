<template>
  <div class="map_containers">
    <div id="Map"></div>
  </div>
</template>
<script>
export default {
  name: "MapIndex",
  data() {
    return {
      // 存储地图
      map: null,
    };
  },
  mounted() {
    // 初始化矢量底图
    // this.initMap1();
    // 初始化影像地图
    this.initMap2();
  },
  methods: {
    // 初始化地图(矢量底图+矢量注记)
    initMap1() {
      let mapOptions = {
        container: "Map", // container id
        style: {
          version: 8,
          sources: {
            tdtVec: {
              type: "raster",
              tiles: [
                "http://t0.tianditu.gov.cn/vec_c/wmts?" +
                  "SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles" +
                  "&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}" +
                  "&tk=你的天地图的key",
              ],
              tileSize: 256,
            },
            tdtCva: {
              type: "raster",
              tiles: [
                "http://t0.tianditu.gov.cn/cva_c/wmts?" +
                  "SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles" +
                  "&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}" +
                  "&tk=你的天地图的key",
              ],
              tileSize: 256,
            },
          },
          layers: [
            {
              id: "tdtVec",
              type: "raster",
              source: "tdtVec",
              minzoom: 0,
              maxzoom: 22,
            },
            {
              id: "tdtVec2",
              type: "raster",
              source: "tdtCva",
              minzoom: 0,
              maxzoom: 22,
            },
          ],
        },
        center: [118.12, 25.9], // starting position
        zoom: 8, // starting zoom
        pitch: 60,
        /* eslint-disable */
        crs: mapboxgl.CRS.EPSG4326,
        // 地图视角切换
        bearing: -10,
      };
      /* eslint-disable */
      this.map = new mapboxgl.Map(mapOptions);
    },
    // 初始化地图(影像底图+影像注记)
    initMap2() {
      let mapOptions = {
        container: "Map", // container id
        style: {
          version: 8,
          sources: {
            tdtVec: {
              type: "raster",
              tiles: [
                "http://t1.tianditu.com/img_c/wmts?layer=img&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}&tk=你的天地图的key",
              ],
              tileSize: 256,
            },
            tdtCva: {
              type: "raster",
              tiles: [
                "http://t1.tianditu.com/cia_c/wmts?layer=cia&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}&tk=你的天地图的key",
              ],
              tileSize: 256,
            },
          },
          layers: [
            {
              id: "tdtVec",
              type: "raster",
              source: "tdtVec",
              minzoom: 0,
              maxzoom: 22,
            },
            {
              id: "tdtVec2",
              type: "raster",
              source: "tdtCva",
              minzoom: 0,
              maxzoom: 22,
            },
          ],
        },
        center: [118.12, 25.9], // starting position
        zoom: 8, // starting zoom
        pitch: 60,
        /* eslint-disable */
        crs: mapboxgl.CRS.EPSG4326,
        // 地图视角切换
        bearing: -10,
      };
      /* eslint-disable */
      this.map = new mapboxgl.Map(mapOptions);
    },
  },
};
</script>
<style lang="less" scoped>
.map_containers {
  width: 100vw;
  height: 100vh;
  #Map {
    width: 100%;
    height: 100%;
  }
}
</style>
