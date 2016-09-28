const pngToMatrix = require('png-to-matrix');

module.exports = (image, color, variance) => {

	pngToMatrix(image, (matrix) => {

		var points = matrix.map((y, i) => {
			return y.map((x, ii) => {
				x.index = ii;
				return x;
			}).filter((x, ii) => {
				if (
					(x.r > (color.r - variance) && x.r < (color.r + variance)) &&
					(x.g > (color.g - variance) && x.g < (color.g + variance)) &&
					(x.b > (color.b - variance) && x.b < (color.b + variance)) && 
					(x.a > (color.a - variance) && x.b < (color.a + variance))
				) {
					return true;
				} else {
					return false;
				}
			});
		});

		points.map((p, i) => {
			if (p.length > 0 && i < 40) console.log(p, i)
		})

	});

};