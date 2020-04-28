const initialState = {
	imagesData: [],
	loader: true,
	noData: true,
	mode: "home"
};

const globalReducer = (state = initialState, action) => {
	switch (action.type) {
		case "ADD_DATA":
			return {
				imagesData: action.imagesData,
				loader: action.loader,
				noData: action.noData,
				mode: action.mode
			};
		case "FILTER_DATA":
			return {
				imagesData: state.imagesData,
				filteredData: action.filtered,
				mode: action.mode
			};
		default:
			return state;
	}
};

export default globalReducer;
