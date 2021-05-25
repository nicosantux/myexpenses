import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { AuthProvider } from './Context/AuthContext';
import { AlertProvider } from './Context/AlertContext';
import { FormCompleteProvider } from './Context/FormCompleteContext';
import AppRouter from './Routes/AppRouter';
import favicon from './Img/favicon.png';

import Background from './Components/Background';

const App = () => {
	return (
		<>
			<Helmet>
				<link rel="shortcut icon" href={favicon} type="image/x-icon" />
				<title>MyExpenses</title>
			</Helmet>

			<AuthProvider>
				<FormCompleteProvider>
					<AlertProvider>
						<Container>
							<AppRouter />
						</Container>
						<Background />
					</AlertProvider>
				</FormCompleteProvider>
			</AuthProvider>
		</>
	);
};

const Container = styled.div`
	background: #fff;
	border-radius: 25px;
	box-shadow: 5px 7px 4px rgba(32, 9, 80, 0.5);
	align-items: center;
	display: flex;
	flex-direction: column;
	height: 90vh;
	margin: auto;
	overflow: hidden;
	position: relative;
	margin: auto;
	max-height: 53.125rem;
	max-width: 82.5rem;
	width: 90%;
	z-index: 1;

	@media (max-width: 1024px) {
		border-radius: 0;
		height: 100vh;
		margin: 0 auto;
		max-height: 100vh;
		width: 100%;
	}
`;

export default App;
