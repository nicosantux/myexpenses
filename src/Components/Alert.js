import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { theme } from '../theme';

const slideDown = keyframes`
    0% {
        transform: translateY(-1.25rem); /* 20px */
        opacity: 0;
    }
 
    10% {
        transform: translateY(1.25rem);
        opacity: 1;
    }
    
    90% {
        transform: translateY(1.25rem);
        opacity: 1;
    }
 
    100% {
        transform: translateY(1.25rem);
        opacity: 0;
    }
`;

const AlertContainer = styled.div`
	align-items: center;
	animation: ${slideDown} 4s ease-in-out forwards;
	display: flex;
	justify-content: center;
	left: 0;
	position: fixed;
	top: 1.25rem;
	width: 100%;
	z-index: 1000;

	p {
		background: ${(props) => {
			if (props.type === 'error') {
				return theme.errorColor;
			} else if (props.type === 'success') {
				return theme.successColor;
			} else {
				return '#000';
			}
		}};
		border-radius: 1rem;
		box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
		color: #fff;
		padding: 1rem 2rem;
		text-align: center;
	}
`;

const Alert = ({ type, message, alertState, setAlertState }) => {
	useEffect(() => {
		let time;

		if (alertState === true) {
			time = setTimeout(() => {
				setAlertState(false);
			}, 4000);
		}

		return () => clearTimeout(time);
	}, [alertState, setAlertState]);

	return (
		<>
			{alertState && (
				<AlertContainer type={type}>
					<p>{message}</p>
				</AlertContainer>
			)}
		</>
	);
};

export default Alert;
