import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import Settings from './Settings';
import Common from './Common';
import Menu from './Menu';
import { anexoReducer } from './menu/anexos';
import { pestañasReducer } from './menu/pestañas';
import { opacityReducer } from './Opacity';
import { sugerenciaReducer } from './menu/sugerencias';
import { dataGlobalReducer } from './dataGlobal';
import { HelpersReducer } from './menu/helpers';
import UiReducer from './ui';
const createRootReducer = history =>
	combineReducers({
		router: connectRouter(history),
		settings: Settings,
		common: Common,
		menu: Menu,
		anexo: anexoReducer,

		//--------
		pestañasReducer: pestañasReducer,
		opacity: opacityReducer,

		sugerenciaReducer: sugerenciaReducer,

		dataGlobal: dataGlobalReducer,
		helpers: HelpersReducer,
		//
		ui: UiReducer,
	});

export default createRootReducer;
