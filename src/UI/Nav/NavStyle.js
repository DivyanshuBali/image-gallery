import styled from "styled-components";
import {Link} from "react-router-dom";

export const NavStyle = styled.nav`
	display: flex;
	justify-content: space-between;
	background-color: #99e6c2;
	height: 36px;
`;

export const UList = styled.ul`
	list-style-type: none;
	text-decoration: none;
	display: flex;
	align-items: center;
`;

export const List = styled.li`
`;

export const NavAnchor = styled(Link)`
	padding: 10px;
	&:hover {
		background: white;
	}
`;

export const Logout = styled.div`
	padding: 10px;
	cursor: pointer;
	&:hover {
		background: white;
	}
`;

