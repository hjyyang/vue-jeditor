<script>
export default {
	props: {
		focus: {
			type: Boolean,
			default: false,
		},
		value: {
			type: String,
			default: "",
		},
		autofocus: {
			type: Boolean,
			default: false,
		},
		preArr: {
			type: String,
			default: "",
		},
	},
	data() {
		return {
			content: "",
			j_autofocus: (() => {
				if (this.autofocus) {
					return "autofocus";
				} else {
					null;
				}
			})(),
		};
	},
	render(h) {
		var html;
		html = (
			<div class="auto-textarea">
				<div class="auto-textarea-wrap">
					<div class="code" domPropsInnerHTML={this.preArr}></div>
					<textarea ref="textarea" spellcheck="false" value={this.content} onInput={this.input} onBlur={this.onBlur}></textarea>
				</div>
			</div>
		);
		return html;
	},
	watch: {
		focus(val) {
			if (val) {
				this.$refs.textarea.focus();
			} else {
				this.$refs.textarea.blur();
			}
		},
		value(val) {
			this.content = val;
		},
		content(val) {
			this.$emit("input", val);
		},
	},
	mounted() {
		this.content = this.value;
	},
	methods: {
		onBlur() {
			this.$emit("update:focus", false);
		},
		input(e) {
			this.content = e.target.value;
		},
	},
};
</script>

<style lang="scss">
.auto-textarea {
	.auto-textarea-wrap {
		position: relative;
		height: 100%;
	}
	textarea {
		position: absolute;
		top: 0;
		left: 0;
		display: block;
		width: 100%;
		min-height: 100%;
		padding: 8px 16px 15px;
		margin: 0;
		line-height: 1.5;
		box-sizing: border-box;
		border: none;
		outline: none;
		resize: none;
		overflow: hidden;
		font-size: inherit;
	}
	.code {
		white-space: pre-wrap;
		word-wrap: break-word;
		word-break: normal;
		visibility: hidden;
		margin: 0;
		padding: 8px 16px 15px;
		line-height: 1.5;
		box-sizing: border-box;
	}
	pre {
		display: block;
		white-space: pre-wrap;
		word-wrap: break-word;
		word-break: normal;
		box-sizing: border-box;
		width: 100%;
		margin: 0;
		padding: 0;
		overflow: hidden;
		line-height: 1.5;
	}
}
</style>
