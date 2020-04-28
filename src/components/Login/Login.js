import React, {useState} from "react";
import Form from "../../UI/Form/Form";
import FormInput from "../../UI/FormInput/FormInput";
import Button from "../../UI/Button/Button";
import firebase from "../../firebaseConfig";
import {withRouter} from "react-router-dom";
import {MainContainer} from "../Auth/AuthStyle";
import Loader from "../../UI/Loader/Loader";
import {toast} from "react-toastify";

const successToast = () => {
	return toast.success("Login Successful!", {
		position: "top-right",
		autoClose: 1200,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: true
	});
};

function Login(props) {
	const initialState = {
		email: "",
		password: "",
		emailError: "",
		serverError: "",
		loader: false
	};
	const [value, setValue] = useState(initialState);

	// FORM HANDLER
	const formHandler = event => {
		setValue({...value, [event.target.name]: event.target.value});
	};

	//FORM VALIDATION
	const validateForm = () => {
		let emailError = "";

		if (!value.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
			emailError = "Invalid email";
		}

		if (emailError) {
			setValue({...value, emailError});
			return false;
		}

		return true;
	};

	// SUBMIT HANDLER
	const submitHandler = event => {
		event.preventDefault();

		setValue({...value, loader: true});

		const isValid = validateForm();

		if (isValid) {
			firebase
				.auth()
				.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
				.then(() => {
					return firebase
						.auth()
						.signInWithEmailAndPassword(value.email, value.password);
				})
				.then(user => {
					localStorage.setItem("uid", user.user.uid);
					successToast();
					setValue({...value, loader: false});
					props.history.push("/");
				})
				.catch(error => {
					setValue({...value, loader: false, serverError: error.message});
				});
		}
	};

	if (value.loader) {
		return (
			<MainContainer>
				<Loader />
			</MainContainer>
		);
	}

	return (
		<div>
			<h2> Login </h2>
			<Form onSubmit={submitHandler}>
				<FormInput
					label="Email"
					type="email"
					name="email"
					placeholder="Enter email"
					onChange={formHandler}
					required
				/>
				<div style={{color: "red"}}> {value.emailError} </div>
				<FormInput
					label="Password"
					type="password"
					name="password"
					placeholder="Enter password"
					onChange={formHandler}
					required
				/>
				<Button type="submit" />
				<div style={{color: "red"}}> {value.serverError} </div>
			</Form>
		</div>
	);
}

export default withRouter(Login);
