import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import Signup from "../Signup/Signup";
import Login from "../Login/Login";
import {MainContainer, InnerNav, InnerLink} from "./AuthStyle";

function Auth(props) {
	const signup = `${props.match.path}/signup`;
	const login = `${props.match.path}/login`;

	return (
		<div>
			<MainContainer>
				<InnerNav>
					<InnerLink to={signup}> Signup </InnerLink>
					<InnerLink to={login}> Login </InnerLink>
				</InnerNav>
				<Switch>
					<Route path={signup} children={<Signup />} />
					<Route path={login} children={<Login />} />
					<Redirect from="/auth" to={login} />
				</Switch>
			</MainContainer>
		</div>
	);
}

export default Auth;
