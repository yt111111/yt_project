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
      ChinaBorder: require("../../util/China.json"),
    };
  },
  mounted() {
    // 初始化矢量底图
    this.initMap1();
    // 初始化影像地图
    // this.initMap2();
    // this.ChinaLine();
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
                  "&tk=93724b915d1898d946ca7dc7b765dda5",
              ],
              tileSize: 256,
            },
            tdtCva: {
              type: "raster",
              tiles: [
                "http://t0.tianditu.gov.cn/cva_c/wmts?" +
                  "SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles" +
                  "&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}" +
                  "&tk=93724b915d1898d946ca7dc7b765dda5",
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
        pitch: 40,
        /* eslint-disable */
        crs: mapboxgl.CRS.EPSG4326,
        // 地图视角切换
        // bearing: -10,
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
                "http://t1.tianditu.com/img_c/wmts?layer=img&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}&tk=93724b915d1898d946ca7dc7b765dda5",
              ],
              tileSize: 256,
            },
            tdtCva: {
              type: "raster",
              tiles: [
                "http://t1.tianditu.com/cia_c/wmts?layer=cia&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}&tk=93724b915d1898d946ca7dc7b765dda5",
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
      // this.handleLine();
      // this.handelPoint();
    },
    // 地图画线
    handleLine() {
      this.map.on("load", () => {
        let geometryLine = {
          type: "Feature",
          geometry: {
            // 定义类型
            type: "LineString",
            coordinates: [
              [113.39793764, 34.05675322],
              [113.35187554, 32.4392251],
              [112.47685179, 31.89344325],
              [112.29263185, 30.75257895],
              [112.43079033, 30.15709126],
              [113.9505599, 29.75808719],
              [114.45714743, 29.23699965],
              [115.34044715, 28.22369668],
              [115.59740867, 27.5140793],
              [115.59740829, 27.45850126],
            ],
          },
        };
        this.map.addLayer({
          id: "river",
          type: "line",
          source: {
            type: "geojson",
            data: geometryLine,
          },
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "red",
            "line-width": 5,
          },
        });
      });
    },
    // 地图自定义打点
    handelPoint() {
      const el = document.createElement("div");
      el.className = "icon_box";
      el.style.width = `100px`;
      el.style.height = `100px`;
      el.style.backgroundSize = "100%";
      el.innerHTML = `
      <div>
        <div class='icon' style='width:30px;height:30px;'></div>
          <span class='title'>文字说明</span>
      </div>`;
      new mapboxgl.Marker(el)
        .setLngLat([118.0626924, 26.71411572])
        .addTo(this.map);
    },
    // 绘制中国边界线（红色）
    ChinaLine() {
      this.ChinaBorder.features[0].geometry.coordinates.forEach((item,index) => {
        let coordinates = [];
        item.forEach((item2) => {
          coordinates.push(item2);
        });
        // 处理中国边界经纬度数据
        this.map.on("load", () => {
          let geometryLine = {
            type: "Feature",
            geometry: {
              // 定义类型
              type: "LineString",
              coordinates: coordinates,
            },
          };
          this.map.addLayer({
            id: "border"+index,
            type: "line",
            source: {
              type: "geojson",
              data: geometryLine,
            },
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            paint: {
              "line-color": "red",
              "line-width": 10,
            },
          });
        });
      });
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
  /deep/.icon_box {
    // position: relative;
    z-index: 8;
    width: 30px !important;
    height: 30px !important;
    font-size: 12px;
    color: #fff;
    // 图片
    .icon {
      width: 30px !important;
      height: 30px !important;
      z-index: 5;
      background-image: url("../../static/location.png");
      background-size: cover;
    }
    // 文字说明样式
    .title {
      position: absolute;
      bottom: 35px;
      white-space: nowrap;
      left: 20px;
      background: #212f7f;
      color: #94e9ff;
      padding: 3px 8px 2px 8px;
      border-radius: 5px;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.3), 0 0 5px rgba(0, 0, 0, 0.3);
    }
  }
}
</style>
