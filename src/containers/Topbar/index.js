import React, { useState } from 'react';
import { Button, Col, Layout, Row } from 'antd';
import { Link } from 'react-router-dom';
import { toggleCollapsedSideNav } from '../../appRedux/actions';

import {
	NAV_STYLE_DRAWER,
	NAV_STYLE_FIXED,
	NAV_STYLE_MINI_SIDEBAR,
	TAB_SIZE,
} from '../../constants/ThemeSetting';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useAuth } from '../../authentication';

const { Header } = Layout;

const Topbar = () => {
	const { navStyle } = useSelector(({ settings }) => settings);
	const navCollapsed = useSelector(({ common }) => common.navCollapsed);
	const width = useSelector(({ common }) => common.width);
	const dispatch = useDispatch();
	const initURL = useSelector(({ settings }) => settings.initURL);

	const { reportsSignOut } = useAuth();

	const history = useHistory();

	const onLogoutReports = () => {
		reportsSignOut(() => {
			history.push('/reportes');
		});
	};

	return (
		<>
			<Header style={{background: '#afafaf'}}>
				{navStyle === NAV_STYLE_DRAWER ||
				((navStyle === NAV_STYLE_FIXED || navStyle === NAV_STYLE_MINI_SIDEBAR) &&
					width < TAB_SIZE) ? (
					<div className="gx-linebar gx-mr-3">
						<i
							className="gx-icon-btn icon icon-menu"
							onClick={() => {
								dispatch(toggleCollapsedSideNav(!navCollapsed));
							}}
						/>
					</div>
				) : null}
				<Link to="/" className="gx-d-block gx-d-lg-none gx-pointer">
					<img alt="" src={'/assets/images/w-logo.png'} />
				</Link>
				<div>
					{initURL.includes('/reportes') && (
						<Button
              onClick={() => onLogoutReports()}
              style={{
                marginTop: 12,
                background: '#878787',
                color: '#ccc',
                border: 'none'
              }}
            >
							Cerrar Sesión Reportes
						</Button>
					)}
				</div>
			</Header>
		</>
	);
};

export default Topbar;
