import React, { useState, useContext } from 'react';

const FormCompleteContext = React.createContext();

const useFormComplete = () => {
	return useContext(FormCompleteContext);
};

const FormCompleteProvider = ({ children }) => {
	const [formComplete, setFormComplete] = useState(false);

	return (
		<FormCompleteContext.Provider value={{ formComplete, setFormComplete }}>
			{children}
		</FormCompleteContext.Provider>
	);
};

export { FormCompleteProvider, FormCompleteContext, useFormComplete };
