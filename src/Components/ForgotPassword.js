import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { auth } from '../DataBase/FirebaseConfig';
import { useFormComplete } from './../Context/FormCompleteContext';
import Alert from './Alert';
import { useAlert } from './../Context/AlertContext';

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
	const { formComplete, setFormComplete } = useFormComplete();
	const { alert, setAlert } = useAlert();

	const emailExpression = /^[a-zA-Z0-9.-_+]+@[a-zA-Z]+.+[a-zA-Z]$/;

	useEffect(() => {
		setFormComplete(false);

		return setFormComplete(false);
	}, [setFormComplete]);

	const handleChange = (e) => {
		setResetPassword(e.target.value);
	};

	const validateInputs = () => {
		if (emailExpression.test(resetPassword)) {
			setFormComplete(true);
		} else {
			setFormComplete(false);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (formComplete) {
			auth
				.sendPasswordResetEmail(resetPassword)
				.then(() => {
					setResetPassword('');
					setFormComplete(false);
					setAlert({
						type: 'success',
						message: 'An email has been sent to change your password.',
						active: true,
					});
				})
				.catch((error) => {
					setAlert({
						type: 'error',
						message: 'There is no user with this email.',
						active: true,
					});
				});
		} else {
			setAlert({
				type: 'error',
				message: 'Please complete the reset password form.',
				active: true,
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

			<Alert alert={alert} setAlert={setAlert} />
		</>
	);
};

export default ForgotPassword;
