import React from "react";
import styled from "styled-components";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding: 1rem;
`;

const Label = styled.div`
    padding-bottom: .8rem;
`;

const fileInput = props => (
	<Container>
		<Label> {props.label} </Label>
		<input {...props} />
	</Container>
);

export default fileInput;
