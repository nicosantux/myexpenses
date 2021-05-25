import React from 'react';
import { Helmet } from 'react-helmet';
import ExpensesHeader from './ExpensesHeader';
import ExpensesTotal from './ExpensesTotal';

import List from './List';

const ExpensesList = () => {
	return (
		<>
			<Helmet>
				<title>MyExpenses List</title>
			</Helmet>

			<ExpensesHeader
				firstLink="Add expense"
				firstRoute="/add-expense"
				secondLink="Categories"
				secondRoute="/categories"
			/>
			<List />
			<ExpensesTotal />
		</>
	);
};

export default ExpensesList;
