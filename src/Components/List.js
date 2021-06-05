import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useGetExpenses from '../Hooks/useGetExpenses';
import fromUnixTime from 'date-fns/fromUnixTime';
import format from 'date-fns/format';
import formatMoney from './../FormatMoney';
import CategoriesIcon from './CategoriesIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import DeleteExpenseAlert from './DeleteExpenseAlert';
import { theme } from '../theme';

import {
	H2,
	ExpensesContainer,
	BtnContainer,
	Button,
	ExpenseListContainer,
	ListInfoContainer,
	IconContainer,
	Date,
} from './../Elements/ExpensesElements';

const List = () => {
	const [isExpenses, setIsExpenses] = useState(true);
	const [expensesList, getMoreExpenses, moreToLoad] = useGetExpenses();
	const [deleteExpense, setDeleteExpense] = useState(false);
	const [idToDelete, setIdToDelete] = useState('');

	const history = useHistory();

	useEffect(() => {
		if (expensesList.length > 0) {
			setIsExpenses(true);
		} else {
			setIsExpenses(false);
		}
	}, [expensesList]);

	const transformDate = (date) => {
		return format(fromUnixTime(date), 'MMMM dd yyyy');
	};

	const equalDate = (expensesList, index, expense) => {
		if (index !== 0) {
			const actualDate = transformDate(expense.date);
			const lastDate = transformDate(expensesList[index - 1].date);

			if (actualDate === lastDate) {
				return true;
			} else {
				return false;
			}
		}
	};

	const handleDelete = (id) => {
		setIdToDelete(id);
		setDeleteExpense(true);
	};

	return (
		<ExpensesContainer oneItem={isExpenses}>
			{isExpenses ? (
				<>
					{expensesList.map((expense, index) => {
						return (
							<ExpenseListContainer key={expense.id}>
								{!equalDate(expensesList, index, expense) && <Date>{transformDate(expense.date)}</Date>}
								<ListInfoContainer>
									<Category>
										<CategoriesIcon category={expense.category} />
										{expense.category}
									</Category>
									<Description>{expense.description}</Description>
									<Amount>{formatMoney(expense.amount)}</Amount>
									<Installments>{expense.installmentsDescription}</Installments>
									<IconContainer>
										<FontAwesome icon={faEdit} onClick={() => history.push(`/edit-expense/${expense.id}`)} />
										<FontAwesome icon={faTrashAlt} onClick={() => handleDelete(expense.id)} />
									</IconContainer>
								</ListInfoContainer>
							</ExpenseListContainer>
						);
					})}
					<BtnContainer>
						{moreToLoad && (
							<Button as="button" onClick={() => getMoreExpenses()}>
								Load more
							</Button>
						)}
					</BtnContainer>
				</>
			) : (
				<>
					<H2>Your expenses list is empty</H2>
					<BtnContainer>
						<Button to="/add-expense">Add expense</Button>
					</BtnContainer>
				</>
			)}
			{deleteExpense && <DeleteExpenseAlert setDeleteExpense={setDeleteExpense} idToDelete={idToDelete} />}
		</ExpensesContainer>
	);
};

export default List;

const FontAwesome = styled(FontAwesomeIcon)`
	cursor: pointer;
`;

const Category = styled.h2`
	color: ${theme.primaryColor};
	font-size: 1.125rem;
	font-weight: 600;
	padding: 0 2rem;

	@media (max-width: 1024px) {
		/* font-size: 1rem; */
		display: none;
		padding: 0 1rem;
	}

	@media (max-width: 700px) {
		display: none;
	}
`;
const Description = styled.h2`
	color: ${theme.primaryColor};
	font-size: 1.125rem;
	font-weight: 600;
	padding: 0 2rem;

	@media (max-width: 1024px) {
		/* font-size: 1rem; */
		padding: 0 1rem;
	}

	@media (max-width: 700px) {
		/* font-size: 1rem; */
		padding: 0 1rem;
	}
`;
const Amount = styled.h2`
	color: ${theme.primaryColor};
	font-size: 1.125rem;
	font-weight: 600;
	padding: 0 2rem;

	@media (max-width: 1024px) {
		/* font-size: 1rem; */
		padding: 0 1rem;
	}

	@media (max-width: 700px) {
		font-size: 1rem;
		padding: 0 1rem;
	}
`;
const Installments = styled.h2`
	color: ${theme.primaryColor};
	font-size: 1.125rem;
	font-weight: 600;
	padding: 0 2rem;

	@media (max-width: 1024px) {
		/* font-size: 1rem; */
		padding: 0 1rem;
	}

	@media (max-width: 700px) {
		display: none;
	}
`;
