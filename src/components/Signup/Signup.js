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
	return toast.success("Signup successful, Login to continue", {
		position: "top-right",
		autoClose: 2000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: true
	});
};

function Signup(props) {
	const initialState = {
		email: "",
		password: "",
		repeatedPassword: "",
		emailError: "",
		passwordError: "",
		repeatPasswordError: "",
		serverError: "",
		loader: false
	};

	const [value, setValue] = useState(initialState);

	// STATE HANDLERS
	const formHandler = event => {
		setValue({...value, [event.target.name]: event.target.value});
	};

	// FORM VALIDATION
	const validateForm = () => {
		let emailError = "";
		let passwordError = "";
		let repeatPasswordError = "";

		if (value.password.length <= 6) {
			passwordError = "Password length should be more than 6 characters";
		}

		if (
			!value.email.includes("@") ||
			!value.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
		) {
			emailError = "Invalid email";
		}

		if (value.password !== value.repeatedPassword) {
			repeatPasswordError = "Passwords don't match";
		}

		if (emailError || passwordError || repeatPasswordError) {
			setValue({
				...value,
				emailError,
				passwordError,
				repeatPasswordError
			});
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
				.createUserWithEmailAndPassword(value.email, value.password)
				.then(() => {
					successToast();
					setValue({...value, loader: false});
					props.history.push("/auth");
				})
				.catch(error => {
					setValue({
						...initialState,
						loader: false,
						serverError: error.message
					});
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
			<h2> Sign Up </h2>
			<Form onSubmit={submitHandler}>
				<FormInput
					label="Email"
					type="text"
					name="email"
					placeholder="Enter email"
					required
					onChange={formHandler}
				/>
				<div style={{color: "red"}}> {value.emailError} </div>
				<div style={{color: "red"}}> {value.serverError} </div>
				<FormInput
					label="Password"
					type="password"
					name="password"
					placeholder="Enter password"
					required
					onChange={formHandler}
				/>
				<div style={{color: "red"}}> {value.passwordError} </div>
				<FormInput
					label="Repeat Password"
					type="password"
					name="repeatedPassword"
					placeholder="Repeat Password"
					required
					onChange={formHandler}
				/>
				<div style={{color: "red"}}> {value.repeatPasswordError} </div>
				<Button type="submit" />
			</Form>
		</div>
	);
}

export default withRouter(Signup);
