import tabMakerReducer from './tabMakerReducer/TabMakerSlice';

export default function rootReducer(state = {}, action) {
	return {
		tabMaker: tabMakerReducer(state.tabMaker, action),
	};
}
