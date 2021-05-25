import React from 'react';
import styled from 'styled-components';

const Background = () => {
	return (
		<Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 720">
			<path
				fill="#200950"
				fillOpacity="1"
				d="M0 729V216C93 136 300.444 -35.2014 450.765 7.71785C638.667 61.367 720.093 591.376 1166.39 524.339C1616.16 456.78 1800.06 338.885 1920 266.028V729H0Z"
			></path>
		</Svg>
	);
};

const Svg = styled.svg`
	bottom: 0;
	position: fixed;
	width: 100%;
	z-index: 0;
`;

export default Background;
