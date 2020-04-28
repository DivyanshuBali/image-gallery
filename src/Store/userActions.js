export const userActions = snapshot => {
	return dispatch => {
		let imagesData = [];
		let snap = snapshot.toJSON();

		if (!snap) {
			return dispatch({
				type: "USER_DATA",
				loader: false,
				noData: true
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
			type: "USER_DATA",
			userPhotos: transformed,
			loader: false,
			noData: false
		});
	};
};
