import React from "react";
import styled from "styled-components";

const Input = styled.input`
	width: 100%;
	box-sizing: border-box;
	padding: 10px;
	margin-top: 0.8rem;
	border: 1px solid #dbdbdb;
	box-shadow: 1px 2px 4px 0 rgba(0, 0, 0, 0.08);
	border-radius: 2px;
`;

const InputContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding: 1rem;
`;

const formInput = props => (
	<InputContainer>
		<label>{props.label}</label>
		<Input {...props} />
	</InputContainer>
);

export default formInput;
