import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ControlButton from './ControlButton';

const currentModifierSelector = state => state.tabMaker.currentModifier;

const ModifierButton = (props) => {
    const currentModifier = useSelector(currentModifierSelector);
	const [toggled, setToggled] = useState(false);
	const dispatch = useDispatch();

	const onClick = () => {
        if (currentModifier !== props.modifier) {
            if (Object.keys(currentModifier).length === 0 && currentModifier.constructor === Object) {
                dispatch({
                    type: 'tabMaker/startModifier',
                    payload: props.modifier,
                });
            } else {
                return;
            }
        } else {
            dispatch({
                type: 'tabMaker/endModifier',
            });
        }
	};

    useEffect(() => {
        if (currentModifier === props.modifier) {
            setToggled(true);
        } else {
            setToggled(false);
        }
    }, [currentModifier])

	return (
		<ControlButton className={toggled && 'toggled'} click={onClick} buttonName={props.buttonName}>
			{props.icon}
		</ControlButton>
	);
};

export default ModifierButton;
