import React, { useContext, useState, useEffect } from 'react';
import { auth } from './../DataBase/FirebaseConfig';

const AuthContext = React.createContext();

const useAuth = () => {
	return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsuscribe = auth.onAuthStateChanged((user) => {
			setUser(user);
			setLoading(false);
		});

		return unsuscribe;
	}, []);

	return <AuthContext.Provider value={{ user: user }}>{!loading && children}</AuthContext.Provider>;
};

export { AuthProvider, AuthContext, useAuth };
