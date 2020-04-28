import React from "react";
import styled from "styled-components";

const Select = styled.select`
	width: 150px;
	padding: 10px;
	margin-top: 1rem;
	margin-bottom: 1rem;
	border: 1px solid #dbdbdb;
	box-shadow: 1px 2px 4px 0 rgba(0, 0, 0, 0.08);
	border-radius: 2px;
`;

const select = props => {
	return <Select {...props}></Select>;
};

export default select;
