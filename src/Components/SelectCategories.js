import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from './../theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import CategoriesIcon from './CategoriesIcon';

const SelectCategories = ({ expenseForm, setExpenseForm }) => {
	const [showOptions, setShowOptions] = useState(false);

	const categoriesList = [
		{ id: 'Home', category: 'Home' },
		{ id: 'Food', category: 'Food' },
		{ id: 'Phone', category: 'Phone' },
		{ id: 'Leisure', category: 'Leisure' },
		{ id: 'Market', category: 'Market' },
		{ id: 'Health and care', category: 'Health and care' },
		{ id: 'Services', category: 'Services' },
		{ id: 'Education', category: 'Education' },
		{ id: 'Clothes', category: 'Clothes' },
		{ id: 'Technology', category: 'Technology' },
		{ id: 'Travel', category: 'Travel' },
		{ id: 'Holidays', category: 'Holidays' },
	];

	const handleClick = (e) => {
		setExpenseForm({ ...expenseForm, category: e.currentTarget.dataset.value });
		setShowOptions(false);
	};

	return (
		<SelectContainer>
			<SelectedOption onClick={() => setShowOptions(!showOptions)}>
				{expenseForm.category} <FontAwesomeIcon icon={faSortDown} />
			</SelectedOption>
			{showOptions && (
				<Options>
					{categoriesList.map((category) => {
						return (
							<Option key={category.id} onClick={handleClick} data-value={category.id}>
								<CategoriesIcon category={category.category} /> {category.category}
							</Option>
						);
					})}
				</Options>
			)}
		</SelectContainer>
	);
};

export default SelectCategories;

const SelectContainer = styled.div`
	align-items: center;
	background: ${theme.lightenPrimaryColor};
	border-radius: 1rem;
	color: white;
	cursor: pointer;
	display: flex;
	font-family: 'Raleway', sans-serif;
	font-size: 1.5rem;
	font-weight: 800;
	padding: 1rem 2rem;
	position: relative;
	transition: 0.3s ease all;
	text-align: center;
	width: 30%;
	&:hover {
		background: ${theme.primaryColor};
	}
	@media (max-width: 1024px) {
		width: 40%;
	}
	@media (max-width: 700px) {
		font-size: 1.125rem;
		font-weight: 600;
		margin-top: 1rem;
		width: 60%;
	}
`;

const SelectedOption = styled.div`
	align-items: center;
	display: flex;
	justify-content: space-between;
	width: 100%;
`;

const Options = styled.div`
	background: ${theme.lightenPrimaryColor};
	border-radius: 1rem;
	left: 0;
	max-height: 18.75rem;
	overflow-y: auto;
	position: absolute;
	top: 5rem;
	width: 100%;

	@media (max-width: 700px) {
		top: rem;
	}
`;

const Option = styled.div`
	display: grid;
	grid-template-columns: 0.5fr 3fr;
	place-items: start;
	padding: 1.25rem;

	&:hover {
		background: ${theme.primaryColor};
	}
`;
