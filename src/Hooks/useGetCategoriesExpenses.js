import { useState, useEffect } from 'react';
import useGetMonthlyExpenses from './../Hooks/useGetMonthlyExpenses';

const useGetCategoriesExpenses = () => {
	const [categoriesExpenses, setCategoriesExpenses] = useState([]);
	const [monthlyExpenses] = useGetMonthlyExpenses();

	useEffect(() => {
		const categories = monthlyExpenses.reduce(
			(accumulator, expense) => {
				const category = expense.category;
				const amount = expense.amount;

				accumulator[category] += amount;

				return accumulator;
			},
			{
				Home: 0,
				Food: 0,
				Phone: 0,
				Leisure: 0,
				Market: 0,
				'Health and care': 0,
				Services: 0,
				Education: 0,
				Clothes: 0,
				Technology: 0,
				Travel: 0,
				Holidays: 0,
			}
		);

		setCategoriesExpenses(
			Object.keys(categories).map((category) => {
				return { category: category, total: categories[category] };
			})
		);
	}, [monthlyExpenses]);

	return [categoriesExpenses];
};

export default useGetCategoriesExpenses;
