import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
	setLoginReportsLoading,
} from '../../../appRedux/actions/Setting';
import { httpClient } from '../../../util/Api';

export const useProvideAuth = () => {
	const [authReports, setAuthReports] = useState(null);
	const [errorReports, setErrorReports] = useState('');
	const [loadingReports, setLoadingReports] = useState(false);
	const dispatch = useDispatch();

	const fetchStartReports = () => {
    setErrorReports(null);
		setLoadingReports(true);
	};

	const fetchSuccessReports = () => {
    setErrorReports(null);
		setLoadingReports(false);
	};

	const fetchErrorReports = error => {
		setLoadingReports(false);
		setErrorReports(error);
	};

	const reportsLogin = (user, callbackFun) => {
		dispatch(setLoginReportsLoading(true));
		fetchStartReports();
		httpClient
			.post(`/loginUsuLocal`, user)
			.then(({ data }) => {
				if (data.success) {
					fetchSuccessReports();
					data.modulos.sort();
					localStorage.setItem('token-reports', JSON.stringify(data));
					getAuthReports(data);
					if (callbackFun) callbackFun();
				} else {
					fetchErrorReports(data.message);
				}
			})
			.catch(function (error) {
				fetchErrorReports(error.message);
			});
		dispatch(setLoginReportsLoading(false));
	};

	const reportsSignOut = callbackFun => {
		fetchStartReports();
		fetchSuccessReports();
		localStorage.removeItem('token-reports');
		setAuthReports(null);
	};

	const renderSocialMediaLogin = () => null;

	const getAuthReports = data => {
		fetchStartReports();
		fetchSuccessReports();
		setAuthReports(data);
	};

	useEffect(() => {
		const tokenReports = localStorage.getItem('token-reports');
		setAuthReports(JSON.parse(tokenReports));
		setLoadingReports(false);
	}, []);

	// Return the user object and auth methods
	return {
		renderSocialMediaLogin,
		getAuthReports,
		reportsLogin,
		reportsSignOut,
		loadingReports,
		errorReports,
		authReports,
	};
};
