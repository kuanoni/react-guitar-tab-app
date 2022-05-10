import { useDispatch, useSelector } from 'react-redux';

const automoveSelector = (state) => state.tabMaker.automove;

const AutomoveToggle = () => {
	const dispatch = useDispatch();
	const automove = useSelector(automoveSelector);

	const onChange = () => {
		console.log(automove);
		dispatch({ type: 'tabMaker/toggleAutomove' });
	};

	return (
		<>
			<label htmlFor='automove'>Auto-spaces: </label>
			<input className='checkbox' type='checkbox' name='automove' onChange={onChange} defaultChecked={automove} />
		</>
	);
};

export default AutomoveToggle;
