<template>
	<div class="editor-toolbar-left">
		<button class="btn bold" v-if="toolbars.bold" @click="$onclick('bold')" :title="$i18nText('bold') + '(Ctrl+B)'">
			<i class="iconfont icon-cuti"></i>
		</button>
		<button class="btn italic" v-if="toolbars.italic" @click="$onclick('italic')" :title="$i18nText('italic') + '(Ctrl+I)'">
			<i class="iconfont icon-xt"></i>
		</button>
		<div class="btn header" v-if="toolbars.header" :title="$i18nText('header')">
			<i class="iconfont icon-biaoti"></i>
			<div class="popup-dropdown">
				<div class="dropdown-wrap">
					<div class="item" @click="$onclick('header1')" title="(Ctrl+1)">
						{{ $i18nText("header1") }}
					</div>
					<div class="item" @click="$onclick('header2')" title="(Ctrl+2)">
						{{ $i18nText("header2") }}
					</div>
					<div class="item" @click="$onclick('header3')" title="(Ctrl+3)">
						{{ $i18nText("header3") }}
					</div>
					<div class="item" @click="$onclick('header4')" title="(Ctrl+4)">
						{{ $i18nText("header4") }}
					</div>
					<div class="item" @click="$onclick('header5')" title="(Ctrl+5)">
						{{ $i18nText("header5") }}
					</div>
					<div class="item" @click="$onclick('header6')" title="(Ctrl+6)">
						{{ $i18nText("header6") }}
					</div>
				</div>
			</div>
		</div>
		<button class="btn underline" v-if="toolbars.underline" @click="$onclick('underline')" :title="$i18nText('underline') + '(Ctrl+U)'">
			<i class="iconfont icon-xiahuaxian"></i>
		</button>
		<button
			class="btn strikethrough"
			v-if="toolbars.strikethrough"
			@click="$onclick('strikethrough')"
			:title="$i18nText('strikethrough') + '(Ctrl+D)'"
		>
			<i class="iconfont icon-zhonghuaxian"></i>
		</button>
		<button class="btn quote" v-if="toolbars.quote" @click="$onclick('quote')" :title="$i18nText('quote')">
			<i class="iconfont icon-icon-quote"></i>
		</button>
		<button class="btn ol" v-if="toolbars.ol" @click="$onespecial('ol')" :title="$i18nText('ol')">
			<i class="iconfont icon-icon-shuziliebiao"></i>
		</button>
		<button class="btn ul" v-if="toolbars.ul" @click="$onespecial('ul')" :title="$i18nText('ul')">
			<i class="iconfont icon-liebiao-copy"></i>
		</button>
		<button class="btn link" v-if="toolbars.link" @click="$onclick('link')" :title="$i18nText('link')">
			<i class="iconfont icon-lianjie"></i>
		</button>
		<button class="btn color" v-if="toolbars.color" :title="$i18nText('color')">
			<i class="iconfont icon-yanse"></i>
			<div class="popup-dropdown table">
				<div class="dropdown-wrap">
					<table>
						<tbody>
							<tr v-for="(items, index) in colorGroup" :key="index">
								<td
									v-for="item in items"
									:key="item"
									:style="'background-color:' + item + ';'"
									@click="$onespecial('color', item)"
								></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</button>
		<div class="btn imagelink" @click="imageCompletes" v-if="toolbars.imagelink" :title="$i18nText('image')">
			<i class="iconfont icon-tupian"></i>
			<div class="popup-dropdown" v-if="!imageComplete">
				<div class="dropdown-wrap">
					<div class="item" @click="$onespecial('imageupload')">
						{{ $i18nText("upload") }}
						<input type="file" @change="fileChange" class="fileUpload" ref="file" />
					</div>
					<div class="item" @click="$onclick('imagelink')">URL</div>
				</div>
			</div>
		</div>
		<template v-if="!codes || codes.length == 0">
			<button class="btn code" v-if="toolbars.code" @click="$onclick('code')" :title="$i18nText('code')">
				<i class="iconfont icon-daima"></i>
			</button>
		</template>
		<template v-else>
			<button class="btn code" v-if="toolbars.code" :title="$i18nText('code')">
				<i class="iconfont icon-daima"></i>
				<div class="popup-dropdown">
					<div class="dropdown-wrap">
						<div class="item" v-for="(item, key, index) in codes" :key="index" @click="$onespecial('code', key)">
							{{ key }}
						</div>
					</div>
				</div>
			</button>
		</template>
		<div class="btn table" :title="$i18nText('table')">
			<i class="iconfont icon-Table"></i>
			<div class="popup-dropdown table">
				<div class="dropdown-wrap">
					<table @mousemove="move" @click="$onespecial('table', { x: tX, y: tY })">
						<tbody>
							<tr>
								<td :class="{ active: tX >= 1 }"></td>
								<td :class="{ active: tX >= 2 }"></td>
								<td :class="{ active: tX >= 3 }"></td>
								<td :class="{ active: tX >= 4 }"></td>
								<td :class="{ active: tX >= 5 }"></td>
								<td :class="{ active: tX >= 6 }"></td>
							</tr>
							<tr>
								<td :class="{ active: tX >= 1 && tY >= 2 }"></td>
								<td :class="{ active: tX >= 2 && tY >= 2 }"></td>
								<td :class="{ active: tX >= 3 && tY >= 2 }"></td>
								<td :class="{ active: tX >= 4 && tY >= 2 }"></td>
								<td :class="{ active: tX >= 5 && tY >= 2 }"></td>
								<td :class="{ active: tX >= 6 && tY >= 2 }"></td>
							</tr>
							<tr>
								<td :class="{ active: tX >= 1 && tY >= 3 }"></td>
								<td :class="{ active: tX >= 2 && tY >= 3 }"></td>
								<td :class="{ active: tX >= 3 && tY >= 3 }"></td>
								<td :class="{ active: tX >= 4 && tY >= 3 }"></td>
								<td :class="{ active: tX >= 5 && tY >= 3 }"></td>
								<td :class="{ active: tX >= 6 && tY >= 3 }"></td>
							</tr>
							<tr>
								<td :class="{ active: tX >= 1 && tY >= 4 }"></td>
								<td :class="{ active: tX >= 2 && tY >= 4 }"></td>
								<td :class="{ active: tX >= 3 && tY >= 4 }"></td>
								<td :class="{ active: tX >= 4 && tY >= 4 }"></td>
								<td :class="{ active: tX >= 5 && tY >= 4 }"></td>
								<td :class="{ active: tX >= 6 && tY >= 4 }"></td>
							</tr>
							<tr>
								<td :class="{ active: tX >= 1 && tY >= 5 }"></td>
								<td :class="{ active: tX >= 2 && tY >= 5 }"></td>
								<td :class="{ active: tX >= 3 && tY >= 5 }"></td>
								<td :class="{ active: tX >= 4 && tY >= 5 }"></td>
								<td :class="{ active: tX >= 5 && tY >= 5 }"></td>
								<td :class="{ active: tX >= 6 && tY >= 5 }"></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		toolbars: Object,
		color: {
			type: Array,
			default() {
				return [];
			},
		},
		fileName: String,
		imageUoload: Function,
		imageComplete: Function,
		codes: Object,
	},
	data() {
		return {
			colorGroup: [],
			timer: null,
			tX: 0,
			tY: 0,
		};
	},
	methods: {
		/**
		 * 数组分割成多数组
		 * @param  {[type]} array 要分割的数组
		 * @param  {[type]} size  每个数组的个数
		 * @return {[type]}       返回一个数组
		 */
		colorHandle(array, size) {
			let [start, end, result] = [null, null, []];
			for (let i = 0; i < Math.ceil(array.length / size); i++) {
				start = i * size;
				end = start + size;
				result.push(array.slice(start, end));
			}
			this.colorGroup = result;
		},
		/**
		 * 点击后往父组件传递值
		 * @param  {[type]} type  点击类型
		 */
		$onclick(type) {
			this.$emit("toolbar-left-click", type);
		},
		$onespecial(type, val) {
			if (type === "imageupload") {
				if (!this.imageUoload) {
					//无自定义上传事件
					this.$refs.file.click();
				} else {
					this.imageUoload();
				}
				return false;
			}
			this.$emit("toolbar-left-especial", { type, val });
		},
		/**
		 * 默认上传事件文件选择事件
		 * @param  {[type]} type  点击类型
		 */
		fileChange() {
			this.$emit("toolbar-left-especial", {
				type: "upload",
				val: this.$refs.file,
			});
		},
		imageCompletes() {
			if (this.imageComplete) {
				this.imageComplete();
			}
		},
		move(e) {
			if (this.timer) {
				clearTimeout(this.timer);
			}
			this.timer = setTimeout(() => {
				let x = e.offsetX,
					y = e.offsetY;
				if (x > 120 || y > 100) return false;
				this.tX = Math.ceil(x / 20);
				this.tY = Math.ceil(y / 20);
			}, 10);
		},
	},
	mounted() {
		this.colorHandle(this.color, 6);
	},
};
</script>
