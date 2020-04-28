import styled from "styled-components";
import {NavLink} from 'react-router-dom';

export const MainContainer = styled.div`
	width: 480px;
	text-align: center;
	border-radius: 4px;
	margin: auto;
	margin-top: 20px;
	padding-bottom: 10px;
	background-color: #d6f5e9;
`;

export const InnerNav = styled.div`
	display: flex;
	background: #46d29d;
	border-radius: 4px;
	margin-bottom: 0.8rem;
`;

export const InnerLink = styled(NavLink)`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 50%;
	height: 2.5rem;
	&:hover {
		background: #d6f5e9;
	}
	&.active {
		background: #d6f5e9 
	}
`;

