<template>
	<div id="app">
		<JEditor
			v-model="content"
			:hljs="hljs"
			:languages="languages"
			:on-success="onSuccess"
			action="http://localhost:8080/j_api/file/upload"
			:headers="headers"
			ref="editor"
		/>
	</div>
</template>

<script>
import JEditor from "./index";
import hljs from "highlight.js/lib/core";
import css from "highlight.js/lib/languages/css";
import javascript from "highlight.js/lib/languages/javascript";
import "./src/css/monokai-sublime.css";
import text from "./README.md"
export default {
	components: {
		JEditor,
	},
	data() {
		return {
			content: text,
			hljs: hljs,
			languages: {
				css,
				javascript,
			},
			headers: {
				authorization:
					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1X2lkIjoxMiwidV9uYW1lIjoiam9uIiwidV9lbWFpbCI6IjEyMzEyMyIsInVfcm9sZSI6MiwiY3JlYXRlZCI6IjIwMjAtMDgtMTdUMDg6NDk6MTEuMDc3WiIsImlhdCI6MTYwMjcyODU3MiwiZXhwIjoxNjAyODE0OTcyfQ.RCLF8bB3laekZwKa883Jep_J3Nxt4MvwtZelT7sTNe4",
			},
		};
	},
	methods: {
		onSuccess(res, file) {
			console.log(file);
		},
	},
	mounted() {
		// this.$refs.editor.insertText({ prefix: "![", subfix: ")", str: "](https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3892521478,1695688217&fm=26&gp=0.jpg" });
	},
};
</script>

<style>
html {
	height: 100%;
}
body {
	height: 90%;
	background: #eef5f9;
}
#app {
	height: 100%;
	padding-top: 300px;
	box-sizing: border-box;
}
</style>
