import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Fretboard from './fretboard/Fretboard';
import Tab from './tabs/Tab';
import './tabMaker.scss';
import Controller from './controller/Controller';

const TabMaker = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const keyDownHandler = (e) => {
			if (document.body !== e.target || e.repeat) return;
			e.preventDefault();
			switch (e.key.toUpperCase()) {
				case 'ARROWLEFT':
				case 'A': {
					if (e.shiftKey) dispatch({ type: 'tabMaker/transposeNotes', payload: -1 });
					else dispatch({ type: 'tabMaker/moveSelectedColumn', payload: -1 });
					break;
				}

				case 'ARROWRIGHT':
				case 'D': {
					if (e.shiftKey) dispatch({ type: 'tabMaker/transposeNotes', payload: 1 });
					else dispatch({ type: 'tabMaker/moveSelectedColumn', payload: 1 });
					break;
				}

				case 'ARROWUP':
				case 'W': {
					if (e.shiftKey) dispatch({ type: 'tabMaker/shiftNotes', payload: true });
					else dispatch({ type: 'tabMaker/moveSelectedColumn', payload: -1 });
					break;
				}

				case 'ARROWDOWN':
				case 'S': {
					if (e.shiftKey) dispatch({ type: 'tabMaker/shiftNotes', payload: false });
					else dispatch({ type: 'tabMaker/moveSelectedColumn', payload: 1 });
					break;
				}

				case 'SHIFT': {
					dispatch({ type: 'tabMaker/setHoldingShift', payload: true });
					break;
				}

				case ' ': {
					dispatch({ type: 'tabMaker/addSpaceColumn' });
					break;
				}

				case 'ENTER': {
					dispatch({ type: 'tabMaker/newLineBreak' });
					break;
				}

				case 'Z': {
					if (e.ctrlKey) dispatch({ type: 'tabMaker/undoToHistory' });
					break;
				}

				case 'C': {
					if (e.ctrlKey) dispatch({ type: 'tabMaker/copyColumn' });
					break;
				}

				case 'V': {
					if (e.ctrlKey) dispatch({ type: 'tabMaker/pasteCopiedColumn' });
					break;
				}

				default:
					break;
			}
		};

		const keyUpHandler = (e) => {
			if (document.body !== e.target || e.repeat) return;
			e.preventDefault();
			switch (e.keyCode) {
				case 16: {
					dispatch({ type: 'tabMaker/setHoldingShift', payload: false });
					break;
				}

				default:
					return;
			}
		};

		window.addEventListener('keydown', keyDownHandler, false);
		window.addEventListener('keyup', keyUpHandler, false);
		return () => {
			document.removeEventListener('keydown', keyDownHandler);
			document.removeEventListener('keyup', keyUpHandler);
		};
	}, [dispatch]);

	return (
		<div className='tab-maker'>
			<div className='tab-wrapper'>
				<Controller />
				<Tab />
			</div>
			<Fretboard />
		</div>
	);
};

export default TabMaker;
