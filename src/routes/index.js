import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Reporte1 from './reportes/reporte1';
import Reporte2 from './reportes/reporte2';
import Reporte3 from './reportes/reporte3';
import Reporte4 from './reportes/reporte4';
import ReporteAgrupadoPorLaboratorio from './reportes/agrupado-por-laboratorio';
import { Modal } from 'antd';
import { tablasPrincipales } from '../constants/TablasPrincipales';
import { httpClientReports } from '../util/Api';

const App = ({ match }) => {
	const tokenReports = JSON.parse(localStorage.getItem('token-reports'));
	const [modal, contextHolder] = Modal.useModal();
	const [dataPrincial, setDataPrincial] = useState(false);

	const traerDataPrincial = async () => {
		const response = await httpClientReports.post('reportes/getTablasPrimarias');
		if (response && response.data && response.data.data) {
			response.data.data.forEach(element => {
				element.forEach(elemento => {
					elemento.key = elemento.cod_esp || elemento.cod_mes || elemento.cod_tipo;
				});
			});
		}
		tablasPrincipales.TablasPrincipales = response.data.data;
		setDataPrincial(true);
	};

	const generateRoute = () => {
		const items = [];
		if (tokenReports && dataPrincial) {
      if (tokenReports.modulos.some(x => x === 'Reporte_1' ))
			  items.push(<Route key={1} path={`${match.url}reportes/reporte1`} component={Reporte1} />);
      if (tokenReports.modulos.some(x => x === 'Reporte_2' ))
			  items.push(<Route key={2} path={`${match.url}reportes/reporte2`} component={Reporte2} />);
      if (tokenReports.modulos.some(x => x === 'Reporte_3' ))
			  items.push(<Route key={3} path={`${match.url}reportes/reporte3`} component={Reporte3} />);
      if (tokenReports.modulos.some(x => x === 'Reporte_4' ))
			  items.push(<Route key={4} path={`${match.url}reportes/reporte4`} component={Reporte4} />);
      if (tokenReports.modulos.some(x => x === 'Reporte_agrupado_laboratorio' ))
        items.push(<Route key={4} path={`${match.url}reportes/agrupado-por-laboratorio`} component={ReporteAgrupadoPorLaboratorio} />);
		}

		return items;
	};

	useEffect(() => {
		traerDataPrincial();
	}, []);

	const rutas = generateRoute();

	return (
		<div className={`gx-main-content-wrapper`}>
			<Switch>
				{/* ---------------- DAVID ------------------- */}
				{rutas.map(item => item)}
				{contextHolder}
			</Switch>
		</div>
	);
};

export default App;
