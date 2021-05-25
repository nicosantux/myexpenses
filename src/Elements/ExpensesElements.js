import styled, { css } from 'styled-components';
import { theme } from './../theme';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.div`
	align-items: center;
	background: ${theme.primaryColor};
	display: flex;
	justify-content: space-between;
	padding: 2rem;
	width: 100%;

	@media (max-width: 700px) {
		justify-content: flex-start;
		flex-direction: column;
		padding: 1rem;
	}
`;

const H1 = styled.h1`
	color: white;
	font-size: 3rem;
	font-weight: 800;

	@media (max-width: 700px) {
		font-size: 2rem;
	}
`;

const H2 = styled.h2`
	color: ${theme.primaryColor};
	font-size: 2.25rem;
	font-weight: 800;

	@media (max-width: 700px) {
		font-size: 1.25rem;
	}
`;

const H3 = styled.h3`
	color: ${theme.primaryColor};
	font-size: 1.5rem;
	font-weight: 800;
	text-align: center;

	@media (max-width: 700px) {
		font-size: 1rem;
		font-weight: 600;
	}
`;

const NavBar = styled.div`
	align-items: center;
	display: flex;
	justify-content: space-between;

	@media (max-width: 700px) {
		overflow: hidden;
		max-height: ${(props) => (props.showHamburger ? '200px' : '0')};
		flex-direction: column;
		margin-top: ${(props) => (props.showHamburger ? '1rem' : '0')};
		transition: 0.3s max-height ease-in-out;
	}
`;

const NavItem = styled(Link)`
	color: white;
	background: none;
	border: none;
	cursor: pointer;
	font-size: 1.5rem;
	font-weight: 800;
	margin-left: 2rem;
	outline: none;
	text-decoration: none;

	@media (max-width: 700px) {
		font-size: 1.5rem;
		font-weight: 600;
		margin: 1rem 0;
	}
`;

const ExpensesContainer = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
	height: 100%;
	justify-content: ${(props) => (props.oneItem ? 'flex-start' : 'center')};
	margin-bottom: 3rem;
	overflow-y: auto;
	padding: 2rem;
	width: 100%;

	@media (max-width: 700px) {
		padding: 2rem 1rem;
	}
`;

const BtnContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Button = styled(Link)`
	background: ${theme.primaryColor};
	border-radius: 2.25rem;
	border: none;
	box-shadow: 2px 2px 4px rgba(32, 9, 80, 0.5);
	color: white;
	cursor: pointer;
	display: inline-block;
	font-size: 1.5rem;
	font-weight: 800;
	margin-top: 2rem;
	outline: none;
	padding: 1rem 2rem;
	transition: 0.5s all ease;
	text-decoration: none;

	@media (max-width: 700px) {
		font-size: 1rem;
	}
`;

const Form = styled.form`
	width: 100%;
`;

const Input = styled.input`
	border: none;
	border-bottom: 2px solid ${theme.primaryColor};
	color: ${theme.primaryColor};
	font-family: 'Raleway', sans-serif;
	font-size: 2.25rem;
	font-weight: 800;
	margin-bottom: 1.5rem;
	outline: none;
	padding-bottom: 1rem;
	text-align: center;
	width: 100%;

	&::placeholder {
		color: #ccc;
	}

	@media (max-width: 700px) {
		font-size: 1.5rem;
	}
`;

const CategDateContainer = styled.div`
	align-items: center;
	display: flex;
	justify-content: space-between;
	margin-bottom: 10.125rem;
	width: 100%;

	@media (max-width: 700px) {
		flex-direction: column-reverse;
		justify-content: center;
		margin-bottom: 8rem;
	}
`;

const ExpenseListContainer = styled.div`
	width: 100%;
`;

const ListInfoContainer = styled.div`
	border-bottom: 1px solid ${theme.lightenPrimaryColor};
	display: grid;
	place-items: center;
	grid-template-columns: ${(props) => (props.categories ? '1fr 1fr' : '2fr 3fr 2fr 1fr 0.5fr')};
	margin-bottom: 2rem;
	padding-bottom: 1rem;
	width: 100%;

	&:hover {
		div:last-child {
			opacity: 1;
			transition: 0.3s all ease-in-out;
		}
	}

	div:last-child {
		opacity: 0;
		transition: 0.3s all ease-in-out;
	}
	${(props) =>
		props.categories &&
		css`
			align-items: center;
			display: flex;
			justify-content: space-between;
		`};

	@media (max-width: 1024px) {
		grid-template-columns: ${(props) => (props.categories ? '1fr 1fr' : ' 2fr 2fr 1fr 0.5fr')};

		div:last-child {
			opacity: 1;
		}
	}
	@media (max-width: 700px) {
		grid-template-columns: ${(props) => (props.categories ? '1fr 1fr' : ' 1.5fr 1fr 0.5fr')};

		div:last-child {
			opacity: 1;
		}
	}
`;

const IconContainer = styled.div`
	align-items: center;
	color: ${theme.primaryColor};
	display: flex;
	justify-content: space-evenly;
	width: 100%;
`;

const Date = styled.p`
	background-color: ${theme.lightenPrimaryColor};
	border-radius: 16rem;
	color: white;
	font-size: 1rem;
	font-weight: 800;
	margin-bottom: 2rem;
	padding: 1rem 2rem;
	width: fit-content;
`;

const Item = styled.h2`
	color: ${theme.primaryColor};
	font-size: 1.125rem;
	font-weight: 600;
	padding: 0 2rem;

	@media (max-width: 700px) {
		font-size: 1rem;
		padding: 0 1rem;
	}
`;

const TotalContainer = styled.div`
	align-items: center;
	background-color: ${theme.primaryColor};
	bottom: 0;
	display: flex;
	justify-content: space-between;
	padding: 1rem 2rem;
	position: absolute;
	width: 100%;

	@media (max-width: 700px) {
		padding: 1rem;
	}
`;

const TextTotal = styled.h2`
	color: white;
	font-size: 1.125rem;
	text-transform: uppercase;
`;

export {
	HeaderContainer,
	H1,
	H2,
	H3,
	NavBar,
	NavItem,
	ExpensesContainer,
	BtnContainer,
	Button,
	Form,
	Input,
	CategDateContainer,
	ListInfoContainer,
	IconContainer,
	ExpenseListContainer,
	Date,
	Item,
	TotalContainer,
	TextTotal,
};
