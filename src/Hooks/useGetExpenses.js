import { useEffect, useState } from 'react';
import { db } from './../DataBase/FirebaseConfig';
import { useAuth } from './../Context/AuthContext';
import getUnixTime from 'date-fns/getUnixTime';
import endOfMonth from 'date-fns/endOfMonth';

const useGetExpenses = () => {
	const [expenses, setExpenses] = useState([]);
	const [lastExpense, setLastExpense] = useState(null);
	const [moreToLoad, setMoreToLoad] = useState(false);

	const { user } = useAuth();

	const getMoreExpenses = () => {
		db.collection('expenses')
			.where('uid', '==', user.uid)
			.orderBy('date', 'desc')
			.limit(10)
			.startAfter(lastExpense)
			.onSnapshot((snapshot) => {
				if (snapshot.docs.length > 0) {
					setLastExpense(snapshot.docs[snapshot.docs.length - 1]);
					setMoreToLoad(true);

					setExpenses(
						expenses.concat(
							snapshot.docs.map((expense) => {
								return { ...expense.data(), id: expense.id };
							})
						)
					);
				} else {
					setMoreToLoad(false);
				}
			});
	};

	useEffect(() => {
		const monthEnd = getUnixTime(endOfMonth(new Date()));

		const unsubscribe = db
			.collection('expenses')
			.where('uid', '==', user.uid)
			.where('date', '<=', monthEnd)
			.orderBy('date', 'desc')
			.limit(10)
			.onSnapshot((snapshot) => {
				if (snapshot.docs.length > 0) {
					setLastExpense(snapshot.docs[snapshot.docs.length - 1]);
					setMoreToLoad(true);
				}

				setExpenses(
					snapshot.docs.map((expense) => {
						return { ...expense.data(), id: expense.id };
					})
				);
			});

		return unsubscribe;
	}, [user]);

	return [expenses, getMoreExpenses, moreToLoad];
};

export default useGetExpenses;
