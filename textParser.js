const pngToMatrix = require('png-to-matrix');

module.exports = (image, color, variance) => {

	pngToMatrix(image, (matrix) => {

		var points = matrix.map((y, i) => {
			return y.map((x, ii) => {
				if (
					(x.r > (color.r - variance) && x.r < (color.r + variance)) &&
					(x.g > (color.g - variance) && x.g < (color.g + variance)) &&
					(x.b > (color.b - variance) && x.b < (color.b + variance)) && 
					(x.a > (color.a - variance) && x.b < (color.a + variance))
				) {
					return 1;
				} else {
					return 0;
				}
			});
		});

		var shapeOfA = points.filter((y, i) => {
			if (i < 35 && y.filter((point, ii) => { return point > 0; }).length > 0) {
				return true;
			} else {
				return false;
			}
		}).map((y, i) => {
			return y.map((point, ii) => {
					return [point, ii];
			}).filter((point, ii) => {
				if (point[0] > 0) {
					return true;
				} else {
					return false;
				}
			});
		})

		console.log(shapeOfA);

	});

};