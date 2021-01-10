import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import "material-design-icons-iconfont/dist/material-design-icons.css"; // Ensure you are using css-loader
import "@mdi/font/css/materialdesignicons.css"; // Ensure you are using css-loader
import VueFroala from "vue-froala-wysiwyg";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import Clipboard from "v-clipboard";
Vue.use(Antd);
Vue.use(Clipboard);

require("froala-editor/js/froala_editor.pkgd.min.js");
// require('froala-editor/js/third_party/image_aviary.min.js')
require("froala-editor/js/plugins/draggable.min.js");
require("froala-editor/js/plugins/image.min.js");
require("froala-editor/js/plugins/font_family.min.js");
require("froala-editor/js/plugins/url.min.js");
require("froala-editor/js/plugins/link.min.js");
// Require Froala Editor css files.
require("froala-editor/css/froala_editor.pkgd.min.css");
require("font-awesome/css/font-awesome.css");
require("froala-editor/css/froala_style.min.css");
require("froala-editor/css/plugins/draggable.min.css");
require("froala-editor/css/plugins/image.min.css");
require("froala-editor/css/themes/red.min.css");
require("froala-editor/css/themes/dark.min.css");

Vue.config.productionTip = false;
import myPlugin from "@/plugins/myMixin";
// import VueHtmlToPaper from "vue-html-to-paper";

// const options = {
//   name: "_blank",
//   specs: ["fullscreen=yes", "titlebar=yes", "scrollbars=yes"],
//   styles: [
//     "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css",
//     "https://unpkg.com/vue-easy-print@0.0.6/dist/vue-easy-print.css",
//   ],
// };

// Vue.use(VueHtmlToPaper, options);
// import VueHtml2pdf from "vue-html2pdf";
// Vue.use(VueHtml2pdf);

Vue.use(VueFroala);
Vue.use(myPlugin);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
