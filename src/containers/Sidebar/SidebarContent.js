import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

import CustomScrollbars from 'util/CustomScrollbars';
import SidebarLogo from './SidebarLogo';
import UserProfile from './UserProfile';
import {
	NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
	NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
	THEME_TYPE_LITE,
} from '../../constants/ThemeSetting';
import { useSelector } from 'react-redux';
import './styles.css';
import {
  TbReportAnalytics
} from 'react-icons/all';

const SidebarContent = ({ sidebarCollapsed, setSidebarCollapsed }) => {
	const { navStyle, themeType, themeSettingsGlobal } = useSelector(({ settings }) => settings);
	const pathname = useSelector(({ common }) => common.pathname);
	const tokenReports = JSON.parse(localStorage.getItem('token-reports'));
	const initURL = useSelector(({ settings }) => settings.initURL);

	const getNoHeaderClass = navStyle => {
		if (
			navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR ||
			navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR
		) {
			return 'gx-no-header-notifications';
		}
		return '';
	};

	const selectedKeys = pathname.substr(1);
	const defaultOpenKeys = selectedKeys.split('/')[1];

	const createMenuItem = () => {
		const menuItems = [];

		if (tokenReports && initURL.includes('/reportes')) {
			menuItems.push(
				<>
          {tokenReports.modulos.some(x => x === 'Reporte_1' ) && (
            <Menu.Item key="reportes/reporte1">
              <Link to="/reportes/reporte1">
                <i className="icon">
                  <TbReportAnalytics />
                </i>
                <span>Análisis de Órdenes y Pacientes vs Concluidos</span>
              </Link>
            </Menu.Item>
          )}
          {tokenReports.modulos.some(x => x === 'Reporte_2' ) && (
            <Menu.Item key="reportes/reporte2">
              <Link to="/reportes/reporte2">
                <i className="icon">
                  <TbReportAnalytics />
                </i>
                <span>Análisis de Venta por Mes</span>
              </Link>
            </Menu.Item>
          )}
          {tokenReports.modulos.some(x => x === 'Reporte_3' ) && (
            <Menu.Item key="reportes/reporte3">
              <Link to="/reportes/reporte3">
                <i className="icon">
                  <TbReportAnalytics />
                </i>
                <span>Exámenes mas Rotados</span>
              </Link>
            </Menu.Item>
          )}
          {tokenReports.modulos.some(x => x === 'Reporte_4' ) && (
            <Menu.Item key="reportes/reporte4">
              <Link to="/reportes/reporte4">
                <i className="icon">
                  <TbReportAnalytics />
                </i>
                <span>Atención de especialidades por mes</span>
              </Link>
            </Menu.Item>
          )}
				</>
			);
		}

		return menuItems;
	};

	const menuItems = createMenuItem();

	return (
		<>
			<SidebarLogo sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed} />
			<div className="gx-sidebar-content">
				<div className={`gx-sidebar-notifications ${getNoHeaderClass(navStyle)}`}>
					<UserProfile />
					{/* <AppsNavigation /> */}
				</div>
				<CustomScrollbars
					className={`gx-layout-sider-scrollbar`}
					style={{ backgroundColor: themeSettingsGlobal.COD_COLOR_1 }}
				>
					<Menu
						defaultOpenKeys={[defaultOpenKeys]}
						selectedKeys={[selectedKeys]}
						style={{ backgroundColor: themeSettingsGlobal.COD_COLOR_1 }}
						theme={themeType === THEME_TYPE_LITE ? 'lite' : 'dark'}
						mode="inline"
					>
						{menuItems.map(item => item)}
					</Menu>
				</CustomScrollbars>
			</div>
		</>
	);
};

export default React.memo(SidebarContent);
