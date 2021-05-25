import { db } from './../DataBase/FirebaseConfig';
import getUnixTime from 'date-fns/getUnixTime';
import subMonths from 'date-fns/subMonths';
import addMonths from 'date-fns/addMonths';

const addExpense = (expense) => {
	const { description, category, date, uid } = expense;
	const amount = Number(parseFloat(expense.amount).toFixed(2));
	const installments = Number(expense.installments);

	if (installments !== 0) {
		const amountToAdd = Number(parseFloat((amount / installments).toFixed(2)));

		const firstInstallment = {
			description: description,
			category: category,
			totalAmount: amount,
			amount: amountToAdd,
			installments: installments,
			currentInstallment: 1,
			installmentsDescription: `1 of ${installments}`,
			idRef: '-',
			date: getUnixTime(date),
			uid: uid,
		};
		db.collection('expenses')
			.add(firstInstallment)
			.then((docRef) => {
				db.collection('expenses')
					.doc(docRef.id)
					.set({
						...firstInstallment,
						idRef: docRef.id,
					});
				for (let i = 1; i < installments; i++) {
					const restInstallments = {
						...firstInstallment,
						currentInstallment: Number(`${i + 1}`),
						installmentsDescription: `${i + 1} of ${installments}`,
						date: getUnixTime(addMonths(date, i)),
						idRef: docRef.id,
					};
					db.collection('expenses').add(restInstallments);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}
};

const editExpense = (newExpense, prevExpense) => {
	const { description, category, date } = newExpense;
	const totalAmount = Number(parseFloat(newExpense.amount).toFixed(2));
	const installments = Number(newExpense.installments);

	const dateToUpadte = subMonths(date, prevExpense.currentInstallment - 1);

	const amount = Number(parseFloat(totalAmount / installments).toFixed(2));

	db.collection('expenses')
		.where('uid', '==', prevExpense.uid)
		.where('idRef', '==', prevExpense.idRef)
		.orderBy('date', 'asc')
		.get()
		.then((doc) => {
			let i = 0;
			doc.forEach((expense) => {
				const editedExpense = {
					...expense.data(),
					category: category,
					description: description,
					totalAmount: totalAmount,
					amount: amount,
					date: getUnixTime(addMonths(dateToUpadte, i)),
				};

				db.collection('expenses')
					.doc(expense.id)
					.update(editedExpense)
					.catch((error) => {
						console.log(error);
					});

				i++;
			});
		});
};

const deleteExpense = (expense) => {
	db.collection('expenses')
		.where('uid', '==', expense.uid)
		.where('idRef', '==', expense.idRef)
		.orderBy('date', 'asc')
		.get()
		.then((doc) => {
			doc.forEach((expense) => {
				db.collection('expenses').doc(expense.id).delete();
			});
		});
};

export { addExpense, editExpense, deleteExpense };
