import { useState, useEffect } from 'react';
import { db } from './../DataBase/FirebaseConfig';
import { useHistory } from 'react-router-dom';

const useGetExpenseById = (id) => {
	const [expense, setExpense] = useState('');

	const history = useHistory();

	useEffect(() => {
		db.collection('expenses')
			.doc(id)
			.get()
			.then((doc) => {
				if (doc.exists) {
					setExpense(doc.data());
				} else {
					history.push('/');
				}
			});

		return () => setExpense('');
	}, [history, id]);

	return [expense];
};

export default useGetExpenseById;
