import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import ExpensesHeader from './ExpensesHeader';
import { useAuth } from './../Context/AuthContext';
import { useAlert } from './../Context/AlertContext';
import { useFormComplete } from './../Context/FormCompleteContext';
import Alert from './Alert';

import { ExpensesContainer } from './../Elements/ExpensesElements';
import { FormContainer, Form, Input, BtnContainer, Button } from './../Elements/FormElements';

const ResetPassword = () => {
	const [resetPassword, setResetPassword] = useState({ password: '', password2: '' });

	const { user } = useAuth();
	const { alert, setAlert } = useAlert();
	const { formComplete, setFormComplete } = useFormComplete();

	const expression = /^[\Sa-zA-z0-9.-_+#$%&/]{6,18}$/;

	const validateInputs = () => {
		if (expression.test(resetPassword.password) && resetPassword.password === resetPassword.password2) {
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

		if (formComplete) {
			user
				.updatePassword(resetPassword.password)
				.then(() => {
					setAlert({
						type: 'success',
						message: 'Password changed successfully.',
						active: true,
					});

					setResetPassword({ password: '', password2: '' });

					setFormComplete(false);
				})
				.catch((error) => {
					switch (error.code) {
						case 'auth/requires-recent-login':
							setAlert({
								type: 'error',
								message:
									'This operation is sensitive and requires recent au…ation. Log in again before retrying this request.',
								active: true,
							});
							break;

						default:
							setAlert({
								type: 'error',
								message: 'There was an error changing your password. Please try again.',
								active: true,
							});
							break;
					}
				});
		} else {
			setAlert({
				type: 'error',
				message: 'Please complete the change password form correctly.',
				active: true,
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
			<Alert alert={alert} setAlert={setAlert} />
		</>
	);
};

export default ResetPassword;
