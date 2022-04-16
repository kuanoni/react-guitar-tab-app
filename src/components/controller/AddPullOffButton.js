import { useDispatch } from 'react-redux';

const AddPullOffButton = (props) => {
	const dispatch = useDispatch();

	const onClick = () => {
		dispatch({
			type: 'tabMaker/snapStringNoteToPrevious',
			payload: { guitarString: props.guitarString, note: 'p', spaces: 1 },
		});
	};

	return <div onClick={onClick}>p</div>;
};

export default AddPullOffButton;
