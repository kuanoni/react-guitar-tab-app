import { EMPTY_COLUMN, EMPTY_NOTE_CHAR, LINE_BREAK_COLUMN } from '../GUITAR';

import {
	saveChangesToHistory,
	insertColumnAfter,
	addColumnsIfNecessary,
	setColumnNote,
	setColumnAllNotes,
	findClosestLineBreaks,
	replaceColumnInTablature,
} from './TabMakerSliceUtilities';

const initialState = {
	selectedColumn: 1,
	tuning: [28, 33, 38, 43, 47, 52],
	tablature: [EMPTY_COLUMN, EMPTY_COLUMN],
	history: [],
    copiedColumn: [],
	holdingShift: false,
	holdingCtrl: false,
};

export default function tabMakerReducer(state = initialState, action) {
	switch (action.type) {
		case 'tabMaker/setHoldingShift':
			return { ...state, holdingShift: action.payload };

		case 'tabMaker/setHoldingCtrl':
			return { ...state, holdingCtrl: action.payload };

		case 'tabMaker/undoToHistory':
			return undoToHistory(state);

		case 'tabMaker/changeStringTuning':
			return changeStringTuning(state, action.payload.guitarString, action.payload.tuning);

		case 'tabMaker/changeSelectedColumn':
			return changeSelectedColumn(state, action.payload);

		case 'tabMaker/moveSelectedColumn':
			return saveChangesToHistory(state, moveSelectedColumn(state, action.payload));

		case 'tabMaker/clearSelectedColumn':
			return saveChangesToHistory(state, clearColumn(state));

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

		case 'tabMaker/wrapNote':
			return saveChangesToHistory(state, wrapNote(state, action.payload.left, action.payload.right));

        case 'tabMaker/copyColumn':
            return copySelectedColumn(state);

        case 'tabMaker/pasteCopiedColumn':
            return pasteCopiedColumn(state);

		default:
			return state;
	}
}

const undoToHistory = (state) => {
	const previousState = state.history.at(-1);

	if (previousState === undefined) {
		return state;
	}

	const updatedState = {
		...state,
		selectedColumn: previousState.selectedColumn,
		tablature: previousState.tablature,
		history: state.history.slice(0, -1),
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
		selectedColumn: columnIndex,
	};

	return updatedState;
};

const wrapNote = (state, left, right) => {
	return state;
};

const setStringNote = (state, guitarString, note) => {
	const newTablature = setColumnNote(state.tablature, state.selectedColumn, guitarString, note);

	let updatedState = {
		...state,
		tablature: newTablature,
	};

	if (!state.holdingShift) {
		updatedState = moveSelectedColumn(updatedState, 1);
	}

	return updatedState;
};

const addSymbolToColumnNotes = (state, symbol) => {
	const columnToAddTo = state.selectedColumn - 1;
	let newColumn = state.tablature[columnToAddTo].map((note) => {
		if (typeof note === 'number') return note + symbol;
		return note;
	});

	const newTablature = replaceColumnInTablature(state.tablature, columnToAddTo, newColumn);

	let updatedState = {
		...state,
		tablature: newTablature,
	};

	return updatedState;
};

const moveSelectedColumn = (state, direction) => {
	let { prevLineBreak } = findClosestLineBreaks(state.tablature, state.selectedColumn);
	const newSelectedColumn = state.selectedColumn + direction;

	if (newSelectedColumn <= prevLineBreak) return state;

	const newTablature = addColumnsIfNecessary(state.tablature, state.selectedColumn, newSelectedColumn);

	const updatedState = {
		...state,
		tablature: newTablature,
		selectedColumn: newSelectedColumn,
	};

	return updatedState;
};

const deleteLine = (state) => {
	let { prevLineBreak, nextLineBreak } = findClosestLineBreaks(state.tablature, state.selectedColumn);
	let newTablature = JSON.parse(JSON.stringify(state.tablature));
	let newSelectedColumn = prevLineBreak - 1;

	// requires different behavior if deleting the first line
	if (prevLineBreak === -1) {
		newSelectedColumn = 0;
		prevLineBreak = 0;
		nextLineBreak += 1;
	}

	newTablature.splice(prevLineBreak, nextLineBreak - prevLineBreak);

	const updatedState = {
		...state,
		tablature: newTablature,
		selectedColumn: newSelectedColumn,
	};

	return updatedState;
};

const addLine = (state) => {
	let { nextLineBreak } = findClosestLineBreaks(state.tablature, state.selectedColumn);
	nextLineBreak -= 1;

	let newTablature = insertColumnAfter(state.tablature, nextLineBreak);
	newTablature = insertColumnAfter(newTablature, nextLineBreak);
	newTablature = insertColumnAfter(newTablature, nextLineBreak, LINE_BREAK_COLUMN);

	const updatedState = {
		...state,
		tablature: newTablature,
		selectedColumn: nextLineBreak + 3,
	};

	return updatedState;
};

const addSpaceColumn = (state) => {
	const newTablature = insertColumnAfter(state.tablature, state.selectedColumn);

	const updatedState = {
		...state,
		tablature: newTablature,
		selectedColumn: state.selectedColumn + 1,
	};

	return updatedState;
};

const clearColumn = (state) => {
	const newTablature = setColumnAllNotes(state.tablature, state.selectedColumn, EMPTY_NOTE_CHAR);

	const updatedState = {
		...state,
		tablature: newTablature,
	};

	return updatedState;
};

const setColumnToDivider = (state) => {
	const newTablature = setColumnAllNotes(state.tablature, state.selectedColumn, '|');

	let updatedState = {
		...state,
		tablature: newTablature,
	};

	updatedState = moveSelectedColumn(updatedState, 1);

	return updatedState;
};

const copySelectedColumn = (state) => {
    const updatedState = {
        ...state,
        copiedColumn: state.tablature[state.selectedColumn]
    }

    return updatedState;
}

const pasteCopiedColumn = (state) => {
    const newTablature = replaceColumnInTablature(state.tablature, state.selectedColumn, state.copiedColumn);

    const updatedState = {
        ...state,
        tablature: newTablature
    }

    return updatedState;
}