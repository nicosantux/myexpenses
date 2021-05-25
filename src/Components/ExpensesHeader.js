import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { auth } from './../DataBase/FirebaseConfig';
import { theme } from './../theme';

import { H1, HeaderContainer, NavBar, NavItem } from '../Elements/ExpensesElements';

const ExpensesHeader = ({ firstLink, firstRoute, secondLink, secondRoute }) => {
	const [showOption, setShowOption] = useState(false);
	const [showHamburger, setShowHamburger] = useState(false);

	const history = useHistory();

	const logOut = async () => {
		await auth.signOut();
		history.replace('/login');
	};
	return (
		<>
			<HeaderContainer>
				<MyExpensesContainer>
					<H1>MyExpenses</H1>
					<Hamburger onClick={() => setShowHamburger(!showHamburger)}>
						<Line />
						<Line />
						<Line />
					</Hamburger>
				</MyExpensesContainer>
				<NavBar showHamburger={showHamburger}>
					<NavItem to={firstRoute}>{firstLink}</NavItem>
					<NavItem to={secondRoute}>{secondLink}</NavItem>
					{showHamburger && (
						<>
							<NavItem to="/reset-password">Change password</NavItem>
							<NavItem as="button" onClick={() => logOut()}>
								Log out
							</NavItem>
						</>
					)}
					{!showHamburger && (
						<NavItem as="button" onClick={() => setShowOption(!showOption)}>
							Account
						</NavItem>
					)}
					{showOption && (
						<AccountContainer>
							<AccountItem to="/reset-password">Change password</AccountItem>
							<AccountItem as="button" onClick={() => logOut()}>
								Log out
							</AccountItem>
						</AccountContainer>
					)}
				</NavBar>
			</HeaderContainer>
		</>
	);
};

export default ExpensesHeader;

const MyExpensesContainer = styled.div`
	@media (max-width: 700px) {
		display: flex;
		justify-content: space-between;
		width: 100%;
	}
`;

const Hamburger = styled.div`
	align-items: center;
	display: none;
	flex-direction: column;

	@media (max-width: 700px) {
		display: flex;
	}
`;

const Line = styled.span`
	background: white;
	border-radius: 5px;
	height: 2px;
	margin: 3px;
	width: 30px;
`;

const AccountContainer = styled.div`
	align-items: flex-end;
	background: ${theme.primaryColor};
	border-radius: 0 0 1rem 1rem;
	display: flex;
	color: white;
	flex-direction: column;
	padding: 1rem 2rem;
	position: absolute;
	top: 7.5rem;
	right: 0;
	z-index: 10;

	@media (max-width: 1024px) {
		top: 6.5rem;
	}
`;

const AccountItem = styled(Link)`
	color: white;
	background: none;
	border: none;
	cursor: pointer;
	font-size: 1.5rem;
	font-weight: 800;
	margin-bottom: 0.5rem;
	outline: none;
	text-decoration: none;
`;
