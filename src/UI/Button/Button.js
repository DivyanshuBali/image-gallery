import React from "react";
import styled from "styled-components";

const Button = styled.button`
	background-color: #80ced6;
	border: none;
	color: black;
	padding: 10px 16px;
	border-radius: 2px;
	text-align: center;
	text-decoration: none;
	display: inline-block;
	font-size: 16px;
	margin: 1rem;
	cursor: pointer;
`;

const button = props => {
	return (
		<Button {...props} >
			Submit
		</Button>
	);
};

export default button;
