import React from 'react';
import { Helmet } from 'react-helmet';
import ExpensesHeader from './ExpensesHeader';
import ExpensesTotal from './ExpensesTotal';
import useGetCategoriesExpenses from './../Hooks/useGetCategoriesExpenses';
import formatMoney from '../FormatMoney';
import CategoriesIcon from './CategoriesIcon';

import {
	ExpensesContainer,
	ExpenseListContainer,
	ListInfoContainer,
	Item,
} from './../Elements/ExpensesElements';

const Categories = () => {
	const [categoriesExpenses] = useGetCategoriesExpenses();

	return (
		<>
			<Helmet>
				<title>Categories</title>
			</Helmet>
			<ExpensesHeader firstLink="Add expense" firstRoute="/add-expense" secondLink="List" secondRoute="/" />
			<ExpensesContainer oneItem>
				<ExpenseListContainer>
					{categoriesExpenses.map((category, index) => {
						return (
							<ListInfoContainer key={index} categories>
								<Item>
									<CategoriesIcon category={category.category} /> {category.category}
								</Item>
								<Item>{formatMoney(category.total)}</Item>
							</ListInfoContainer>
						);
					})}
				</ExpenseListContainer>
			</ExpensesContainer>

			<ExpensesTotal />
		</>
	);
};

export default Categories;
