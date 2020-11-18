import ajax from "./ajax";
function $toolbar_left_ol_click(vm) {
	vm.insertOl();
}
function $toolbar_left_ul_click(vm) {
	vm.insertUl();
}
function $toolbar_left_upload_click(vm, dom) {
	const options = {
		headers: vm.headers,
		file: dom.files[0],
		withCredentials: false,
		data: vm.fileData,
		filename: vm.fileName,
		action: vm.action,
		onProgress: (e) => {
			if (vm.onProgress) {
				vm.onProgress(e, dom.files[0]);
			}
		},
		onSuccess: (res) => {
			if (vm.onSuccess) {
				vm.onSuccess(res, dom.files[0]);
			}
		},
		onError: (err) => {
			if (vm.onError) {
				vm.onError(err, dom.files[0]);
			}
		},
	};
	ajax(options);
}
function $toolbar_left_table_click(vm, val) {
	let str = "";
	for (let i = 0; i < val.y; i++) {
		if (i == 0) {
			for (let j = 0; j < val.x; j++) {
				str += "|  Header ";
			}
			str += " |\n";
			for (let j = 0; j < val.x; j++) {
				str += "| ------- ";
			}
			str += " |\n";
		} else {
			for (let j = 0; j < val.x; j++) {
				str += "| Content ";
			}
			str += " |\n";
		}
	}
	vm.insertText({
		prefix: "",
		subfix: "",
		str,
	});
}
function $toolbar_left_code_click(vm, val) {
	let code = {
		prefix: "```",
		subfix: "\n\n```",
		str: val,
	};
	vm.insertText(code);
}

export function toolbarLeftClick(type, vm) {
	var param_of_insert_text = {
		bold: {
			prefix: "**",
			subfix: "**",
			str: vm.$i18nText("bold"),
		},
		italic: {
			prefix: "*",
			subfix: "*",
			str: vm.$i18nText("italic"),
		},
		header1: {
			prefix: "# ",
			subfix: "",
			str: vm.$i18nText("header1"),
		},
		header2: {
			prefix: "## ",
			subfix: "",
			str: vm.$i18nText("header2"),
		},
		header3: {
			prefix: "### ",
			subfix: "",
			str: vm.$i18nText("header3"),
		},
		header4: {
			prefix: "#### ",
			subfix: "",
			str: vm.$i18nText("header4"),
		},
		header5: {
			prefix: "##### ",
			subfix: "",
			str: vm.$i18nText("header5"),
		},
		header6: {
			prefix: "###### ",
			subfix: "",
			str: vm.$i18nText("header6"),
		},
		strikethrough: {
			prefix: "~~",
			subfix: "~~",
			str: vm.$i18nText("strikethrough"),
		},
		underline: {
			prefix: "++",
			subfix: "++",
			str: vm.$i18nText("underline"),
		},
		quote: {
			prefix: "> ",
			subfix: "",
			str: vm.$i18nText("quote"),
		},
		link: {
			prefix: "[](",
			subfix: ")",
			str: vm.$i18nText("link"),
		},
		imagelink: {
			prefix: "![](",
			subfix: ")",
			str: vm.$i18nText("image_url"),
		},
		code: {
			prefix: "```",
			subfix: "\n\n```",
			str: vm.$i18nText("code"),
		},
	};
	if (param_of_insert_text.hasOwnProperty(type)) {
		vm.insertText(param_of_insert_text[type]);
	}
}

export function toolbarLeftEspecial(op, vm) {
	var param_of_insert_text = {
		color: {
			prefix: "&&&",
			subfix: "&&&{{style=color:" + op.val + ";}}",
			str: vm.$i18nText("color"),
		},
	};
	if (param_of_insert_text.hasOwnProperty(op.type)) {
		vm.insertText(param_of_insert_text[op.type]);
	}
	var other_left_click = {
		ol: $toolbar_left_ol_click,
		ul: $toolbar_left_ul_click,
		upload: $toolbar_left_upload_click,
		table: $toolbar_left_table_click,
		code: $toolbar_left_code_click,
	};
	if (other_left_click.hasOwnProperty(op.type)) {
		other_left_click[op.type](vm, op.val);
	}
}
