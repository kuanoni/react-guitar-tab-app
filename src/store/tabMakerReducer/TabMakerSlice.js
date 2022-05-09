import { EMPTY_COLUMN, EMPTY_MODIFIER, EMPTY_NOTE_CHAR, LINE_BREAK_COLUMN } from '../../GUITAR';

import {
	saveChangesToHistory,
	insertColumnAfter,
	addColumnsIfNecessary,
	setColumnNote,
	setColumnAllNotes,
	findClosestLineBreaks,
	replaceColumnInTablature,
	findModifierStartAndEnd,
	objectsEqual,
} from './TabMakerSliceUtilities';

const initialState = {
	selectedColumnIndex: 1,
	tuning: [28, 33, 38, 43, 47, 52],
	tablature: [EMPTY_COLUMN, EMPTY_COLUMN],
	history: [],
	copiedColumn: [],
	savedChords: [],
    innerSpaces: 1,
	spaces: 1,
	currentModifier: {},
	modifierStart: null,
    automove: true,
	holdingShift: false,
	holdingCtrl: false,
	audioMuted: false,
};

export default function tabMakerReducer(state = initialState, action) {
	switch (action.type) {
		case 'tabMaker/setHoldingShift':
			return { ...state, holdingShift: action.payload };

		case 'tabMaker/setHoldingCtrl':
			return { ...state, holdingCtrl: action.payload };

		case 'tabMaker/setAudioMuted':
			return { ...state, audioMuted: action.payload };

		case 'tabMaker/undoToHistory':
			return undoToHistory(state);

		case 'tabMaker/changeStringTuning':
			return changeStringTuning(state, action.payload.guitarString, action.payload.tuning);

		case 'tabMaker/changeGuitarTuning':
			return { ...state, tuning: action.payload };

		case 'tabMaker/changeSelectedColumn':
			return changeSelectedColumn(state, action.payload);

		case 'tabMaker/moveSelectedColumn':
			return saveChangesToHistory(state, moveSelectedColumn(state, action.payload));

		case 'tabMaker/clearSelectedColumn':
			return saveChangesToHistory(state, clearColumn(state));

		case 'tabMaker/deleteSelectedColumn':
			return saveChangesToHistory(state, deleteSelectedColumn(state));

		case 'tabMaker/addSpaceColumn':
			return saveChangesToHistory(state, addSpaceColumn(state));

		case 'tabMaker/changeColumnToDivider':
			return saveChangesToHistory(state, setColumnToDivider(state));

		case 'tabMaker/newLineBreak':
			return saveChangesToHistory(state, addLine(state));

		case 'tabMaker/deleteLastLineBreak':
			return saveChangesToHistory(state, deleteLine(state));

		case 'tabMaker/setStringNote':
			return saveChangesToHistory(state, setStringNote(state, action.payload.guitarString, action.payload.note));

		case 'tabMaker/addLetterToNote':
			return saveChangesToHistory(state, addSymbolToColumnNotes(state, action.payload));

		case 'tabMaker/replaceNotesInColumn':
			return saveChangesToHistory(state, replaceNotesInColumn(state, action.payload));

		case 'tabMaker/wrapNote':
			return saveChangesToHistory(state, wrapNote(state, action.payload.left, action.payload.right));

		case 'tabMaker/copyColumn':
			return copySelectedColumn(state);

		case 'tabMaker/pasteCopiedColumn':
			return saveChangesToHistory(state, pasteCopiedColumn(state));

		case 'tabMaker/saveSelectedChord':
			return saveSelectedChord(state, action.payload);

		case 'tabMaker/placeColumn':
			return saveChangesToHistory(state, placeColumn(state, action.payload));

		case 'tabMaker/startModifier':
			return saveChangesToHistory(state, startModifier(state, action.payload));

		case 'tabMaker/endModifier':
			return saveChangesToHistory(state, endModifier(state));

		case 'tabMaker/deleteModifier':
			return saveChangesToHistory(state, deleteModifier(state));

		case 'tabMaker/shiftNotes':
			return saveChangesToHistory(state, shiftNotes(state, action.payload));

		case 'tabMaker/transposeNotes':
			return saveChangesToHistory(state, transposeNotes(state, action.payload));

        case 'tabMaker/toggleAutomove':
            return { ...state, automove: !state.automove };

        case 'tabMaker/setSpaces':
            return { ...state, spaces: action.payload };

		default:
			return state;
	}
}

const deleteSelectedColumn = (state) => {
	if (state.selectedColumnIndex === 0) return state;
	let newSelectedColumnIndex = state.selectedColumnIndex;
	let newTablature = JSON.parse(JSON.stringify(state.tablature));
	newTablature.splice(state.selectedColumnIndex, 1);

	if (newSelectedColumnIndex >= newTablature.length) newSelectedColumnIndex = newTablature.length - 1;

	const updatedState = {
		...state,
		tablature: newTablature,
		selectedColumnIndex: newSelectedColumnIndex,
	};

	return updatedState;
};

const transposeNotes = (state, amount) => {
	const selectedColumnNotes = JSON.parse(JSON.stringify(state.tablature[state.selectedColumnIndex].notes));
	const newNotes = selectedColumnNotes.map((note) => {
		const noteNum = note.toString().replace(/\D/g, '');
		if (noteNum === '') return note;

		const extraChars = note.toString().split(noteNum);
		const result =
			extraChars[0] + (parseInt(noteNum) + amount < 0 ? 0 : parseInt(noteNum) + amount) + extraChars[1];

		if (parseInt(result).toString() === result) return parseInt(result);
		return result;
	});

	const newColumn = { ...state.tablature[state.selectedColumnIndex], notes: newNotes };
	const newTablature = replaceColumnInTablature(state.tablature, state.selectedColumnIndex, newColumn);

	const updatedState = {
		...state,
		tablature: newTablature,
	};

	return updatedState;
};

const shiftNotes = (state, reverse = false) => {
	let selectedColumnNotes = JSON.parse(JSON.stringify(state.tablature[state.selectedColumnIndex].notes));
	if (reverse) selectedColumnNotes.unshift(selectedColumnNotes.pop());
	else selectedColumnNotes.push(selectedColumnNotes.shift());

	const newColumn = { ...state.tablature[state.selectedColumnIndex], notes: selectedColumnNotes };
	const newTablature = replaceColumnInTablature(state.tablature, state.selectedColumnIndex, newColumn);

	const updatedState = {
		...state,
		tablature: newTablature,
	};

	return updatedState;
};

const deleteModifier = (state) => {
	if (objectsEqual(state.tablature[state.selectedColumnIndex].modifier, EMPTY_MODIFIER)) return state;
	const { modifierStart, modifierEnd } = findModifierStartAndEnd(state.tablature, state.selectedColumnIndex);
	let newTablature = state.tablature;

	for (let i = modifierStart; i <= modifierEnd; i++) {
		const newColumn = { ...newTablature[i], modifier: EMPTY_MODIFIER };
		newTablature = replaceColumnInTablature(newTablature, i, newColumn);
	}

	const updatedState = {
		...state,
		tablature: newTablature,
	};

	return updatedState;
};

const startModifier = (state, modifier) => {
	if (!objectsEqual(state.tablature[state.selectedColumnIndex].modifier, EMPTY_MODIFIER)) return state;

	const newColumn = {
		...state.tablature[state.selectedColumnIndex],
		modifier: { type: 'start', modifierStrings: modifier },
	};
	const newTablature = replaceColumnInTablature(state.tablature, state.selectedColumnIndex, newColumn);

	const updatedState = {
		...state,
		tablature: newTablature,
		currentModifier: modifier,
		modifierStart: state.selectedColumnIndex,
	};

	return updatedState;
};

const endModifier = (state) => {
	let newTablature = state.tablature;
	const { prevLineBreakIndex } = findClosestLineBreaks(newTablature, state.selectedColumnIndex);

	// remove the modifier start if ending modifier is before start, or ending is crossing a line break
	if (
		state.modifierStart > state.selectedColumnIndex ||
		(prevLineBreakIndex !== -1 && prevLineBreakIndex > state.modifierStart)
	) {
		const newColumn = { ...state.tablature[state.modifierStart], modifier: EMPTY_MODIFIER };
		newTablature = replaceColumnInTablature(newTablature, state.modifierStart, newColumn);

		return {
			...state,
			tablature: newTablature,
			currentModifier: {},
			modifierStart: null,
		};
	}

	for (let i = state.modifierStart + 1; i < state.selectedColumnIndex; i++) {
		const newColumn = {
			...state.tablature[i],
			modifier: { type: 'middle', modifierStrings: state.currentModifier },
		};
		newTablature = replaceColumnInTablature(newTablature, i, newColumn);
	}

	if (state.modifierStart === state.selectedColumnIndex) {
		newTablature = replaceColumnInTablature(newTablature, state.selectedColumnIndex, {
			...state.tablature[state.selectedColumnIndex],
			modifier: { type: 'start', modifierStrings: state.currentModifier },
		});
	} else {
		newTablature = replaceColumnInTablature(newTablature, state.selectedColumnIndex, {
			...state.tablature[state.selectedColumnIndex],
			modifier: { type: 'end', modifierStrings: state.currentModifier },
		});
	}
	const updatedState = {
		...state,
		tablature: newTablature,
		currentModifier: {},
		modifierStart: null,
	};

	return updatedState;
};

const undoToHistory = (state) => {
	const previousState = state.history.at(-1);

	if (previousState === undefined) {
		return state;
	}

	const updatedState = {
		...state,
		selectedColumnIndex: previousState.selectedColumnIndex,
		tablature: previousState.tablature,
		history: state.history.slice(0, -1),
		currentModifier: previousState.currentModifier,
		modifierStart: previousState.modifierStart,
	};

	return updatedState;
};

const changeStringTuning = (state, guitarString, tuning) => {
	let newTuning = [...state.tuning];
	newTuning[guitarString] = tuning;

	const updatedState = {
		...state,
		tuning: newTuning,
	};

	return updatedState;
};

const changeSelectedColumn = (state, columnIndex) => {
	const updatedState = {
		...state,
		selectedColumnIndex: columnIndex,
	};

	return updatedState;
};

const replaceNotesInColumn = (state, replacer) => {
	const newNotesColumn = state.tablature[state.selectedColumnIndex].notes.map((note) => {
		if (typeof note === 'number') return replacer;
		return note;
	});

	const newColumn = { ...state.tablature[state.selectedColumnIndex], notes: newNotesColumn };

	const newTablature = replaceColumnInTablature(state.tablature, state.selectedColumnIndex, newColumn);

	let updatedState = {
		...state,
		tablature: newTablature,
	};

	return updatedState;
};

const wrapNote = (state, left, right) => {
	const newNotesColumn = state.tablature[state.selectedColumnIndex].notes.map((note) => {
		if (typeof note === 'number') return left + note + right;
		return note;
	});

	const newColumn = { ...state.tablature[state.selectedColumnIndex], notes: newNotesColumn };

	const newTablature = replaceColumnInTablature(state.tablature, state.selectedColumnIndex, newColumn);

	let updatedState = {
		...state,
		tablature: newTablature,
	};

	return updatedState;
};

const setStringNote = (state, guitarString, note) => {
	const newTablature = setColumnNote(state.tablature, state.selectedColumnIndex, guitarString, note);

	let updatedState = {
		...state,
		tablature: newTablature,
	};

	if (state.automove && !state.holdingShift) {
		updatedState = moveSelectedColumn(updatedState, state.spaces);
	}

	return updatedState;
};

const addSymbolToColumnNotes = (state, symbol) => {
	const columnToAddTo = state.selectedColumnIndex - 1;
	let newNotesColumn = state.tablature[columnToAddTo].notes.map((note) => {
		if (typeof note === 'number') return note + symbol;
		return note;
	});

	const newColumn = { ...state.tablature[state.selectedColumnIndex], notes: newNotesColumn };

	const newTablature = replaceColumnInTablature(state.tablature, columnToAddTo, newColumn);

	let updatedState = {
		...state,
		tablature: newTablature,
	};

	return updatedState;
};

const moveSelectedColumn = (state, direction) => {
	let { prevLineBreakIndex } = findClosestLineBreaks(state.tablature, state.selectedColumnIndex);
	const newSelectedColumnIndex = state.selectedColumnIndex + direction;

	if (newSelectedColumnIndex <= prevLineBreakIndex) return state;

	const newTablature = addColumnsIfNecessary(state.tablature, state.selectedColumnIndex, newSelectedColumnIndex);

	const updatedState = {
		...state,
		tablature: newTablature,
		selectedColumnIndex: newSelectedColumnIndex,
	};

	return updatedState;
};

const deleteLine = (state) => {
	let { prevLineBreakIndex, nextLineBreakIndex } = findClosestLineBreaks(state.tablature, state.selectedColumnIndex);
	let newTablature = JSON.parse(JSON.stringify(state.tablature));
	let newSelectedColumn = prevLineBreakIndex - 1;

	if (prevLineBreakIndex === -1) {
		if (nextLineBreakIndex === newTablature.length) return state;
		newSelectedColumn = 0;
		prevLineBreakIndex = 0;
		nextLineBreakIndex += 1;
	}

	newTablature.splice(prevLineBreakIndex, nextLineBreakIndex - prevLineBreakIndex);

	const updatedState = {
		...state,
		tablature: newTablature,
		selectedColumnIndex: newSelectedColumn,
	};

	return updatedState;
};

const addLine = (state) => {
	let { nextLineBreakIndex } = findClosestLineBreaks(state.tablature, state.selectedColumnIndex);
	nextLineBreakIndex -= 1;

	let newTablature = insertColumnAfter(state.tablature, nextLineBreakIndex);
	newTablature = insertColumnAfter(newTablature, nextLineBreakIndex);
	newTablature = insertColumnAfter(newTablature, nextLineBreakIndex, LINE_BREAK_COLUMN);

	const updatedState = {
		...state,
		tablature: newTablature,
		selectedColumnIndex: nextLineBreakIndex + 3,
	};

	return updatedState;
};

const addSpaceColumn = (state) => {
	const newTablature = insertColumnAfter(state.tablature, state.selectedColumnIndex);

	const updatedState = {
		...state,
		tablature: newTablature,
		selectedColumnIndex: state.selectedColumnIndex + 1,
	};

	return updatedState;
};

const clearColumn = (state) => {
	const newTablature = setColumnAllNotes(state.tablature, state.selectedColumnIndex, EMPTY_NOTE_CHAR);

	const updatedState = {
		...state,
		tablature: newTablature,
	};

	return updatedState;
};

const setColumnToDivider = (state) => {
	const newTablature = setColumnAllNotes(state.tablature, state.selectedColumnIndex, '|');

	let updatedState = {
		...state,
		tablature: newTablature,
	};

    if (state.automove && !state.holdingShift) {
		updatedState = moveSelectedColumn(updatedState, state.spaces);
	}

	return updatedState;
};

const copySelectedColumn = (state) => {
	const updatedState = {
		...state,
		copiedColumn: state.tablature[state.selectedColumnIndex],
	};

	return updatedState;
};

const pasteCopiedColumn = (state) => {
	const newTablature = replaceColumnInTablature(state.tablature, state.selectedColumnIndex, state.copiedColumn);

	const updatedState = {
		...state,
		tablature: newTablature,
	};

	return updatedState;
};

const placeColumn = (state, column) => {
	const newTablature = replaceColumnInTablature(state.tablature, state.selectedColumnIndex, column);

	let updatedState = {
		...state,
		tablature: newTablature,
	};

    if (state.automove && !state.holdingShift) {
		updatedState = moveSelectedColumn(updatedState, state.spaces);
	}

	return updatedState;
};

const saveSelectedChord = (state, name) => {
	const newColumn = { ...state.tablature[state.selectedColumnIndex], modifier: EMPTY_MODIFIER };

	const updatedState = {
		...state,
		savedChords: [...state.savedChords, { name: name, column: newColumn }],
	};

	return updatedState;
};
