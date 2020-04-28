import React from "react";
import {
	ImageContainer,
	Image,
	EditDiv,
	DeleteButton,
	Tags,
	TagsDiv
} from "./ShowImageStyle";
import firebase from "../../firebaseConfig";
import {withRouter} from "react-router-dom";
import {toast} from "react-toastify";

function ShowImage(props) {
	const deleteToast = () => {
		toast.warn("Image Deleted Successfully", {
			position: "top-right",
			autoClose: 1500,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: true
		});
	};

	const deleteHandler = () => {
		const uid = localStorage.getItem("uid");

		const storageRef = firebase
			.storage()
			.ref()
			.child(props.storageRef);
		const path_user = `/users/${uid}/images/${props.id}`;
		const path_global = `/imageData/${props.id}`;

		let imageID_user = firebase.database().ref(path_user);
		let imageID_global = firebase.database().ref(path_global);

		storageRef.delete().catch(error => {
			console.log(error);
		});

		imageID_user.remove().catch(error => {
			console.log("Remove failed: " + error.message);
		});

		imageID_global
			.remove()
			.then(deleteToast())
			.catch(error => {
				console.log("Remove failed: " + error.message);
			});
	};

	let updateButtons = "";
	let date = "";

	if (props.update) {
		updateButtons = (
			<div>
				<DeleteButton onClick={deleteHandler}> Delete </DeleteButton>
			</div>
		);
	} else {
		date = <p> {props.date} </p>;
	}

	return (
		<ImageContainer>
			<Image src={props.url}></Image>
			<EditDiv>
				<h4> {props.title} </h4>
				{date}
				{updateButtons}
			</EditDiv>
			<TagsDiv>{<Tags tags={props.tags} />}</TagsDiv>
		</ImageContainer>
	);
}

export default withRouter(ShowImage);
