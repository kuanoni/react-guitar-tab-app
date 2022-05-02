import { EMPTY_COLUMN, EMPTY_MODIFIER_CHAR, EMPTY_NOTE_CHAR, LINE_BREAK_COLUMN } from '../GUITAR';

import {
	saveChangesToHistory,
	insertColumnAfter,
	addColumnsIfNecessary,
	setColumnNote,
	setColumnAllNotes,
	findClosestLineBreaks,
	replaceColumnInTablature,
    findModifierStartAndEnd,
} from './TabMakerSliceUtilities';

const initialState = {
	selectedColumn: 1,
	tuning: [28, 33, 38, 43, 47, 52],
	tablature: [EMPTY_COLUMN, EMPTY_COLUMN],
	history: [],
	copiedColumn: [],
	savedChords: [],
	currentModifier: {},
	modifierStart: null,
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

		case 'tabMaker/changeGuitarTuning':
			return { ...state, tuning: action.payload };

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
			return saveChangesToHistory(state,startModifier(state, action.payload));

		case 'tabMaker/endModifier':
			return saveChangesToHistory(state, endModifier(state));

        case 'tabMaker/deleteModifier':
            return saveChangesToHistory(state, deleteModifier(state));

		default:
			return state;
	}
}

const deleteModifier = (state) => {
    if (state.tablature[state.selectedColumn].modifier === EMPTY_MODIFIER_CHAR) return state;
    const { modifierStart, modifierEnd } = findModifierStartAndEnd(state.tablature, state.selectedColumn);
    let newTablature = state.tablature;

    for (let i = modifierStart; i <= modifierEnd; i++) {
        const newColumn = { ...newTablature[i], modifier: EMPTY_MODIFIER_CHAR };
        newTablature = replaceColumnInTablature(newTablature, i, newColumn);
    }

    const updatedState = {
		...state,
		tablature: newTablature
    }

    return updatedState;
}

const startModifier = (state, modifier) => {
    if (state.tablature[state.selectedColumn].modifier !== EMPTY_MODIFIER_CHAR) return state;

	const newColumn = { ...state.tablature[state.selectedColumn], modifier: modifier.start };
	const newTablature = replaceColumnInTablature(state.tablature, state.selectedColumn, newColumn);

	const updatedState = {
		...state,
		tablature: newTablature,
		currentModifier: modifier,
		modifierStart: state.selectedColumn,
	};

	return updatedState;
};

const endModifier = (state) => {
	let newTablature = state.tablature;
    const { prevLineBreak } = findClosestLineBreaks(newTablature, state.selectedColumn);

    // remove the modifier start if ending modifier is before start, or ending is crossing a line break
	if ((state.modifierStart > state.selectedColumn) || (prevLineBreak !== -1 && prevLineBreak > state.modifierStart)) {
        const newColumn = { ...state.tablature[state.modifierStart], modifier: EMPTY_MODIFIER_CHAR };
		newTablature = replaceColumnInTablature(newTablature, state.modifierStart, newColumn);

		return {
			...state,
            tablature: newTablature,
			currentModifier: {},
			modifierStart: null,
		};
    }

	for (let i = state.modifierStart + 1; i < state.selectedColumn; i++) {
		const newColumn = { ...state.tablature[i], modifier: state.currentModifier.middle };
		newTablature = replaceColumnInTablature(newTablature, i, newColumn);
	}

	if (state.modifierStart === state.selectedColumn) {
		newTablature = replaceColumnInTablature(newTablature, state.selectedColumn, {
			...state.tablature[state.selectedColumn],
			modifier: state.currentModifier.start,
		});
	} else {
		newTablature = replaceColumnInTablature(newTablature, state.selectedColumn, {
			...state.tablature[state.selectedColumn],
			modifier: state.currentModifier.end,
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
		selectedColumn: previousState.selectedColumn,
		tablature: previousState.tablature,
		history: state.history.slice(0, -1),
        // currentModifier: previousState.currentModifier,
        // modifierStart: previousState.modifierStart
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

const replaceNotesInColumn = (state, replacer) => {
	const newNotesColumn = state.tablature[state.selectedColumn].notes.map((note) => {
		if (typeof note === 'number') return replacer;
		return note;
	});

	const newColumn = { ...state.tablature[state.selectedColumn], notes: newNotesColumn };

	const newTablature = replaceColumnInTablature(state.tablature, state.selectedColumn, newColumn);

	let updatedState = {
		...state,
		tablature: newTablature,
	};

	return updatedState;
};

const wrapNote = (state, left, right) => {
	const newNotesColumn = state.tablature[state.selectedColumn].notes.map((note) => {
		if (typeof note === 'number') return left + note + right;
		return note;
	});

	const newColumn = { ...state.tablature[state.selectedColumn], notes: newNotesColumn };

	const newTablature = replaceColumnInTablature(state.tablature, state.selectedColumn, newColumn);

	let updatedState = {
		...state,
		tablature: newTablature,
	};

	return updatedState;
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
	let newNotesColumn = state.tablature[columnToAddTo].notes.map((note) => {
		if (typeof note === 'number') return note + symbol;
		return note;
	});

	const newColumn = { ...state.tablature[state.selectedColumn], notes: newNotesColumn };

	const newTablature = replaceColumnInTablature(state.tablature, columnToAddTo, newColumn);

	let updatedState = {
		...state,
		tablature: newTablature,
	};

	return updatedState;
};

const moveSelectedColumn = (state, direction) => {
	let { prevLineBreak: prevLineBreakIndex } = findClosestLineBreaks(state.tablature, state.selectedColumn);
	const newSelectedColumnIndex = state.selectedColumn + direction;

	if (newSelectedColumnIndex <= prevLineBreakIndex) return state;

	const newTablature = addColumnsIfNecessary(state.tablature, state.selectedColumn, newSelectedColumnIndex);

	const updatedState = {
		...state,
		tablature: newTablature,
		selectedColumn: newSelectedColumnIndex,
	};

	return updatedState;
};

const deleteLine = (state) => {
	let { prevLineBreak, nextLineBreak } = findClosestLineBreaks(state.tablature, state.selectedColumn);
	let newTablature = JSON.parse(JSON.stringify(state.tablature));
	let newSelectedColumn = prevLineBreak - 1;

	if (prevLineBreak === -1) {
		if (nextLineBreak === newTablature.length) return state;
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
		copiedColumn: state.tablature[state.selectedColumn],
	};

	return updatedState;
};

const pasteCopiedColumn = (state) => {
	const newTablature = replaceColumnInTablature(state.tablature, state.selectedColumn, state.copiedColumn);

	const updatedState = {
		...state,
		tablature: newTablature,
	};

	return updatedState;
};

const placeColumn = (state, column) => {
	const newTablature = replaceColumnInTablature(state.tablature, state.selectedColumn, column);

	let updatedState = {
		...state,
		tablature: newTablature,
	};

	updatedState = moveSelectedColumn(updatedState, 1);

	return updatedState;
};

const saveSelectedChord = (state, name) => {
	const newColumn = { ...state.tablature[state.selectedColumn], modifier: EMPTY_MODIFIER_CHAR };

	const updatedState = {
		...state,
		savedChords: [...state.savedChords, { name: name, column: newColumn }],
	};

	return updatedState;
};
