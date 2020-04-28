export const getImages = snapshot => {
	return dispatch => {
		let imagesData = [];
		let snap = snapshot.toJSON();

		if (!snap) {
			return dispatch({
				type: "ADD_DATA",
				imagesData: imagesData,
				loader: false,
				noData: true,
				mode: "home"
			});
		}

		imagesData = Object.keys(snap).map(key => {
			return {
				id: key,
				...snap[key]
			};
		});

		const transformed = imagesData.map(data => {
			const newTags = Object.keys(data.tags).map(val => data.tags[val]);
			return {
				...data,
				tags: newTags
			};
		});

		dispatch({
			type: "ADD_DATA",
			imagesData: transformed,
			loader: false,
			mode: "home"
		});
	};
};
