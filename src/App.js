import React from "react";
import {Switch, Route} from "react-router-dom";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import ImageForm from "./components/ImageForm/ImageForm";
import UserPhotos from "./components/UserPhotos/UserPhotos";
import "./App.css";
import Nav from "./UI/Nav/Nav";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
	return (
		<>
			<Nav />
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/auth" component={Auth} />
				<Route path="/add-image" component={ImageForm} />
				<Route path="/user-photos" component={UserPhotos} />
			</Switch>
			<ToastContainer />
		</>
	);
};

export default App;
