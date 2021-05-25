import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { auth } from './../DataBase/FirebaseConfig';
import Alert from './Alert';
import { useAlert } from './../Context/AlertContext';
import { useFormComplete } from './../Context/FormCompleteContext';

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

const LoginScreen = () => {
	const [loginCredentials, setLoginCredentials] = useState({ email: '', password: '' });

	const { formComplete, setFormComplete } = useFormComplete();
	const { alert, setAlert } = useAlert();

	const expressions = {
		email: /^[a-zA-Z0-9.-_+]+@[a-zA-Z]+.+[a-zA-Z]$/,
		password: /^[\Sa-zA-z0-9.-_+#$%&/]{6,18}$/, // 6 a 18 characters includes. .-_+#$%&
	};

	useEffect(() => {
		setFormComplete(false);

		return setFormComplete(false);
	}, [setFormComplete]);

	const validateInputs = () => {
		if (
			expressions.email.test(loginCredentials.email) &&
			expressions.password.test(loginCredentials.password)
		) {
			setFormComplete(true);
		} else {
			setFormComplete(false);
		}
	};

	const handleChange = (e) => {
		setLoginCredentials({
			...loginCredentials,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (formComplete) {
			auth.signInWithEmailAndPassword(loginCredentials.email, loginCredentials.password).catch((error) => {
				console.log(error);
				switch (error.code) {
					case 'auth/user-not-found':
						setAlert({
							type: 'error',
							message: 'There is no user record corresponding to this identifier.',
							active: true,
						});
						break;
					case 'auth/wrong-password':
						setAlert({
							type: 'error',
							message: 'The password is invalid or the user does not have a password',
							active: true,
						});
						break;
					case 'auth/network-request-failed':
						setAlert({
							type: 'error',
							message:
								'A network error (such as timeout, interrupted connection or unreachable host) has occurred.',
							active: true,
						});
						break;
					default:
						setAlert({
							type: 'error',
							message: 'There was a problem to log in. Please check your credentials.',
							active: true,
						});
						break;
				}
			});
		} else {
			setAlert({
				type: 'error',
				message: 'Please complete the login form correctly',
				active: true,
			});
		}
	};

	return (
		<>
			<Helmet>
				<title>Log in</title>
			</Helmet>
			<HeaderContainer>
				<H1>MyExpenses</H1>
			</HeaderContainer>

			<FormContainer>
				<Form onSubmit={handleSubmit} autoComplete="off">
					<Input
						type="email"
						value={loginCredentials.email}
						onChange={handleChange}
						name="email"
						placeholder="Email"
						onKeyUp={validateInputs}
					/>
					<Input
						type="password"
						value={loginCredentials.password}
						onChange={handleChange}
						name="password"
						placeholder="Password"
						maxLength="16"
						onKeyUp={validateInputs}
					/>
					<BtnContainer>
						<Button type="submit" formComplete={formComplete}>
							Log in
						</Button>
					</BtnContainer>
					<TextContainer>
						<TextLink to="/password-recovery">Forgot password?</TextLink>
						<TextLink to="/register">Create new account</TextLink>
					</TextContainer>
				</Form>
			</FormContainer>

			<Alert alert={alert} setAlert={setAlert} />
		</>
	);
};

export default LoginScreen;
