import { setTipoAnexo } from '../../../appRedux/actions/menu/anexos';
import store from '../../../appRedux/store';
import { httpClient } from '../../../util/Api';
import { setLogosImpresion, setThemeDesignLook } from '../../../appRedux/actions';

// TRAER TIPO DE ANEXO (FIRESTORE O LOCAL)
export const tipoAnexo = async () => {
	const respuesta = await httpClient.post('/tipoAnexos');
	if (respuesta.data.success) {
		if (respuesta.data.data[0].llave_tab_gral === 'S') {
			store.dispatch(setTipoAnexo('S'));
		}
	}
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
