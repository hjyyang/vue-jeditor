import Vue from "vue";
import App from "./App.vue";
import "./src/css/main.scss";
// import JEditor from "./index";
// import hljs from "highlight.js/lib/core";
// import css from "highlight.js/lib/languages/css";
// import javascript from "highlight.js/lib/languages/javascript";

Vue.config.productionTip = false;
// Vue.use(JEditor, { hljs, languages: { javascript, css } });

new Vue({
	el: "#app",
	render: (h) => h(App),
});
