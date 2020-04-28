import React, {useEffect} from "react";
import ShowImage from "../ShowImage/ShowImage";
import {useDispatch, useSelector} from "react-redux";
import {MainContainer} from "../UserPhotos/UserPhotosStyle";
import * as actionCreator from "../../Store/userActions";
import validateRoute from "../../ValidateRoute/validateRoute";
import firebase from "../../firebaseConfig";

function UserPhotos() {
	const dispatch = useDispatch();

	useEffect(() => {
		const uid = localStorage.getItem("uid");
		const dbRef = firebase.database().ref(`/users/${uid}/images`);

		dbRef.on("value", snapshot => {
			dispatch(actionCreator.userActions(snapshot));
		});

		// eslint-disable-next-line
	}, []);

	const {userPhotos: images, loader, noData} = useSelector(state => state.user);

	if (loader) return <MainContainer> Loading... </MainContainer>;

	if (noData) return <MainContainer> No data found </MainContainer>;

	let photos = images.map(image => {
		return (
			<ShowImage
				key={image.id}
				id={image.id}
				url={image.imageUrl}
				title={image.title}
				type={image.type}
				update={true}
				storageRef={image.storageRef}
				tags={image.tags}
			/>
		);
	});

	return (
		<>
			<MainContainer>{photos}</MainContainer>
		</>
	);
}

export default validateRoute(UserPhotos);
