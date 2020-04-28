import React from "react";
import styled from "styled-components";

export const ImageContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 1rem;
	width: 480px;
	padding: 1rem;
	background-color: #d6f5e9;
	border-radius: 4px;
	max-height: 450px;
`;

export const EditDiv = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 0.8rem;
`;

export const Image = styled.img`
	width: 100%;
	height: 80%;
	background-color: white;
	margin-bottom: 1rem;
`;

export const DeleteButton = styled.button`
	background-color: #80ced6;
	border: none;
	color: black;
	padding: 8px 12px;
	border-radius: 2px;
	text-align: center;
	text-decoration: none;
	display: inline-block;
	font-size: 12px;
	cursor: pointer;
	&:hover {
		background: #32b1cd;
		color: white;
	}
`;

export const TagsDiv = styled.div`
	width: 100%;
`;

const List = styled.ul`
	list-style-type: none;
	margin: none;
	padding: none;
`;

const ListItem = styled.li`
	display: inline-block;
	margin-right: 5px;
	background: #80ced6;
	color: black;
	padding: 2px 6px;
	border-radius: 100px;
`;

const Add = styled.div`
	font-size: 0.8rem;
	background: transparent;
	padding: 5px;
	margin: 0;
	cursor: pointer;
`;

export function Tags(props) {
	return (
		<List>
			{props.tags.map(value => {
				return (
					<ListItem key={props.tags.indexOf(value)}>
						<div style={{display: "flex"}}>
							<Add> {value} </Add>
						</div>
					</ListItem>
				);
			})}
		</List>
	);
}
