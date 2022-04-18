import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducer';

function logger({ dispatch, getState }) {
	return (next) => (action) => {
		if (action.type !== 'tabMaker/addToHistory') {
			console.log('state before dispatch', getState());
			console.log('will dispatch', action);

			// dispatch({ type: 'tabMaker/addToHistory', payload: getState().tabMaker.tablature });

			const returnValue = next(action);

			console.log('state after dispatch', getState());

			return returnValue;
		} else {
			const returnValue = next(action);
			return returnValue;
		}
	};
}

const middlewareEnhancer = applyMiddleware(logger);
const store = createStore(rootReducer, middlewareEnhancer);

export default store;
