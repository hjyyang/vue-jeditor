<template>
	<div class="editor-toolbar-right">
		<div class="btn preview" :class="{ active: preview }" :title="$i18nText('preview')" v-if="toolbars.preview" @click="$onclick('preview')">
			<i class="iconfont icon-yanjing"></i>
			<i class="iconfont icon-bukejian hide"></i>
		</div>
		<div class="btn fullscreen" :class="{ active: fullscreen }" :title="$i18nText('edit')" @click="$onclick('fullscreen')">
			<i class="iconfont icon-fangda"></i>
			<i class="iconfont icon-weibiaoti11 hide"></i>
		</div>
		<button class="btn htmlcode" :class="{ active: htmlcode }" :title="$i18nText('html')" @click="$onclick('html')">
			<i class="iconfont icon-daima"></i>
			<i class="iconfont icon-daima hide"></i>
		</button>
	</div>
</template>

<script>
export default {
	props: {
		toolbars: Object,
		preview: {
			type: Boolean,
			default: true,
		},
		fullscreen: {
			type: Boolean,
			default: false,
		},
		htmlcode: {
			type: Boolean,
			default: false,
		},
	},
	methods: {
		$onclick(type) {
			this.$emit("toolbar-right-click", type);
		},
	},
};
</script>

<style></style>
