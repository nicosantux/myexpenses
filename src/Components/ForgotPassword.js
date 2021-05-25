import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { auth } from '../DataBase/FirebaseConfig';
import Alert from './Alert';

import {
	HeaderContainer,
	H1,
	FormContainer,
	Form,
	Input,
	BtnContainer,
	Button,
	TextContainer,
	TextLink,
} from './../Elements/FormElements';

const ForgotPassword = () => {
	const [resetPassword, setResetPassword] = useState('');
	const [formComplete, setFormComplete] = useState(false);
	const [alertState, setAlertState] = useState(false);
	const [alert, setAlert] = useState({ type: '', message: '' });

	const handleChange = (e) => {
		setResetPassword(e.target.value);
	};

	const email = /^[a-zA-Z0-9.-_+]+@[a-zA-Z]+.+[a-zA-Z]$/;

	const validateInputs = () => {
		if (email.test(resetPassword)) {
			setFormComplete(true);
		} else {
			setFormComplete(false);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setAlertState(false);
		if (formComplete) {
			auth
				.sendPasswordResetEmail(resetPassword)
				.then(() => {
					setResetPassword('');
					setFormComplete(false);
					setAlertState(true);
					setAlert({
						type: 'success',
						message: 'An email has been sent to change your password.',
					});
				})
				.catch(() => {
					setAlertState(true);
					setAlert({
						type: 'error',
						message: 'There is no user with this email.',
					});
				});
		} else {
			setAlertState(true);
			setAlert({
				type: 'error',
				message: 'Please complete the reset password form.',
			});
		}
	};

	return (
		<>
			<Helmet>
				<title>Reset Password</title>
			</Helmet>
			<HeaderContainer>
				<H1>MyExpenses</H1>
			</HeaderContainer>
			<FormContainer>
				<Form onSubmit={handleSubmit} autoComplete="off">
					<Input
						type="email"
						value={resetPassword}
						onChange={handleChange}
						onKeyUp={validateInputs}
						name="email"
						placeholder="Email"
					/>
					<BtnContainer>
						<Button type="submit" formComplete={formComplete}>
							Reset password
						</Button>
					</BtnContainer>
					<TextContainer>
						<TextLink to="/login">Log in</TextLink>
						<TextLink to="/register">Create account</TextLink>
					</TextContainer>
				</Form>
			</FormContainer>

			<Alert
				alertState={alertState}
				setAlertState={setAlertState}
				type={alert.type}
				message={alert.message}
			/>
		</>
	);
};

export default ForgotPassword;
