import { useDispatch } from 'react-redux';
import { RiCodeSFill } from "react-icons/ri";

const AddNaturalHarmonicButton = (props) => {
	const dispatch = useDispatch();

	const onClick = () => {
		dispatch({
			type: 'tabMaker/wrapNote',
			payload: { left: '<', right: '>' },
		});
	};

	return <div className='control-button' onClick={onClick}><RiCodeSFill /></div>;
};

export default AddNaturalHarmonicButton;
