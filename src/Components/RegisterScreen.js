<<<<<<< HEAD
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { auth } from './../DataBase/FirebaseConfig';
import Alert from './Alert';
import { useHistory } from 'react-router-dom';

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

	const [formComplete, setFormComplete] = useState(false);
	const [alertState, setAlertState] = useState(false);
	const [alert, setAlert] = useState({ type: '', message: '' });
	const history = useHistory();

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
		setAlertState(false);

		if (formComplete) {
			try {
				const { user } = await auth.createUserWithEmailAndPassword(register.email, register.password);
				user.sendEmailVerification();

				history.replace('/verify-email');

				setFormComplete(false);
			} catch (error) {
				if (error.code === 'auth/email-already-in-use') {
					setAlertState(true);
					setAlert({
						type: 'error',
						message: error.message,
					});
				}
			}
		} else {
			setAlertState(true);
			setAlert({
				type: 'error',
				message: 'Please complete the register form correclty',
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
			<Alert
				alertState={alertState}
				setAlertState={setAlertState}
				type={alert.type}
				message={alert.message}
			/>
		</>
	);
};

export default RegisterScreen;
=======
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { auth } from './../DataBase/FirebaseConfig';
import Alert from './Alert';
import { useHistory } from 'react-router-dom';

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

	const [formComplete, setFormComplete] = useState(false);
	const [alertState, setAlertState] = useState(false);
	const [alert, setAlert] = useState({ type: '', message: '' });
	const history = useHistory();

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
		setAlertState(false);

		if (formComplete) {
			try {
				const { user } = await auth.createUserWithEmailAndPassword(register.email, register.password);
				user.sendEmailVerification();

				history.replace('/verify-email');

				setFormComplete(false);
			} catch (error) {
				if (error.code === 'auth/email-already-in-use') {
					setAlertState(true);
					setAlert({
						type: 'error',
						message: error.message,
					});
				}
			}
		} else {
			setAlertState(true);
			setAlert({
				type: 'error',
				message: 'Please complete the register form correclty',
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
			<Alert
				alertState={alertState}
				setAlertState={setAlertState}
				type={alert.type}
				message={alert.message}
			/>
		</>
	);
};

export default RegisterScreen;
>>>>>>> 93c5c1bed16a84a895fe0677f6d505b28ea0514a
