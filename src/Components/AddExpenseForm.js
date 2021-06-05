import React, { useState, useEffect } from 'react';
import SelectCategories from './SelectCategories';
import { addExpense, editExpense } from './../DataBase/FirebaseFunctions';
import { useAuth } from './../Context/AuthContext';
import isValid from 'date-fns/isValid';
import DayPicker from './DayPicker';
import Alert from './Alert';
import fromUnixTime from 'date-fns/fromUnixTime';
import { useHistory } from 'react-router-dom';

import { ExpensesContainer, Form, Input, CategDateContainer } from '../Elements/ExpensesElements';
import { BtnContainer, Button } from './../Elements/FormElements';

const AddExpenseForm = ({ expense }) => {
	const { user } = useAuth();
	const [formComplete, setFormComplete] = useState(false);
	const [alertState, setAlertState] = useState(false);
	const [alert, setAlert] = useState({ type: '', message: '' });

	const history = useHistory();

	const [expenseForm, setExpenseForm] = useState({
		description: '',
		amount: '',
		installments: '',
		category: 'Home',
		date: new Date(),
		uid: user.uid,
	});

	useEffect(() => {
		if (expense) {
			if (expense.uid === user.uid) {
				setFormComplete(true);
				setExpenseForm({
					description: expense.description,
					amount: expense.totalAmount,
					installments: expense.installments,
					category: expense.category,
					date: fromUnixTime(expense.date),
					uid: user.uid,
				});
			} else {
				history.replace('/');
			}
		}

		return () => {
			setFormComplete(false);
			setAlertState(false);
			setAlert({ type: '', message: '' });
			setExpenseForm({
				description: '',
				amount: '',
				installments: '',
				category: 'Home',
				date: new Date(),
				uid: user.uid,
			});
		};
	}, [history, expense, user, setFormComplete, setAlert]);

	const handleChange = (e) => {
		if (e.target.name === 'amount' || e.target.name === 'installments') {
			setExpenseForm({ ...expenseForm, [e.target.name]: e.target.value.replace(/[^0-9.]/g, '') });
		} else {
			setExpenseForm({ ...expenseForm, [e.target.name]: e.target.value });
		}
	};

	const validateInputs = () => {
		if (
			expenseForm.category === 'Subscription' &&
			expenseForm.description !== '' &&
			expenseForm.amount !== '' &&
			expenseForm.amount !== '0' &&
			isValid(expenseForm.date)
		) {
			setFormComplete(true);
		} else if (
			expenseForm.description !== '' &&
			Number(expenseForm.amount) > 0 &&
			expenseForm.installments !== '' &&
			expenseForm.installments !== '0' &&
			Number(expenseForm.installments) <= 24 &&
			isValid(expenseForm.date)
		) {
			setFormComplete(true);
		} else {
			setFormComplete(false);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setAlertState(false);

		if (expense) {
			if (formComplete) {
				editExpense(expenseForm, expense);
				setAlertState(true);
				setAlert({
					type: 'success',
					message: 'Expense edited successfully.',
				});
			} else {
				setAlertState(true);
				setAlert({
					type: 'error',
					message: 'Please complete the edit expense form correctly.',
				});
			}
		} else {
			setAlertState(false);
			if (formComplete) {
				addExpense(expenseForm);

				setExpenseForm({
					description: '',
					amount: '',
					installments: '',
					category: 'Home',
					date: new Date(),
					uid: user.uid,
				});
				setAlertState(true);
				setAlert({
					type: 'success',
					message: 'Expense added successfully.',
				});

				setFormComplete(false);
			} else {
				setAlertState(true);
				setAlert({
					type: 'error',
					message: 'Please complete the add expense form correctly.',
				});
			}
		}
	};
	return (
		<>
			<ExpensesContainer oneItem={true}>
				<CategDateContainer>
					<SelectCategories expenseForm={expenseForm} setExpenseForm={setExpenseForm} />

					<DayPicker
						expenseForm={expenseForm}
						setExpenseForm={setExpenseForm}
						validateInputs={validateInputs}
						expense={expense}
					/>
				</CategDateContainer>
				<Form onSubmit={handleSubmit} autoComplete="off">
					<Input
						type="text"
						name="description"
						value={expenseForm.description}
						onChange={handleChange}
						placeholder="Description"
						onKeyUp={validateInputs}
					/>
					<Input
						type="text"
						name="amount"
						value={expenseForm.amount}
						onChange={handleChange}
						placeholder="$0.00"
						onKeyUp={validateInputs}
					/>
					{expenseForm.category !== 'Subscription' && !expense && (
						<Input
							type="text"
							name="installments"
							value={expenseForm.installments}
							onChange={handleChange}
							placeholder="Installments"
							onKeyUp={validateInputs}
						/>
					)}
					<BtnContainer>
						<Button type="submit" formComplete={formComplete}>
							{expense ? 'Edit expense' : 'Add expense'}
						</Button>
					</BtnContainer>
				</Form>
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

export default AddExpenseForm;
