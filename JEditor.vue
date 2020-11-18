<template>
	<div class="j-editor" :class="{ fullscreen: isFullscreen }" @keydown="onKeydown" @keyup="onKeyup" :style="'font-size:' + fontSize + ';'">
		<!--工具栏-->
		<div class="editor-toolbar" :style="'background-color:' + toolbarsBackground + ';'">
			<ToolbarLeft
				:toolbars="toolbars"
				:color="color"
				:imageUoload="imageUoload"
				:imageComplete="imageComplete"
				:fileName="fileName"
				:codes="languages"
				@toolbar-left-click="toolbar_left_click"
				@toolbar-left-especial="toolbar_left_especial"
			></ToolbarLeft>
			<ToolbarRight
				:toolbars="toolbars"
				:preview="isPreview"
				:fullscreen="isFullscreen"
				:htmlcode="isHtmlcode"
				@toolbar-right-click="toolbar_right_click"
			></ToolbarRight>
		</div>
		<div class="editor-panel" :class="{ preview: isPreview }" :style="'font-size:' + fontSize + 'px;font-family:monospace;'">
			<div
				class="editor-edit"
				@click.self="isFocus = true"
				@scroll="editScroll"
				:style="'background-color:' + editorBackground + ';'"
				ref="edit"
			>
				<AutoTextarea ref="autoTextarea" :preArr="preArr" :focus.sync="isFocus" v-model="editContent" />
			</div>
			<div class="editor-show" v-show="isPreview" :style="'background-color:' + previewBackground + ';'" ref="preview">
				<div class="show-content" v-html="html" v-show="!isHtmlcode"></div>
				<div class="show-content-html" v-text="html" v-show="isHtmlcode"></div>
			</div>
		</div>
	</div>
</template>

<script>
import ToolbarLeft from "./src/components/toolbar-left.vue";
import ToolbarRight from "./src/components/toolbar-right.vue";
import AutoTextarea from "./src/components/auto-textarea.vue";
import CONFIG from "./src/lib/config";
import { toolbarLeftClick, toolbarLeftEspecial } from "./src/lib/toolbar-left-click";
import toolbarRightClick from "./src/lib/toolbar-right-click";
import { insertTextAtCaret, insertOl, insertUl, scrollSync, keydownEvent, keyupEvent, mdParse } from "./src/lib/core";
import mdFunc from "./src/lib/markdown";
import "./src/font/iconfont.css";
import lang from "./src/lang";
export default {
	name: "JEditor",
	props: {
		toolbars: {
			//工具栏
			type: Object,
			default() {
				return CONFIG.toolbars;
			},
		},
		color: {
			//颜色
			type: Array,
			default() {
				return CONFIG.color;
			},
		},
		fontSize: {
			// 字体大小
			type: String,
			default: "14px",
		},
		toolbarsBackground: {
			// 工具栏背景色
			type: String,
			default: "#ffffff",
		},
		editorBackground: {
			// TODO: 编辑栏背景色
			type: String,
			default: "#ffffff",
		},
		previewBackground: {
			// 预览栏背景色
			type: String,
			default: "#fbfbfb",
		},
		preview: {
			//预览
			type: Boolean,
			default: true,
		},
		fullscreen: {
			//全屏编辑
			type: Boolean,
			default: false,
		},
		value: {
			// 初始 value
			type: String,
			default: "",
		},
		htmlcode: {
			// 查看html
			type: Boolean,
			default: false,
		},
		imageUoload: Function, //自定义上传方法
		imageComplete: Function, //覆盖图片按钮方法，使用这个将不出现下拉选项
		action: {
			//上传的地址
			type: String,
			default: "/",
		},
		headers: {
			type: Object,
			default() {
				return {};
			},
		},
		fileName: {
			//上传的文件字段名
			type: String,
			default: "file",
		},
		fileData: {
			//上传时附带的额外参数
			type: Object,
			default() {
				return {};
			},
		},
		tabSize: {
			type: Number,
			default: 4,
		},
		"on-success": Function, //上传成功回调
		"on-progress": Function, //上传进度回调
		"on-error": Function, //上传失败回调
		save: Function,
		hljs: Object,
		languages: Object,
		i18n: {
			type: String,
			default: "en",
		},
	},
	data() {
		return {
			isFocus: false,
			editContent: "",
			isPreview: true,
			isFullscreen: false,
			isHtmlcode: false,
			html: "",
			editTimer: null,
			scrollOption: [],
			ctrlDown: false,
			valueTimer: null,
			md: {},
			hljsObj: null,
			hljsLang: null,
			tokens: [],
			preArr: "",
			scrollLock: false, //滚动锁，在输入时禁止
			resizeTimer: null,
		};
	},
	watch: {
		value(val) {
			this.editContent = val === null ? "" : val;
		},
		/**
		 * 与父组件数据双向绑定，textarea组件传值过来后使父组件改变值将值流动到本组件
		 */
		editContent(val) {
			this.scrollLock = true;
			let dom = mdParse(this.md, val, this);
			this.html = dom.html;
			this.preArr = dom.pre;
			this.$emit("input", val);
			if (this.valueTimer) {
				clearTimeout(this.valueTimer);
				this.valueTimer = null;
			}
			this.valueTimer = setTimeout(() => {
				this.$nextTick(() => {
					this.textOffset();
				});
			}, 40);
		},
		preview(val) {
			this.isPreview = val;
		},
		fullscreen(val) {
			this.isFullscreen = val;
		},
		htmlcode(val) {
			this.isHtmlcode = val;
		},
	},
	mounted() {
		this.initValue();
		this.$nextTick(() => {
			this.textOffset();
		});
		window.addEventListener("resize", this.windowResize);
	},
	created() {
		lang(this.i18n);
		this.hljsObj = this.$j_hljs && this.$j_hljs.hljs ? this.$j_hljs.hljs : this.hljs;
		this.hljsLang = this.$j_hljs && this.$j_hljs.languages ? this.$j_hljs.languages : this.languages;
		this.md = mdFunc(this.hljsObj, this.hljsLang);
	},
	methods: {
		initValue() {
			this.editContent = this.value === null ? "" : this.value;
			this.isPreview = this.preview;
			this.isFullscreen = this.fullscreen;
			this.isHtmlcode = this.htmlcode;
		},
		/**
		 * 执行右工具栏中的点击事件
		 * @param  {[type]} type  点击类型
		 */
		toolbar_right_click(type) {
			toolbarRightClick(type, this);
		},
		/**
		 * 执行左工具栏中的点击事件
		 * @param  {[type]} type  点击类型
		 */
		toolbar_left_click(type) {
			toolbarLeftClick(type, this);
		},
		/**
		 * 执行左工具栏中的自定义标签操作
		 * @param  {[type]} op       操作参数
		 * @param  {[type]} op.type  点击类型
		 * @param  {[type]} op.val   值
		 */
		toolbar_left_especial(op) {
			toolbarLeftEspecial(op, this);
		},
		/**
		 * 切换预览
		 * @param  {[type]} val  是否预览
		 */
		previewtoggle(val) {
			this.isPreview = val;
			this.$emit("update:preview", val);
		},
		/**
		 * 切换全屏
		 * @param  {[type]} val  是否全屏
		 */
		fullscreentoggle(val) {
			this.isFullscreen = val;
			this.$emit("update:fullscreen", val);
		},
		/**
		 * 查看输入结果html
		 * @param  {[type]} val  是否查看输入结果html
		 */
		htmlcodetoggle(val) {
			this.isHtmlcode = val;
			this.$emit("update:htmlcode", val);
		},
		/**
		 * 获取textarea节点
		 * @return  返回一个节点
		 */
		getAutoTextarea() {
			return this.$refs.autoTextarea.$refs.textarea;
		},
		/**
		 * 编辑器插入文案
		 * @param  {[type]} dom     编辑器textarea节点
		 * @param  {[type]} prefix  输入文案前缀
		 * @param  {[type]} subfix  输入文案后缀
		 * @param  {[type]} str     输入文案
		 */
		insertText(insertText) {
			insertTextAtCaret(this.getAutoTextarea(), insertText, this);
		},
		/**
		 * 插入有序列表
		 */
		insertOl() {
			insertOl(this.getAutoTextarea(), this);
		},
		/**
		 * 插入无序列表
		 */
		insertUl() {
			insertUl(this.getAutoTextarea(), this);
		},
		/**
		 * 获取节点数
		 */
		textOffset() {
			let option = {
				editRow: document.querySelectorAll(".auto-textarea .code pre.isblock"),
				showRow: document.querySelector(".editor-show").querySelectorAll("p,h1,h2,h3,h4,h5,h6,table,pre,ul,ol"),
				editEndTop: document.querySelector(".auto-textarea .code").clientHeight,
				showEndTop: document.querySelector(".editor-show .show-content").clientHeight,
				preOffset: [],
			};
			this.inputScroll(option);
			for (let i = 0; i < option.editRow.length; i++) {
				option.preOffset.push(option.editRow[i].offsetTop);
			}
			option.preOffset.push(option.editEndTop);
			this.scrollOption = option;
			this.scrollLock = false;
		},
		/**
		 * 监听编辑输入联动预览滚动距离
		 */
		inputScroll(option) {
			let currentRow = document.querySelector(".auto-textarea .code .isblock.current");
			if (currentRow) {
				let index = currentRow.dataset.index,
					rowPre = (currentRow.dataset.row - 1) / currentRow.dataset.rows;
				this.$refs.preview.scrollTop = option.showRow[index - 1].offsetTop + currentRow.offsetHeight * rowPre - 40;
			}
		},
		/**
		 * 监听编辑栏滚动
		 */
		editScroll(e) {
			if (this.isHtmlcode) return false;
			if (this.editTimer) {
				clearTimeout(this.editTimer);
				this.editTimer = null;
			}
			this.editTimer = setTimeout(() => {
				scrollSync(e, this);
			}, 10);
		},
		/**
		 * 监听键盘按下
		 */
		onKeydown(e) {
			if (e.keyCode == 17 || e.keyCode == 91) this.ctrlDown = true;
			keydownEvent(e, this);
		},
		/**
		 * 监听键盘抬起
		 */
		onKeyup(e) {
			if (e.keyCode == 17 || e.keyCode == 91) this.ctrlDown = false;
			keyupEvent(e, this);
		},
		/**
		 * 窗口大小改变
		 */
		windowResize() {
			if (this.resizeTimer) {
				clearTimeout(this.resizeTimer);
			}
			this.resizeTimer = setTimeout(() => {
				this.textOffset();
			}, 300);
		},
	},
	beforeDestroy() {
		window.removeEventListener("resize", this.windowResize);
	},
	components: {
		ToolbarLeft,
		ToolbarRight,
		AutoTextarea,
	},
};
</script>
