import "./src/css/main.scss";

import jEditor from "./JEditor.vue";
const plugin = {
	jEditor,
	LeftToolbar: import("./src/components/toolbar-left.vue"),
	RightToolbar: import("./src/components/toolbar-right.vue"),
	install: function(Vue, hljs) {
		if (hljs && typeof hljs === "object") Vue.prototype.$j_hljs = hljs;
		Vue.component(jEditor.name, jEditor);
	},
};

Object.assign(jEditor, plugin);

export default jEditor;
