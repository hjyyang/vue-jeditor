import MarkdownIt from "markdown-it";
import markdownItAttrs from "markdown-it-attrs";
import markdownItSpan from "./markdown-it-span";
import markdownItIns from "markdown-it-ins";

var mdFunc = function(hljs, languages = {}) {
	if (hljs) {
		for (let i in languages) {
			if (typeof languages[i] == "function") {
				hljs.registerLanguage(i, languages[i]);
			}
		}
	}
	let md = MarkdownIt({
		html: false, // 在源码中启用 HTML 标签
		xhtmlOut: false, // 使用 '/' 来闭合单标签 （比如 <br />）。
		// 这个选项只对完全的 CommonMark 模式兼容。
		breaks: true, // 转换段落里的 '\n' 到 <br>。
		langPrefix: "language-", // 给围栏代码块的 CSS 语言前缀。对于额外的高亮代码非常有用。
		linkify: false, // 将类似 URL 的文本自动转换为链接。

		// 启用一些语言中立的替换 + 引号美化
		typographer: false,

		// 当 typographer 启用时，成倍的 + 单引号替换对。
		// 或者智能(smartquotes)引号等，可以是 String 或 Array。
		//
		// 比方说，你可以支持 '«»„“' 给俄罗斯人使用， '„“‚‘'  给德国人使用。
		// 还有 ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] 给法国人使用（包括 nbsp）。
		quotes: "“”‘’",

		// 高亮函数，会返回转义的 HTML。
		// 如果源字符串未更改，且应该进行外部的转义，或许返回 ''
		// 如果结果以 <pre ... 开头，内部包装器则会跳过。
		highlight: function(str, lang) {
			if (!hljs) {
				try {
					return '<pre class="code hljs"><code class="' + lang + '">' + md.utils.escapeHtml(str) + "</code></pre>";
				} catch (__) {}
			}
			if (lang && hljs.getLanguage(lang)) {
				try {
					return '<pre class="code hljs"><code class="' + lang + '">' + hljs.highlight(lang, str, true).value + "</code></pre>";
				} catch (__) {}
			}
			return "<pre class='code'><code>" + md.utils.escapeHtml(str) + "</code></pre>";
		},
	})
		.use(markdownItAttrs, {
			//添加属性
			leftDelimiter: "{{",
			rightDelimiter: "}}",
			allowedAttributes: ["id", "class", /^style.*$/],
		})
		.use(markdownItSpan)
		.use(markdownItIns);
	return md;
};
export default mdFunc;
