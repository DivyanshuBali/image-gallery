export const filterImages = (filterTags, selectedDate) => {
	return (dispatch, getState) => {
		const images = getState().global.imagesData;

		if (filterTags.length === 0 && !selectedDate) {
			dispatch({type: "FILTER_DATA", mode: "home"});
			return;
		} 
		else if (filterTags.length === 0 && selectedDate) {
			const filtered = images.filter(image => image.dateAdded >= selectedDate);
			dispatch({type: "FILTER_DATA", filtered: filtered, mode: "filtered"});

		} 
		else if (filterTags.length > 0 && !selectedDate) {
			const check = val => val.tags.some(tag => filterTags.indexOf(tag) !== -1);
			const filtered = images.filter(check);
			dispatch({type: "FILTER_DATA", filtered: filtered, mode: "filter"});

		} 
		else if (filterTags.length > 0 && selectedDate) {
			const check = val => val.tags.some(tag => filterTags.indexOf(tag) !== -1);

			let filtered = images.filter(check);

			const filteredByDate = filtered.filter(
				image => image.dateAdded >= selectedDate
			);

			if (filteredByDate.length === 0) {
				dispatch({type: "FILTER_DATA", filtered: null, mode: "filter"});
			} else {
				dispatch({
					type: "FILTER_DATA",
					filtered: filteredByDate,
					mode: "filter"
				});
			}
		}
	};
};
