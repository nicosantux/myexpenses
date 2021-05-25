import React from 'react';
import styled, { keyframes } from 'styled-components';
import { deleteExpense } from '../DataBase/FirebaseFunctions';
import useGetExpenseById from '../Hooks/useGetExpenseById';
import { theme } from '../theme';

const DeleteExpenseAlert = ({ setDeleteExpense, idToDelete }) => {
	const [expenseToDelete] = useGetExpenseById(idToDelete);

	const handleConfirm = () => {
		deleteExpense(expenseToDelete);
		setDeleteExpense(false);
	};

	return (
		<>
			<AlertContainer>
				<H2>Confirm delete?</H2>
				<BtnContainer>
					<Button onClick={handleConfirm}>Yes</Button>
					<Button onClick={() => setDeleteExpense(false)}>No</Button>
				</BtnContainer>
			</AlertContainer>
			<Background></Background>
		</>
	);
};

export default DeleteExpenseAlert;

const backgroundAnimation = keyframes`
	0%{
		opacity: 0;
	}

	10%{
		opacity: 1;
	}

	100%{
		opacity: 1;
	}
`;

const AlertAnimation = keyframes`
	0%{
		transform: translate(-50%, -50%) scale(0);
	}

	10%{
		transform: translate(-50%, -50%) scale(1);
	}

	100%{
		transform: translate(-50%, -50%) scale(1);
	}
`;

const AlertContainer = styled.div`
	animation: ${AlertAnimation} 4s ease-in-out;
	background: white;
	border-radius: 1rem;
	box-shadow: 1px solid ${theme.darkenPrimaryColor};
	display: flex;
	flex-direction: column;
	left: 50%;
	padding: 1rem 2rem;
	position: fixed;
	transform: translate(-50%, -50%);
	top: 50%;
	width: fit-content;
	z-index: 1000;
	width: fit-content;

	@media (max-width: 700px) {
		width: 85%;
	}
`;

const H2 = styled.h2`
	color: ${theme.primaryColor};
	font-size: 1.5rem;
	margin-bottom: 2rem;
	text-align: center;
`;

const BtnContainer = styled.div`
	align-items: center;
	display: flex;
	justify-content: space-evenly;
`;

const Button = styled.button`
	background: ${theme.primaryColor};
	border: none;
	border-radius: 2rem;
	color: white;
	cursor: pointer;
	font-family: 'Raleway', sans-serif;
	font-size: 1rem;
	font-weight: 800;
	margin: 0 1rem 1rem 1rem;
	outline: none;
	padding: 1rem 2rem;

	@media (max-width: 700px) {
		font-weight: 600;
	}
`;

const Background = styled.div`
	animation: ${backgroundAnimation} 2s ease-in-out forwards;
	background: rgba(0, 0, 0, 0.9);
	height: 100vh;
	left: 0%;
	opacity: 0.9;
	position: fixed;
	top: 0%;
	width: 100vw;
	z-index: 900;
`;
