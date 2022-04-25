import { shallowEqual } from 'react-redux';
import {
	EMPTY_COLUMN,
	EMPTY_NOTE_CHAR,
	LINE_BREAK_CHAR,
	LINE_BREAK_COLUMN,
	SPACE_BETWEEN_NOTES,
	symbolsToSnapTo,
	wrappingSymbols,
} from '../GUITAR';

import {
	updateAllItemsInSelectedColumn,
	findClosestLineBreakIndexes,
	appendEmptyColumns,
	insertEmptyColumn,
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
	history: [{ selectedColumn: 1, tablature: [EMPTY_COLUMN, EMPTY_COLUMN] }],
	holdingShift: false,
	holdingCtrl: false,
};

const destructureState = (state) => {
	const newTablature = JSON.parse(JSON.stringify(state.tablature));
	const newSelectedColumn = state.selectedColumn;
	let { prevLineBreak, nextLineBreak } = findClosestLineBreakIndexes(state.tablature, state.selectedColumn);
	if (prevLineBreak === 0) prevLineBreak -= 1;

	return { newTablature, newSelectedColumn, prevLineBreak, nextLineBreak };
};

const isColumnNextToLineBreak = (tablature, columnIndex) => {
	if (tablature[columnIndex + 1] === undefined) return true;
	return shallowEqual(tablature[columnIndex + 1], LINE_BREAK_COLUMN);
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
			return moveSelectedColumn(state, action.payload);

		case 'tabMaker/clearSelectedColumn':
			return clearColumn(state);

		case 'tabMaker/addSpaceColumn':
			return addSpaceColumn(state);

		case 'tabMaker/changeColumnToDivider':
			return setColumnToDivider(state);

		case 'tabMaker/newLineBreak':
			return addLine(state);

		case 'tabMaker/deleteLastLineBreak':
			return deleteLine(state);

		case 'tabMaker/setStringNote':
			return setStringNote(state, action.payload.guitarString, action.payload.note);

		case 'tabMaker/addLetterToNote':
			return addSymbolToColumnNotes(state, action.payload);

		case 'tabMaker/wrapNote':
			return wrapNote(state, action.payload.left, action.payload.right);

		default:
			return state;
	}
}

const undoToHistory = (state) => {
	let updatedState;
	const previousState = state.history.at(-1);

	if (previousState === undefined) {
		return state;
	}

	if (state.history.length === 1) {
		updatedState = {
			...state,
			selectedColumn: previousState.selectedColumn,
			tablature: previousState.tablature,
		};
	} else {
		updatedState = {
			...state,
			selectedColumn: previousState.selectedColumn,
			tablature: previousState.tablature,
			history: state.history.slice(0, -1),
		};
	}

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
	if (columnIndex < 0) return state;

	let { newTablature } = destructureState(state);

	const selectionDifference = columnIndex - state.tablature.length + 1;
	if (selectionDifference > 0) {
		newTablature = appendEmptyColumns(state.tablature, selectionDifference);
	}

	const updatedState = {
		...state,
		tablature: newTablature,
		selectedColumn: columnIndex,
	};

	return updatedState;
};

const wrapNote = (state, left, right) => {
	if (state.selectedColumn < 1) return state;
	let { newTablature } = destructureState(state);

	let columnToAddTo = state.tablature[state.selectedColumn];
	let newColumn = columnToAddTo.map((note) => {
		const noteString = note.toString();
		for (let i = 0; i < noteString.length; i++) {
			if (symbolsToSnapTo.includes(noteString[i]) || wrappingSymbols.includes(noteString[i])) return noteString;
		}

		if (noteString !== EMPTY_NOTE_CHAR) {
			console.log(note);
			return left + note.toString() + right;
		}

		return noteString;
	});

	newTablature[state.selectedColumn] = newColumn;

	const updatedState = {
		...state,
		tablature: newTablature,
	};

	return saveChangesToHistory(state, updatedState);
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
    let newColumn = state.tablature[columnToAddTo].map(note => {
        if (typeof(note) === 'number') return note + symbol;
        return note;
    });

    const newTablature = replaceColumnInTablature(state.tablature, columnToAddTo, newColumn)

    let updatedState = {
		...state,
		tablature: newTablature,
	};

    return updatedState;
}

const moveSelectedColumn = (state, direction) => {
    let {prevLineBreak} = findClosestLineBreaks(state.tablature, state.selectedColumn);
    const newSelectedColumn = state.selectedColumn + direction;

    if (newSelectedColumn <= prevLineBreak) return state;

    const newTablature = addColumnsIfNecessary(state.tablature, state.selectedColumn, newSelectedColumn);
    
	const updatedState = {
		...state,
		tablature: newTablature,
		selectedColumn: newSelectedColumn,
	};

	return updatedState;
}

const deleteLine = (state) => {
    let {prevLineBreak, nextLineBreak} = findClosestLineBreaks(state.tablature, state.selectedColumn);
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
		selectedColumn: newSelectedColumn
	};

    return updatedState;
}

const addLine = (state) => {
    let {nextLineBreak} = findClosestLineBreaks(state.tablature, state.selectedColumn);
    nextLineBreak -= 1;

    let newTablature = insertColumnAfter(state.tablature, nextLineBreak);
    newTablature = insertColumnAfter(newTablature, nextLineBreak);
    newTablature = insertColumnAfter(newTablature, nextLineBreak, LINE_BREAK_COLUMN);

    const updatedState = {
        ...state,
        tablature: newTablature,
        selectedColumn: nextLineBreak + 3
    }

    return updatedState;
}

const addSpaceColumn = (state) => {
    const newTablature = insertColumnAfter(state.tablature, state.selectedColumn);

	const updatedState = {
		...state,
		tablature: newTablature,
        selectedColumn: state.selectedColumn + 1 
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
        tablature: newTablature
    }

    updatedState = moveSelectedColumn(updatedState, 1);

    return updatedState;
}