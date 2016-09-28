const pngToMatrix = require('png-to-matrix');

module.exports = (image, color, variance) => {

	pngToMatrix(image, (matrix) => {

		//Indentiy all the valid points in the matrix
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

		//For the test case, get the shape of lowercase A first
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

		//Map the matrix's indices to a hashtable to get the min and max range of X
		var xMinRange, xMaxRange;
		var indices = [];

		shapeOfA.map((y, i) => {
			y.map((point, ii) => {
				indices.push(point[1]);
			});
		});

		xMinRange = Math.min.apply(Math, indices);
		xMaxRange = Math.max.apply(Math, indices);

		//Define the true shape from offset = 0 index.
		var shape = shapeOfA.map((y, i) => {
			return y.map((point, ii) => {
				point[1] = point[1] - xMinRange;
				return point;
			});
		});

		//Define the true range (which is simply max minus min range)
		var xRange = xMaxRange - xMinRange;

		console.log(xRange, shape);

	});

};