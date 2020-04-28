import React, {useEffect} from "react";
import ShowImage from "../ShowImage/ShowImage";
import {MainContainer, HomeContainer} from "./HomeStyle";
import {useDispatch, useSelector} from "react-redux";
import * as actionCreator from "../../Store/actions";
import firebase from "../../firebaseConfig";
import Sidebar from "../Sidebar/Sidebar";
import FilteredImages from "../FilteredImages/FilteredImages";

function Home() {
	const dispatch = useDispatch();

	useEffect(() => {
		const dbRef = firebase.database().ref("/imageData/");

		dbRef.on("value", snapshot => {
			dispatch(actionCreator.getImages(snapshot));
		});

		return () => {
			dbRef.off();
		} 

		// eslint-disable-next-line
	}, []);

	const {
		imagesData: images,
		filteredData: filtered,
		loader,
		noData,
		mode
	} = useSelector(state => state.global);

	if (loader) return <HomeContainer> Loading... </HomeContainer>;

	if (noData) return <HomeContainer> No data found </HomeContainer>;

	const posts = images.map(post => {
		return (
			<ShowImage
				key={post.id}
				id={post.id}
				title={post.title}
				url={post.imageUrl}
				date={post.dateAdded}
				tags={post.tags}
			/>
		);
	});

	return (
		<>
			<HomeContainer>
				<Sidebar />
				{mode === "home" ? (
					<MainContainer>{posts}</MainContainer>
				) : (
					<MainContainer>
						<FilteredImages imagesData={filtered} />
					</MainContainer>
				)}
			</HomeContainer>
		</>
	);
}

export default Home;
