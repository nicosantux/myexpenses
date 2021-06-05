import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faHome,
	faPizzaSlice,
	faPhone,
	faCouch,
	faStore,
	faHeartbeat,
	faEnvelopeOpenText,
	faGraduationCap,
	faTshirt,
	faLaptop,
	faSubway,
	faUmbrellaBeach,
} from '@fortawesome/free-solid-svg-icons';

const CategoriesIcon = ({ category }) => {
	switch (category) {
		case 'Home':
			return <FontAwesome icon={faHome} />;
		case 'Food':
			return <FontAwesome icon={faPizzaSlice} />;
		case 'Phone':
			return <FontAwesome icon={faPhone} />;
		case 'Leisure':
			return <FontAwesome icon={faCouch} />;
		case 'Market':
			return <FontAwesome icon={faStore} />;
		case 'Health and care':
			return <FontAwesome icon={faHeartbeat} />;
		case 'Services':
			return <FontAwesome icon={faEnvelopeOpenText} />;
		case 'Education':
			return <FontAwesome icon={faGraduationCap} />;
		case 'Clothes':
			return <FontAwesome icon={faTshirt} />;
		case 'Technology':
			return <FontAwesome icon={faLaptop} />;
		case 'Travel':
			return <FontAwesome icon={faSubway} />;
		case 'Holidays':
			return <FontAwesome icon={faUmbrellaBeach} />;
		default:
			break;
	}
};

export default CategoriesIcon;

const FontAwesome = styled(FontAwesomeIcon)`
	margin-right: 1rem;
`;
