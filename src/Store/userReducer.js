const initialState = {
    userPhotos: [],
    loader: true,
    noData: true
}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case "USER_DATA":
            return {
                userPhotos: action.userPhotos,
                loader: action.loader,
                noData: action.noData 
            }
        default:
            return state;
    }

}

export default userReducer;