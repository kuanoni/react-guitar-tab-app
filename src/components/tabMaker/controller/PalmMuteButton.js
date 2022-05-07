import { modifiers } from '../../../GUITAR';
import ModifierButton from './ModifierButton';

const PalmMuteButton = () => {
	return <ModifierButton icon={'PM'} buttonName={'Palm Mute'} modifier={modifiers.palmMute} />;
};

export default PalmMuteButton;
