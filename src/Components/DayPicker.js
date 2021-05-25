import React from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import { theme } from '../theme';
import subMonths from 'date-fns/subMonths';
import startOfMonth from 'date-fns/startOfMonth';
import fromUnixTime from 'date-fns/fromUnixTime';
import endOfMonth from 'date-fns/endOfMonth';

import 'react-datepicker/dist/react-datepicker.css';

const DayPicker = ({ expenseForm, setExpenseForm, validateInputs, expense }) => {
	return (
		<DayPickerContainer>
			{expense ? (
				<DatePicker
					selected={expenseForm.date}
					onChange={(date) => setExpenseForm({ ...expenseForm, date: date })}
					placeholderText="MMMM-dd-yyyy"
					onCalendarClose={validateInputs}
					dateFormat="MMMM dd yyyy"
					minDate={startOfMonth(fromUnixTime(expense.date))}
					maxDate={endOfMonth(fromUnixTime(expense.date))}
					todayButton="Today"
					highlightDates={[new Date()]}
					showDisabledMonthNavigation
				/>
			) : (
				<DatePicker
					selected={expenseForm.date}
					onChange={(date) => setExpenseForm({ ...expenseForm, date: date })}
					placeholderText="MMMM-dd-yyyy"
					onCalendarClose={validateInputs}
					dateFormat="MMMM dd yyyy"
					minDate={subMonths(new Date(), 2)}
					maxDate={new Date()}
					todayButton="Today"
					highlightDates={[new Date()]}
					showDisabledMonthNavigation
				/>
			)}
		</DayPickerContainer>
	);
};

export default DayPicker;

const DayPickerContainer = styled.div`
	input {
		align-items: center;
		background: ${theme.lightenPrimaryColor};
		border: none;
		border-radius: 1rem;
		box-sizing: border-box;
		color: white;
		cursor: pointer;
		display: flex;
		font-family: 'Raleway', sans-serif;
		font-size: 1.5rem;
		font-weight: 800;
		justify-content: center;
		outline: none;
		padding: 1rem 2rem;
		transition: 0.3s all ease;
		text-align: center;
		width: 100%;

		&:hover {
			background: ${theme.primaryColor};
		}

		&::placeholder {
			color: white;
		}

		@media (max-width: 700px) {
			font-size: 1.125rem;
			font-weight: 600;
			width: 100%;
		}
	}
`;
