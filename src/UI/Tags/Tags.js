import React from "react";
import styled from "styled-components";

const List = styled.ul`
	list-style-type: none;
	margin: none;
	padding: none;
`;

const ListItem = styled.li`
	display: inline-block;
	margin: 0 8px 10px;
	background: #80ced6;
	color: black;
	padding: 0.2rem 0.8rem;
	border-radius: 100px;
`;

const Add = styled.div`
	font-size: 0.8rem;
	background: transparent;
	padding: 5px;
	margin: 0;
	cursor: pointer;
`;

const Delete = styled.div`
	font-size: 0.8rem;
	background: transparent;
	padding: 5px;
	margin: 0;
	cursor: pointer;
`;

function Tags(props) {
	return (
		<List>
			{props.tags.map(value => {
				return (
					<ListItem key={props.tags.indexOf(value)}>
						<div style={{display: "flex"}}>
							<Add onClick={() => props.clicked(value)}> {value} </Add>
							<Delete onClick={() => props.delete(value)}> x </Delete>
						</div>
					</ListItem>
				);
			})}
		</List>
	);
}

export default Tags;
