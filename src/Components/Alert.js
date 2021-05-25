import React from 'react';
import { useEffect } from 'react/cjs/react.development';
import styled, { keyframes } from 'styled-components';
import { theme } from './../theme';

const alertAnimation = keyframes`
    0% {
        transform: translateY(-1.5rem);
        opacity: 0;
    }

    25%{
        transform: translateY(1.5rem);
        opacity: 1;
    }

    75%{
        transform: translateY(1.5rem);
        opacity: 1;
    }

    100%{
        transform: translateY(-1.5rem);
        opacity: 0;
    }
`;

const AlertContainer = styled.div`
	align-items: center;
	animation: ${alertAnimation} 4s ease-in-out forwards;
	background: ${(props) => (props.type === 'success' ? `${theme.successColor}` : `${theme.errorColor}`)};
	border-radius: 0.5rem;
	display: flex;
	justify-content: center;
	position: fixed;
	width: fit-content;
	z-index: 100;

	p {
		color: white;
		padding: 1rem 2rem;
	}
`;

const Alert = ({ alert, setAlert }) => {
	const { type, message, active } = alert;

	useEffect(() => {
		let time;

		if (active) {
			time = setTimeout(() => {
				setAlert({ type: '', message: '', active: false });
			}, 4000);
		}

		return () => clearTimeout(time);
	}, [active, setAlert]);

	return (
		<>
			{active && (
				<AlertContainer type={type}>
					<p>{message}</p>
				</AlertContainer>
			)}
		</>
	);
};

export default Alert;
