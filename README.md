## vue-jeditor

A Markdown editor for the Vue framework

## How use

#### install

```javascript
npm install vue-jeditor
```

#### Introduced the global

```javascript
//index.js
import Vue from "vue";

import JEditor from "vue-jeditor";
import "vue-jeditor/dist/src/css/style.css";
Vue.use(JEditor);

//demo.vue
<JEditor v-model="value"></JEditor>;
new Vue({
	data() {
		return { value: "" };
	},
});
```

#### Introduce in a separate page

```javascript
//demo.vue
import JEditor from "vue-jeditor";
import "vue-jeditor/dist/src/css/style.css";
components: {
    JEditor,
},
<JEditor v-model="value"></JEditor>
new Vue({
    data() {
       return { value: '' }
    }
})
```

## API

##### props

| name               | type     | default           | describe                                                                   |
| ------------------ | -------- | ----------------- | -------------------------------------------------------------------------- |
| value              | String   | ""                | value                                                                      |
| fontSize           | String   | 14px              | font size                                                                  |
| preview            | Boolean  | true              | Whether the preview area is enabled                                        |
| fullscreen         | Boolean  | true              | Whether to enable full screen editing                                      |
| htmlcode           | Boolean  | true              | Whether you can view HTML text                                             |
| imageUoload        | Function | null              | Image upload custom method                                                 |
| fileName           | String   | file              | Upload file field name                                                     |
| fileData           | Bbject   | {}                | Additional parameters that come with uploading                             |
| i18n               | String   | en                | zh-cn: Simplified Chinese, en: English                                     |
| color              | Bbject   |                   | Font color set                                                             |
| toolbarsBackground | String   | #ffffff           | Toolbar background colors                                                  | editorBackground | String | #ffffff | Edit bar background color |
| previewBackground  | String   | #fbfbfb           | Preview bar background color                                               |
| imageComplete      | Function |                   | Override the image button method, which will not show the drop-down option |
| action             | String   | /                 | File upload address                                                        |
| headers            | Object   | {}                | upload header                                                              |
| tabSize            | Number   | 4                 | tab size                                                                   |
| on-success         | Function |                   | upload success callback                                                    |
| on-progress        | Function |                   | upload progress callback                                                   |
| on-error           | Function |                   | upload error callback                                                      |
| save               | Function |                   | Save method, CRTL + S triggered                                            |
| hljs               | Object   | {}                | highlight object                                                           |
| languages          | Object   | {}                | highlight languages object                                                 |
| toolbars           | Object   | All on by default | Toolbar options                                                            |

Toolbar options

```
toolbars: {
    bold: true,
    italic: true,
    header: true,
    underline: true,
    strikethrough: true,
    mark: true,
    quote: true,
    ol: true,
    ul: true,
    link: true,
    color: true,
    imagelink: true,
    code: true,
    table: true,
    save: true,
    fullscreen: true,
    htmlcode: true,
    preview: true,
},
```

## Code highlighting

Because the file size is optimized, the VUe-JEditor does not turn on code highlighting by default, or manually if it is needed

#### According to the need to introduce
```javascript
import hljs from "highlight.js/lib/core";
import css from "highlight.js/lib/languages/css";
import javascript from "highlight.js/lib/languages/javascript";
import "./src/css/monokai-sublime.css";
new Vue({
	data() {
		return {
			content: text,
			hljs: hljs,
			languages: {
				css,
				javascript,
			},
		};
	},
});
<JEditor v-model="content" :hljs="hljs" :languages="languages" />
```
#### Introduced the global
```javascript
import hljs from "highlight.js/lib/core";
import css from "highlight.js/lib/languages/css";
import javascript from "highlight.js/lib/languages/javascript";
import "./src/css/monokai-sublime.css";
Vue.use(JEditor, { hljs, languages: { javascript, css } });
```

The introduced monokai-sublime.css file is the highlight theme style file, and you can go to [https://highlightjs.org/](https://highlightjs.org/) to see your favorite themes.
