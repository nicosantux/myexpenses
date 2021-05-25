import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { auth } from './../DataBase/FirebaseConfig';
import { useFormComplete } from './../Context/FormCompleteContext';
import { useAlert } from './../Context/AlertContext';
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

const RegisterScreen = () => {
	const [register, setRegister] = useState({ email: '', password: '', password2: '' });

	const { formComplete, setFormComplete } = useFormComplete();
	const { alert, setAlert } = useAlert();

	useEffect(() => {
		setFormComplete(false);

		return setFormComplete(false);
	}, [setFormComplete]);

	const expressions = {
		email: /^[a-zA-Z0-9.-_+]+@[a-zA-Z]+.+[a-zA-Z]$/,
		password: /^[\Sa-zA-z0-9.-_+#$%&/]{6,18}$/, // 6 a 18 characters includes. .-_+#$%&
	};

	const handleChange = (e) => {
		setRegister({
			...register,
			[e.target.name]: e.target.value,
		});
	};

	const validateInputs = () => {
		if (
			expressions.email.test(register.email) &&
			expressions.password.test(register.password) &&
			register.password === register.password2
		) {
			setFormComplete(true);
		} else {
			setFormComplete(false);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (formComplete) {
			try {
				const { user } = await auth.createUserWithEmailAndPassword(register.email, register.password);
				user.sendEmailVerification();

				setFormComplete(false);
			} catch (error) {
				if (error.code === 'auth/email-already-in-use') {
					setAlert({
						type: 'error',
						message: error.message,
						active: true,
					});
				}
			}
		} else {
			setAlert({
				type: 'error',
				message: 'Please complete the register form correclty',
				active: true,
			});
		}
	};

	return (
		<>
			<Helmet>
				<title>Register</title>
			</Helmet>
			<HeaderContainer>
				<H1>MyExpenses</H1>
			</HeaderContainer>
			<FormContainer>
				<Form onSubmit={handleSubmit} autoComplete="off">
					<Input
						type="email"
						value={register.email}
						onChange={handleChange}
						name="email"
						placeholder="Email"
						onKeyUp={validateInputs}
					/>
					<Input
						type="password"
						value={register.password}
						onChange={handleChange}
						name="password"
						placeholder="Password"
						maxLength="16"
						onKeyUp={validateInputs}
					/>
					<Input
						type="password"
						value={register.password2}
						onChange={handleChange}
						name="password2"
						placeholder="Confirm password"
						maxLength="16"
						onKeyUp={validateInputs}
					/>
					<BtnContainer>
						<Button type="submit" formComplete={formComplete}>
							Create account
						</Button>
					</BtnContainer>
					<TextContainer oneLink={true}>
						<TextLink to="/login">Already in MyExpenses? Log in</TextLink>
					</TextContainer>
				</Form>
			</FormContainer>
			<Alert alert={alert} setAlert={setAlert} />
		</>
	);
};

export default RegisterScreen;
