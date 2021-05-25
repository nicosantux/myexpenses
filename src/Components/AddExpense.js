import React from 'react';
import { Helmet } from 'react-helmet';
import AddExpenseForm from './AddExpenseForm';
import ExpensesHeader from './ExpensesHeader';

const AddExpense = () => {
	return (
		<>
			<Helmet>
				<title>Add Expense</title>
			</Helmet>
			<ExpensesHeader firstLink="List" firstRoute="/" secondLink="Categories" secondRoute="/categories" />
			<AddExpenseForm />
		</>
	);
};

export default AddExpense;
