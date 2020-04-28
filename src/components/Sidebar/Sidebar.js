import React, {useEffect, useState} from "react";
import {SideContainer, Tags, Header} from "./SidebarStyle";
import firebase from "firebase";
import {useDispatch} from "react-redux";
import * as actionCreator from "./sidebarActions";

function Sidebar() {
	const [tags, setTags] = useState([]);
	let filterTags = [];
	const dispatch = useDispatch();
	let selectedDate = "";

	const getDate = () => {
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth() + 1;
		var yyyy = today.getFullYear();

		if (dd < 10) {
			dd = "0" + dd;
		}

		if (mm < 10) {
			mm = "0" + mm;
		}

		return `${yyyy}-${mm}-${dd}`;
	};

	useEffect(() => {
		var databaseRef = firebase.database().ref("/tags");
		databaseRef.once("value", snapshot => {
			setTags(snapshot.val());
		});
		//eslint-disable-next-line
	}, []);

	const selectedTags = (tag, date) => {
		if (!date) {
			if (filterTags.includes(tag)) {
				filterTags = filterTags.filter(value => value !== tag);
				dispatch(actionCreator.filterImages(filterTags, selectedDate));
				return;
			}

			filterTags.push(tag);
			dispatch(actionCreator.filterImages(filterTags, selectedDate));
		} else {
			dispatch(actionCreator.filterImages(filterTags, selectedDate));
		}
	};

	if (tags.length === 0) {
		return <SideContainer> No tags found..</SideContainer>;
	}

	const dateHandler = event => {
		event.preventDefault();
		selectedDate = event.target.value;
		selectedTags(null, true);
	};

	return (
		<SideContainer>
			<Header> Filter images: </Header>
			{tags.map(value => (
				<Tags key={tags.indexOf(value)}>
					<input
						type="checkbox"
						name={value}
						value={value}
						onChange={() => selectedTags(value)}
					/>
					{"  "}
					<label key={tags.indexOf(value)} htmlFor={value}>
						{value}
					</label>
					<br />
				</Tags>
			))}
			<Header>Uploaded After</Header>
			<input
				type="date"
				max={getDate()}
				onChange={dateHandler}
				style={{marginBottom: "1rem", width: "100%", padding: "5px"}}
			/>
		</SideContainer>
	);
}

export default React.memo(Sidebar);
