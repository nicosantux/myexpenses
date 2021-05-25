import React, { useContext, useState } from 'react';

const AlertContext = React.createContext();

const useAlert = () => {
	return useContext(AlertContext);
};

const AlertProvider = ({ children }) => {
	const [alert, setAlert] = useState({ type: '', message: '', active: false });

	return (
		<AlertContext.Provider value={{ alert: alert, setAlert: setAlert }}>{children}</AlertContext.Provider>
	);
};

export { AlertProvider, AlertContext, useAlert };
