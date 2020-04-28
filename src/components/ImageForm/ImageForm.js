import React, {useState, useEffect} from "react";
import Form from "../../UI/Form/Form";
import FormInput from "../../UI/FormInput/FormInput";
import Button from "../../UI/Button/Button";
import FileInput from "../../UI/FileInput/FileInput";
import Loader from "../../UI/Loader/Loader";
import {withRouter} from "react-router-dom";
import firebase from "../../firebaseConfig";
import {MainContainer} from "./ImageFormStyle";
import validateRoute from "../../ValidateRoute/validateRoute";
import {toast} from "react-toastify";
import Tags from "../../UI/Tags/Tags";

const initialState = {
	file: null,
	title: "",
	selfDefinedTags: [],
	tags: [],
	dbTags: [],
	totalTags: [],
	loading: false
};

const successToast = () => {
	return toast.success("Image added successfully", {
		position: "top-right",
		autoClose: 1500,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true
	});
};

const getDate = () => {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1;
	var yyyy = today.getFullYear();

	if (dd < 10) {
		dd = "0" + dd;
	}

	if (mm < 10) {
		mm = "0" + mm;
	}

	return `${yyyy}-${mm}-${dd}`;
};

function ImageForm(props) {
	const [value, setValue] = useState(initialState);

	useEffect(() => {
		firebase
			.database()
			.ref("/tags")
			.once("value", snapshot => {
				if (!snapshot.val()) {
					return;
				}
				let tags = snapshot.val();
				if (tags.length > 0) {
					setValue({
						...value,
						totalTags: value.totalTags.concat(tags),
						dbTags: value.dbTags.concat(tags.splice(0, 7))
					});
				} else {
					console.log("NO TAGS");
				}
			});

		// eslint-disable-next-line
	}, []);

	// FORM HANDLER
	const formHandler = event => {
		setValue({...value, [event.target.name]: event.target.value});
	};

	const fileInputHandler = event => {
		let file = React.createRef();
		file = event.target.files;
		setValue({...value, file: file[0]});
	};

	const tagsHandler = tag => {
		if (value.tags.includes(tag)) {
			return;
		}
		setValue({...value, tags: value.tags.concat(tag)});
	};

	const deleteTag = tag => {
		setValue({...value, tags: value.tags.filter(value => value !== tag)});
	};

	// SUBMIT HANDLER
	const submitHandler = event => {
		event.preventDefault();

		let selfDefinedTags = value.selfDefinedTags
			.split(",")
			.map(value => value.trim());

		const tagsData = new Set([
			...selfDefinedTags,
			...value.tags,
			...value.totalTags
		]);

		const imageTags = new Set([...selfDefinedTags, ...value.tags]);

		const storageRef = firebase
			.storage()
			.ref()
			.child(`images/${value.file.name}`);

		setValue({...value, loading: true});

		storageRef
			.put(value.file)
			.then(() => {
				storageRef.getDownloadURL().then(url => {
					var database = firebase.database().ref();
					var userKey = localStorage.getItem("uid");
					var newPhotoKey = database.push().key;
					var newPhoto = {};
					var tagsRef = firebase.database().ref("/tags");

					tagsRef.set([...tagsData]);

					newPhoto[`/imageData/${newPhotoKey}`] = {
						imageUrl: url,
						dateAdded: getDate(),
						title: value.title,
						storageRef: `/${storageRef.location.path_}`,
						tags: [...imageTags]
					};

					newPhoto[`/users/${userKey}/images/${newPhotoKey}`] = {
						imageUrl: url,
						dateAdded: getDate(),
						title: value.title,
						storageRef: `/${storageRef.location.path_}`,
						tags: [...imageTags]
					};

					database
						.update(newPhoto)
						.then(() => {
							setValue({...value, loading: false});
							successToast();
							props.history.push("/user-photos");
						})
						.catch(error => {
							console.log(error);
						});
				});
			})
			.catch(error => {
				console.log(error);
			});
	};

	if (value.loading) {
		return (
			<MainContainer>
				<Loader />
			</MainContainer>
		);
	}

	let tags = null;

	if (value.dbTags.length > 0) {
		tags = (
			<Tags
				tags={value.dbTags}
				clicked={value => tagsHandler(value)}
				delete={value => deleteTag(value)}
			/>
		);
	}

	return (
		<div>
			<MainContainer>
				<h1> Add Image </h1>
				<Form onSubmit={submitHandler}>
					<FileInput
						label="Choose Image"
						type="file"
						onChange={fileInputHandler}
						required
					/>

					<FormInput
						label="Image Title"
						type="text"
						name="title"
						placeholder="Image Title"
						onChange={formHandler}
						required
					/>

					<FormInput
						label="Define Tags"
						type="text"
						name="selfDefinedTags"
						placeholder="Enter tags (comma seperated)"
						onChange={formHandler}
						required
					/>

					<FormInput
						label="Selected Tags"
						type="text"
						name="tags"
						value={value.tags.map(value => value)}
						placeholder="None Selected, select from tags given below"
						readOnly
					/>

					{tags}

					<br />
					<Button type="submit" />
				</Form>
			</MainContainer>
		</div>
	);
}

export default validateRoute(withRouter(ImageForm));
