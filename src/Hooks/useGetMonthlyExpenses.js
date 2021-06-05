import { useEffect, useState } from 'react';
import { db } from './../DataBase/FirebaseConfig';
import { useAuth } from './../Context/AuthContext';
import getUnixTime from 'date-fns/getUnixTime';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';

const useGetMonthlyExpenses = () => {
	const [monthlyExpenses, setMonthlyExpenses] = useState([]);

	const monthStart = getUnixTime(startOfMonth(new Date()));
	const monthEnd = getUnixTime(endOfMonth(new Date()));

	const { user } = useAuth();

	useEffect(() => {
		const unsubscribe = db
			.collection('expenses')
			.where('uid', '==', user.uid)
			.where('date', '>=', monthStart)
			.where('date', '<=', monthEnd)
			.orderBy('date', 'desc')
			.onSnapshot((snapshot) => {
				setMonthlyExpenses(
					snapshot.docs.map((expense) => {
						return { ...expense.data(), id: expense.id };
					})
				);
			});

		return unsubscribe;
	}, [user, monthStart, monthEnd]);

	return [monthlyExpenses];
};

export default useGetMonthlyExpenses;
