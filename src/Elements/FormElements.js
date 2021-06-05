import styled from 'styled-components';
import { theme } from './../theme';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
`;
const H1 = styled.h1`
	color: ${theme.primaryColor};
	font-size: 6rem;
	font-weight: 800;
	margin-top: 4rem;

	@media (max-width: 700px) {
		font-size: 3.5rem;
	}
`;

const FormContainer = styled.div`
	margin-top: ${(props) => (props.password ? '0' : '9.1875rem')};
	width: 30%;

	@media (max-width: 1024px) {
		width: 50%;
	}
	@media (max-width: 700px) {
		width: 90%;
	}
`;

const Form = styled.form`
	display: flex;
	justify-content: center;
	flex-direction: column;
`;

const Input = styled.input`
	border: none;
	border-bottom: 2px solid ${theme.primaryColor};
	color: ${theme.primaryColor};
	font-size: 1.5rem;
	margin-bottom: 1.5rem;
	outline: none;
	padding: 0.5rem 0.5rem;
	text-align: center;
	width: 100%;

	&::placeholder {
		color: #ccc;
	}
`;

const BtnContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Button = styled.button`
	background: ${(props) => (props.formComplete ? theme.primaryColor : theme.lightenPrimaryColor)};
	border-radius: 2.25rem;
	border: none;
	box-shadow: 2px 2px 4px rgba(32, 9, 80, 0.5);
	color: white;
	cursor: pointer;
	font-family: 'Raleway', sans-serif;
	font-size: 1.5rem;
	font-weight: 800;
	margin-top: 2.5rem;
	outline: none;
	padding: 1rem 2rem;
	transition: 0.5s all ease;

	@media (max-width: 700px) {
		font-family: 'Raleway', sans-serif;
		font-size: 1rem;
		font-weight: 600;
	}
`;

const TextContainer = styled.div`
	align-items: center;
	display: flex;
	justify-content: ${(props) => (props.oneLink ? 'center' : 'space-evenly')};
	margin-top: 1.5rem;
`;

const TextLink = styled(Link)`
	color: ${theme.primaryColor};
	font-size: 1.125rem;
	&:hover {
		text-decoration: none;
	}
`;

export { HeaderContainer, H1, FormContainer, Form, Input, BtnContainer, Button, TextContainer, TextLink };
