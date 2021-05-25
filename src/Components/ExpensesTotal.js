import React from 'react';
import formatMoney from '../FormatMoney';
import useGetMonthlyExpenses from '../Hooks/useGetMonthlyExpenses';

import { TotalContainer, TextTotal } from './../Elements/ExpensesElements';

const ExpensesTotal = () => {
	const [monthlyExpenses] = useGetMonthlyExpenses();

	const total = monthlyExpenses.reduce((accumulator, expense) => {
		return accumulator + expense.amount;
	}, 0);

	return (
		<TotalContainer>
			<TextTotal>Monthly expenses: </TextTotal>
			<TextTotal>{formatMoney(total)}</TextTotal>
		</TotalContainer>
	);
};

export default ExpensesTotal;
