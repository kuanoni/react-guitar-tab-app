import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Fretboard from './fretboard/Fretboard';
import Tab from './tabs/Tab';
import './tabMaker.scss'

const typingSelector = state => state.tabMaker.typing;

const TabMaker = () => {
	const dispatch = useDispatch();
    const typing = useSelector(typingSelector);

	const keyUpHandler = (e) => {
        console.log(typing)
        if (typing) return;
		e.preventDefault();
		switch (e.keyCode) {
			case 39: {
				// ArrowRight
				dispatch({ type: 'tabMaker/moveSelectedColumn', payload: 1 });
				break;
			}

			case 37: {
				// ArrowLeft
				dispatch({ type: 'tabMaker/moveSelectedColumn', payload: -1 });
				break;
			}

			case 68: {
				// D
				dispatch({ type: 'tabMaker/moveSelectedColumn', payload: 1 });
				break;
			}

			case 65: {
				// A
				dispatch({ type: 'tabMaker/moveSelectedColumn', payload: -1 });
				break;
			}

			case 32: {
				// Space
				dispatch({ type: 'tabMaker/addSpaceColumn' });
				break;
			}

			case 13: {
				// Enter
				dispatch({ type: 'tabMaker/newLineBreak' });
				break;
			}

			case 90: {
				if (e.ctrlKey)
					dispatch({ type: 'tabMaker/undoToHistory' });
				break;
			}

			case 16: {
				dispatch({ type: 'tabMaker/setHoldingShift', payload: false });
				break;
			}

            case 67: {
                if (e.ctrlKey)
                    dispatch({ type: 'tabMaker/copyColumn' })
                break;
            }

            case 86: {
                if (e.ctrlKey)
                    dispatch({ type: 'tabMaker/pasteCopiedColumn' })
                break;
            }

			default:
				return;
		}
	};

	const keyDownHandler = (e) => {
        if (typing) return;
		e.preventDefault();
		switch (e.keyCode) {
			case 16: {
				dispatch({ type: 'tabMaker/setHoldingShift', payload: true });
				break;
			}

			default:
				return;
		}
	};

	// useEffect(() => {
	// 	window.addEventListener('keyup', keyUpHandler, false);
	// 	window.addEventListener('keydown', keyDownHandler, false);
	// 	return () => {
	// 		document.removeEventListener('keyup', keyUpHandler);
	// 		document.removeEventListener('keydown', keyDownHandler);
	// 	};
	// });

	return (
		<div className='tab-maker'>
			<Tab />
			<Fretboard />
		</div>
	);
};

export default TabMaker;
