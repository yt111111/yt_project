import Vue from "vue";
import Router from "vue-router";
// 引入模块
const MapIndex = () => import("@/views/map/MapIndex.vue");
// 安装路由
Vue.use(Router);
// 创建路由实例
const router = new Router({
  // 创建路由对象
  routes: [
    {
      path: "/",
      // 重定项
      redirect: "/mapIndex",
    },
    {
      path: "/mapIndex",
      component: MapIndex,
    },
  ]
});
/* 因为要挂载导航守卫 所以不能实时导出 */
export default router;
