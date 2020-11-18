import Vue from "vue";
import En from "./locales/en.json";
import Cn from "./locales/zh-cn.json";

function t(l) {
	let $i18n = function (text, variate) {
		let lang = null;
		if (l === "en") {
			lang = En;
		} else if (l === "zh-cn") {
			lang = Cn;
		}
		return formatText(lang, text, variate);
	};
	Vue.prototype.$i18nText = $i18n;
}

function formatText(lang, text, variate) {
	let textArr = null,
		index = 0,
		cLang = lang;
	if (text.indexOf(".") != -1) {
		textArr = text.split(".");
	} else {
		if (lang[text]) {
			if (variate) {
				return replaceText(variate, lang[text]);
			}
			return lang[text];
		} else {
			throw "The text does not exist";
		}
	}
	while (index < textArr.length) {
		if (!cLang[textArr[index]]) {
			throw "The text does not exist";
		}
		if (cLang[textArr[index]] && typeof cLang[textArr[index]] == "object") {
			cLang = cLang[textArr[index]];
		}
		if (cLang[textArr[index]] && typeof cLang[textArr[index]] == "string") {
			if (variate) {
				return replaceText(variate, cLang[textArr[index]]);
			}
			return cLang[textArr[index]];
		}
		index++;
	}
}

function replaceText(attr, text) {
	for (let i in attr) {
		text = text.replace("$" + i + "$", attr[i]);
	}
	return text;
}

export default t;
