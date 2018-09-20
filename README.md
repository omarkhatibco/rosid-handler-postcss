# rosid-handler-sass

A function that loads a SASS file, transforms it to CSS, adds vendor prefixes and minifies the output.

## Install

```
npm install rosid-handler-postcss
```

## Usage

### API

```js
const handler = require('rosid-handler-postcss');

handler('main.cass').then(data => {});
handler('main.css', { optimize: true }).then(data => {});
```

### Postcss

install your postcss plugins and add it to `postcss.config.js`

```js
module.exports = {
	plugins: {
		precss: {}
	}
};
```

### Rosid

Add the following object to your `rosidfile.json`, `rosidfile.js` or [routes array](https://github.com/electerious/Rosid/blob/master/docs/Routes.md). `rosid-handler-postcss` will transform all matching SASS files in your source folder to CSS.

```json
{
	"name": "css",
	"path": "[^_]*.css*",
	"handler": "rosid-handler-postcss"
}
```

```css
/* main.sass */
.class {
	color: white;
	+ .class 2 {
		color: red;
	}
}
```

```css
/* main.css (output) */
.class {
	color: white;
}
.class + .class 2 {
	color: red;
}
```

## Parameters

- `filePath` `{String}` Absolute path to file.
- `opts` `{?Object}` Options. - `optimize` `{?Boolean}` - Optimize output. Defaults to `false`.

## Returns

- `{Promise<String|Buffer>}` The transformed file content.
