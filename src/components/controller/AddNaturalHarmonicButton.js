import { useDispatch } from 'react-redux';

const AddNaturalHarmonicButton = (props) => {
	const dispatch = useDispatch();

	const onClick = () => {
		dispatch({
			type: 'tabMaker/wrapNote',
			payload: { left: '<', right: '>' },
		});
	};

	return <div className='control-button' onClick={onClick}>{'<>'}</div>;
};

export default AddNaturalHarmonicButton;
