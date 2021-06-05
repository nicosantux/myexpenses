import React from 'react';
import { Helmet } from 'react-helmet';
import AddExpenseForm from './AddExpenseForm';
import ExpensesHeader from './ExpensesHeader';
import { useParams } from 'react-router-dom';
import useGetExpenseById from '../Hooks/useGetExpenseById';

const EditExpense = () => {
	const { id } = useParams();

	const [expense] = useGetExpenseById(id);

	return (
		<>
			<Helmet>
				<title>Edit Expense</title>
			</Helmet>

			<ExpensesHeader firstLink="Add Expense" firstRoute="/add-expense" secondLink="List" secondRoute="/" />
			<AddExpenseForm expense={expense} />
		</>
	);
};

export default EditExpense;
