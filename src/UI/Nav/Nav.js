import React from "react";
import {NavStyle, UList, List, NavAnchor, Logout} from "./NavStyle";
import firebase from "../../firebaseConfig";
import {withRouter} from "react-router";

function Nav(props) {
	const handleLogout = () => {
		firebase.auth().signOut();
		localStorage.clear();
		props.history.push("/");
	};

	let logout = "";
	let login = "";
	let newImage = "";
	let myPhotos = "";

	if (localStorage.getItem("uid")) {
		logout = (
			<List>
				<Logout onClick={handleLogout}> Logout </Logout>
			</List>
		);

		newImage = (
			<List>
				<NavAnchor to="/add-image"> Submit New Image </NavAnchor>
			</List>
		);

		myPhotos = (
			<List>
				<NavAnchor to="/user-photos">My Photos</NavAnchor> 
			</List>
		)
	} else {
		login = (
			<List>
				<NavAnchor to="/auth"> Login/Signup </NavAnchor>
			</List>
		);
	}

	return (
		<NavStyle>
			<UList>
				<List>
					<NavAnchor to="/"> Home </NavAnchor>
				</List>
			</UList>
			<UList>
				{myPhotos}
				{newImage}
				{login}
				{logout}
			</UList>
		</NavStyle>
	);
}

export default withRouter(Nav);
