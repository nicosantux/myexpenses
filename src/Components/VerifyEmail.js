import React, { useState } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { auth } from './../DataBase/FirebaseConfig';
import { useHistory } from 'react-router-dom';
import { useAuth } from './../Context/AuthContext';

import { BtnContainer, Button } from './../Elements/FormElements';
import { HeaderContainer, H1, H3, NavBar, NavItem, ExpensesContainer } from './../Elements/ExpensesElements';

const VerifyEmail = () => {
	const [showHamburger, setShowHamburger] = useState(false);

	const history = useHistory();

	const { user } = useAuth();

	const verifyEmail = () => {
		user.sendEmailVerification().then(() => {
			console.log('verificacion enviada');
		});
	};

	const logOut = async () => {
		await auth.signOut();
		history.push('/login');
	};

	return (
		<>
			<Helmet>
				<title>Verify Email</title>
			</Helmet>

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
					<NavItem as="button" onClick={logOut}>
						Log out
					</NavItem>
				</NavBar>
			</HeaderContainer>
			<ExpensesContainer>
				<H3>To start using MyExpenses please verify your email.</H3>
				<BtnContainer>
					<Button formComplete as="button" onClick={verifyEmail}>
						Send verification again
					</Button>
				</BtnContainer>
			</ExpensesContainer>
		</>
	);
};

export default VerifyEmail;

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
