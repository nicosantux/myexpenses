import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import ExpensesHeader from './ExpensesHeader';
import { useAuth } from './../Context/AuthContext';
import Alert from './Alert';

import { ExpensesContainer } from './../Elements/ExpensesElements';
import { FormContainer, Form, Input, BtnContainer, Button } from './../Elements/FormElements';

const ResetPassword = () => {
	const { user } = useAuth();
	const [resetPassword, setResetPassword] = useState({ password: '', password2: '' });
	const [alertState, setAlertState] = useState(false);
	const [alert, setAlert] = useState({ type: '', message: '' });
	const [formComplete, setFormComplete] = useState(false);

	const password = /^[\Sa-zA-z0-9.-_+#$%&/]{6,18}$/;

	const validateInputs = () => {
		if (password.test(resetPassword.password) && resetPassword.password2 === resetPassword.password) {
			setFormComplete(true);
		} else {
			setFormComplete(false);
		}
	};

	const handleChange = (e) => {
		setResetPassword({
			...resetPassword,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setAlertState(false);

		if (formComplete) {
			user
				.updatePassword(resetPassword.password)
				.then(() => {
					setAlertState(true);
					setAlert({
						type: 'success',
						message: 'Password changed successfully.',
					});

					setResetPassword({ password: '', password2: '' });

					setFormComplete(false);
				})
				.catch((error) => {
					switch (error.code) {
						case 'auth/requires-recent-login':
							setAlertState(true);
							setAlert({
								type: 'error',
								message:
									'This operation is sensitive and requires recent au…ation. Log in again before retrying this request.',
							});
							break;

						default:
							setAlertState(true);
							setAlert({
								type: 'error',
								message: 'There was an error changing your password. Please try again.',
							});
							break;
					}
				});
		} else {
			setAlertState(true);
			setAlert({
				type: 'error',
				message: 'Please complete the change password form correctly.',
			});
		}
	};

	return (
		<>
			<Helmet>
				<title>Reset Password</title>
			</Helmet>
			<ExpensesHeader firstLink="Add Expense" firstRoute="/add-expense" secondLink="List" secondRoute="/" />

			<ExpensesContainer>
				<FormContainer password>
					<Form onSubmit={handleSubmit}>
						<Input
							type="password"
							name="password"
							value={resetPassword.password}
							onChange={handleChange}
							onKeyUp={validateInputs}
							placeholder="Type your new password"
						/>
						<Input
							type="password"
							name="password2"
							value={resetPassword.password2}
							onChange={handleChange}
							onKeyUp={validateInputs}
							placeholder="Re type your new password"
						/>
						<BtnContainer>
							<Button formComplete={formComplete}>Change password</Button>
						</BtnContainer>
					</Form>
				</FormContainer>
			</ExpensesContainer>
			<Alert
				alertState={alertState}
				setAlertState={setAlertState}
				type={alert.type}
				message={alert.message}
			/>
		</>
	);
};

export default ResetPassword;
