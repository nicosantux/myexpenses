import React from 'react';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import LoginScreen from '../Components/LoginScreen';
import RegisterScreen from '../Components/RegisterScreen';
import AddExpense from '../Components/AddExpense';
import Categories from '../Components/Categories';
import ExpensesList from '../Components/ExpensesList';
import ForgotPassword from '../Components/ForgotPassword';
import VerifyEmail from './../Components/VerifyEmail';
import ResetPassword from '../Components/ResetPassword';
import EditExpense from './../Components/EditExpense';
import { useAuth } from './../Context/AuthContext';

const AppRouter = () => {
	let routes;

	const { user } = useAuth();

	if (user && user.emailVerified) {
		routes = (
			<>
				<Route exact path="/add-expense" component={AddExpense} />
				<Route exact path="/categories" component={Categories} />
				<Route exact path="/reset-password" component={ResetPassword} />
				<Route exact path="/edit-expense/:id" component={EditExpense} />
				<Route exact path="/" component={ExpensesList} />
				<Redirect to="/" />
			</>
		);
	} else if (user && !user.emailVerified) {
		routes = (
			<>
				<Route exact path="/login" component={LoginScreen} />
				<Route exact path="/register" component={RegisterScreen} />
				<Route exact path="/verify-email" component={VerifyEmail} />
				<Redirect to="/verify-email" />
			</>
		);
	} else {
		routes = (
			<>
				<Route exact path="/login" component={LoginScreen} />
				<Route exact path="/register" component={RegisterScreen} />
				<Route exact path="/password-recovery" component={ForgotPassword} />
				<Redirect to="/login" />
			</>
		);
	}

	return (
		<Router>
			<Switch>{routes}</Switch>
		</Router>
	);
};

export default AppRouter;
