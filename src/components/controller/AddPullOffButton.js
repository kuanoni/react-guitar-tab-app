import { useDispatch } from 'react-redux';

const AddPullOffButton = (props) => {
	const dispatch = useDispatch();

	const onClick = () => {
		dispatch({
			type: 'tabMaker/addLetterToNote',
			payload: 'p',
		});
	};

	return <div onClick={onClick}>p</div>;
};

export default AddPullOffButton;
