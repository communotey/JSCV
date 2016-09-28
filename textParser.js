const pngToMatrix = require('png-to-matrix');

module.exports = (image, color, variance, callback) => {

	pngToMatrix(image, (matrix) => {

		//Indentify all the valid points in the matrix
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

		var alphabet = "aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ";
		var shapes = [];
		var offset = 0;

		for (i = 0; i < alphabet.length; i++) {
			
			var initialShape = [];
			var hit = false;
			var skipCount = 0;
			var skip = false;
			var ii = offset;

			while (skip === false && ii < points.length) {
				if (points[ii].filter((x) => { return x === 1 }).length > 0) {
					var mappedPoints = points[ii].map((p, iii) => {
						return [p, iii];
					});
					initialShape.push(mappedPoints);
					hit = true;
					skipCount = 0;
				} 

				if (hit === true && points[ii].filter((x) => { return x === 1 }).length === 0) {
					skipCount++;
					if (skipCount > 5) {
						offset = ii + 1;
						skip = true;
					}
				}
				ii++;
			}

			//Map the matrix's indices to a hashtable to get the min and max range of X
			var xMinRange, xMaxRange;
			var indices = [];

			initialShape.map((y, iii) => {
				y.map((point, iiii) => {
					indices.push(point[1]);
				});
			});

			xMinRange = Math.min.apply(Math, indices);
			xMaxRange = Math.max.apply(Math, indices);

			//Define the true shape from offset = 0 index.
			var shape = initialShape.map((y, i) => {
				return y.map((point, ii) => {
					point[1] = point[1] - xMinRange;
					return point;
				});
			});

			//Define the true range (which is simply max minus min range)
			var xRange = xMaxRange - xMinRange;

			//Push it to the shapes array.
			shapes.push({
				'character': alphabet[i],
				'matrix': shape,
				'xRange': xRange,
				'yRange': shape.length
			});

		}

		shapes.map((shape, i) => {
			console.log(shape.character, shape.xRange, shape.yRange);
		})

	});

};