import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducer';

function logger({ dispatch, getState }) {
	return (next) => (action) => {
		//console.log('-------------------');
		//console.log('state before dispatch', getState());
		//console.log('will dispatch', action);

		const returnValue = next(action);

		// console.log('state after dispatch', getState());

		return returnValue;
	};
}

const middlewareEnhancer = applyMiddleware(logger);
const store = createStore(rootReducer, middlewareEnhancer);

export default store;
