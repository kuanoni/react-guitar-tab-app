import { modifiers } from '../../GUITAR';
import ModifierButton from './ModifierButton';

const VibratoButton = () => {

	return (
		<ModifierButton icon={'~'} buttonName={'Vibrato'} modifier={modifiers.vibrato} />
	);
};

export default VibratoButton;
