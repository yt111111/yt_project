import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// 导入引入的elementui组件
import "@/plugins/element.js"
Vue.config.productionTip = false;
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
