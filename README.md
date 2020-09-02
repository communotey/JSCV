# JSCV

[![npm version](https://badgen.net/npm/v/jscv)](https://www.npmjs.com/package/jscv)
[![dependencies Status](https://badgen.net/david/dep/communotey/jscv)](https://david-dm.org/communotey/jscv)
[![codecov](https://badgen.net/codecov/c/github/communotey/jscv)](https://codecov.io/gh/communotey/jscv)

## Computer Vision done in Node.js
### By Chris Cates :star:

## API

### `JSCV.autoReadText();` - Automatically read text from an image through Computer Vision
#### Object Parameters

```javascript
JSCV.readText({
	//The physical image in .png or .jpg format
	'image': '/path/to/image',
	//The RGBA values of the text
	'rgba': {
		'r': 0,
		'b': 0,
		'g': 0,
		'a': 255
	},
	//The variance in rgba if there is discoloration or distortion
	'variance': 20
});
```

#### Supported font types:

- Times New Roman
- Lato
- Sans Serif
- Monospace
- Serif
- Open Sans

### `JSCV.readText();` - Much faster then `JSCV.autoReadText();` since you can tune it to read for a specific font.
#### Object Parameters

```javascript
JSCV.readText({
	//The physical image in .png or .jpg format
	'image': '/path/to/image',
	//The font face you are looking to read from
	'font': 'Lato',
	//The RGBA values of the text
	'rgba': {
		'r': 0,
		'b': 0,
		'g': 0,
		'a': 255
	},
	//The variance in rgba if there is discoloration or distortion
	'variance': 20
});
```
