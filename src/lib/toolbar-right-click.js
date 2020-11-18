function $toolbar_right_html(vm) {
	if (vm.htmlcodetoggle) {
		vm.htmlcodetoggle(!vm.isHtmlcode);
	}
}
function $toolbar_right_preview(vm) {
	if (vm.previewtoggle) {
		vm.previewtoggle(!vm.isPreview);
	}
}
function $toolbar_right_fullscreen(vm) {
	if (vm.fullscreentoggle) {
		vm.fullscreentoggle(!vm.isFullscreen);
	}
}
export default function(type, vm) {
	var other_right_click = {
		html: $toolbar_right_html,
		preview: $toolbar_right_preview,
		fullscreen: $toolbar_right_fullscreen,
	};
	if (other_right_click.hasOwnProperty(type)) {
		other_right_click[type](vm);
	}
}
