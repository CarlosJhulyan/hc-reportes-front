import { setAnexosAction, setTipoAnexo } from '../../../appRedux/actions/menu/anexos';
import { setLaboratorioAction } from '../../../appRedux/actions/menu/laboratorio';
import {
	setTratamiento,
} from '../../../appRedux/actions/menu/tratamiento';

import store from '../../../appRedux/store';
import { httpClient } from '../../../util/Api';
import { setLogosImpresion, setThemeDesignLook } from '../../../appRedux/actions';

/*****************************PESTAÑA TRATAMIENTO**************************************/

export const tratamiento = dataGlobal => {
	traerFuncionesVitales(dataGlobal).then(data => {
		console.log('DATA TRATAMIENTO2323223: ', data[0].VALIDEZ_RECETA);
		const proc = store.getState();
		proc.tratamiento.validezreceta = data[0].VALIDEZ_RECETA === null ? '' : data[0].VALIDEZ_RECETA;
		store.dispatch(setTratamiento({ ...proc.tratamiento }));
	});

	//Traer OBS tratamiento
	traerObsT(dataGlobal).then(obs => {
		console.log('OBS Tratamiento: ', obs);
		const proc = store.getState();
		proc.tratamiento.indicacionesgen = obs === 'N' ? '' : obs;
		store.dispatch(setTratamiento({ ...proc.tratamiento }));
	});

	/* traerObsT(dataGlobal).then(obs => {
		console.log('OBS Tratamiento: ', obs);
		dataTratamiento.indicacionesgen = obs === 'N' ? '' : obs;
		store.dispatch(setTratamiento(dataTratamiento));
	}); */
};

/***************************** PESTAÑA LABORATORIO  **************************************/
export const laboratorio = dataGlobal => {
	traerListaLaboratorio(dataGlobal).then(data => {
		console.log('LISTA LABORATORIO:', data);

		const proc = store.getState();
		proc.laboratorio.dataProcedimiento = data;
		store.dispatch(setLaboratorioAction({ ...proc.laboratorio }));
	});

	//Traer OBS laboratorio
	traerObsLaboratorio(dataGlobal).then(data => {
		const proc = store.getState();
		proc.laboratorio.recomendacion = data === 'N' ? '' : data;
		store.dispatch(setLaboratorioAction({ ...proc.laboratorio }));
	});
};

// TRAER TIPO DE ANEXO (FIRESTORE O LOCAL)
export const tipoAnexo = async () => {
	const respuesta = await httpClient.post('/tipoAnexos');
	if (respuesta.data.success) {
		if (respuesta.data.data[0].llave_tab_gral === 'S') {
			store.dispatch(setTipoAnexo('S'));
		}
	}
};

const traerFuncionesVitales = async dataGlobal => {
	console.log('DATAAAAAAA FUNCION VITALES GLOBAL: ', dataGlobal);
	const resp = await httpClient.post(`/antecedentes/funcionesvitales`, {
		codGrupoCia: dataGlobal.codGrupoCia,
		codLocal: dataGlobal.codLocal,
		codCia: dataGlobal.codCia,
		nroAtencion: dataGlobal.nroAtencion,
	});
	console.log('abc123', resp.data.data);
	return resp.data.data;
};

const traerListaLaboratorio = async dataGlobal => {
	const resp = await httpClient.post(`/tabla/laboratorio`, {
		codGrupoCia: dataGlobal.codGrupoCia,
		codLocal: dataGlobal.codLocal,
		numAtendMed: dataGlobal.nroAtencion,
	});
	return resp.data.data;
};

const traerObsT = async dataGlobal => {
	const resp = await httpClient.post(`/obs/tratamiento`, {
		codGrupoCia: dataGlobal.codGrupoCia,
		codLocal: dataGlobal.codLocal,
		numAtendMed: dataGlobal.nroAtencion,
	});

	return resp.data.data;
};

const traerObsLaboratorio = async dataGlobal => {
	const resp = await httpClient.post(`/obs/laboratorio`, {
		codGrupoCia: dataGlobal.codGrupoCia,
		codLocal: dataGlobal.codLocal,
		numAtendMed: dataGlobal.nroAtencion,
	});

	return resp.data.data;
};

export const getThemeDesignLookGlobal = async () => {
  try {
    const {
      data: { data, success, message }
    } = await httpClient.get('/sistema/getThemeDesign');
    if (success) {
      store.dispatch(setThemeDesignLook(data));
    } else console.log('GET_THEME_DESIGN_GLOBAL', message);
  } catch (e) {
    console.error('GET_THEME_DESIGN_GLOBAL', e);
  }
}

export const getLogosImpresionGlobal = async () => {
  try {
    const {
      data: { data, success, message }
    } = await httpClient.post('/sistema/getLogosImpresion', {
      codGrupoCia: '001',
      codLocal: '001'
    });
    if (success) {
      store.dispatch(setLogosImpresion(data));
    } else console.log('LOGOS_IMPRESION', message);
  } catch (e) {
    console.error('LOGOS_IMPRESION', e);
  }
}
