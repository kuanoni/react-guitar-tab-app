import { useDispatch } from 'react-redux';
import { RiCodeSFill } from 'react-icons/ri';
import ControlButton from './ControlButton';

const AddNaturalHarmonicButton = (props) => {
	const dispatch = useDispatch();

	const onClick = () => {
		dispatch({
			type: 'tabMaker/wrapNote',
			payload: { left: '<', right: '>' },
		});
	};

	return (
		<ControlButton click={onClick} buttonName={'Natural Harmonic'}>
			<RiCodeSFill />
		</ControlButton>
	);
};

export default AddNaturalHarmonicButton;
