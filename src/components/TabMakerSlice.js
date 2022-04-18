import { shallowEqual } from "react-redux";

const EMPTY_NOTE_CHAR = '-';
const EMPTY_COLUMN = [
	EMPTY_NOTE_CHAR,
	EMPTY_NOTE_CHAR,
	EMPTY_NOTE_CHAR,
	EMPTY_NOTE_CHAR,
	EMPTY_NOTE_CHAR,
	EMPTY_NOTE_CHAR,
];
const LINE_BREAK_CHAR = ')';
const LINE_BREAK_COLUMN = [
    LINE_BREAK_CHAR,
    LINE_BREAK_CHAR,
    LINE_BREAK_CHAR,
    LINE_BREAK_CHAR,
    LINE_BREAK_CHAR,
    LINE_BREAK_CHAR
]
const SPACE_BETWEEN_NOTES = 3;

const initialState = {
	selectedColumn: 2,
	tuning: [28, 33, 38, 43, 47, 52],
	tablature: [EMPTY_COLUMN, EMPTY_COLUMN, EMPTY_COLUMN, LINE_BREAK_COLUMN, EMPTY_COLUMN, EMPTY_COLUMN, EMPTY_COLUMN, LINE_BREAK_COLUMN, EMPTY_COLUMN, EMPTY_COLUMN, EMPTY_COLUMN],
	history: [],
	holdingShift: false,
	holdingCtrl: false,
};

const updateItemInSelectedColumn = (tablature, selectedCol, guitarString, value) => {
	let changedTablature = JSON.parse(JSON.stringify(tablature));
	changedTablature[selectedCol][guitarString] = value;
	return changedTablature;
};

const updateAllItemsInSelectedColumn = (tablature, selectedCol, value) => {
	let changedTablature = JSON.parse(JSON.stringify(tablature));
	changedTablature[selectedCol] = tablature[selectedCol].map(() => value);
	return changedTablature;
};

const findClosestLineBreakIndexes = (tablature, selectedCol) => {
    let prevLineBreak = null;
    let nextLineBreak = null;

    let lineBreakIndexes = [];
	tablature.forEach((column, i) => {
		if (shallowEqual(column, LINE_BREAK_COLUMN)) {
			lineBreakIndexes.push(i);
		}
	});

    lineBreakIndexes.every((i) => {
    if (i < selectedCol) {
        prevLineBreak = i;
        return true;
    } else {
        nextLineBreak = i;
        return false;
    }
	});

    if (prevLineBreak === null) prevLineBreak = 0;

    return { prevLineBreak, nextLineBreak }
}

const appendEmptyColumns = (tablature, amount) => {
	const newColumns = createEmptyColumns(amount);
	return [...tablature, ...newColumns];
};

const createEmptyColumns = (amount = 1) => {
	let newColumns = [];
	for (let i = 0; i < amount; i++) {
		newColumns.push(EMPTY_COLUMN);
	}

	return newColumns;
};

const insertEmptyColumn = (tablature, index, amount=1) => {
	let changedTablature = JSON.parse(JSON.stringify(tablature));
    for (let i = 0; i < amount; i++) {
        changedTablature.splice(index, 0, createEmptyColumns(1).flat());
    }

	return changedTablature;
};

const saveChangesToHistory = (oldState, updatedState) => {
	return {
		...updatedState,
		history: [
			...updatedState.history,
			{
				selectedColumn: oldState.selectedColumn,
				tablature: JSON.parse(JSON.stringify(oldState.tablature)),
			},
		],
	};
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

		case 'tabMaker/addSpaceColumns':
			return addSpaceColumns(state);

		case 'tabMaker/changeColumnToDivider':
			return changeColumnToDivider(state);

		case 'tabMaker/newLineBreak':
			return newLineBreak(state);

		case 'tabMaker/deleteLastLineBreak':
			return deleteLastLineBreak(state);

		case 'tabMaker/setStringNote':
			return setStringNote(state, action.payload.guitarString, action.payload.note);

		case 'tabMaker/snapStringNoteToPrevious':
			return snapStringNoteToPrevious(state, action.payload.guitarString, action.payload.note);

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
	if (columnIndex < 0) return state;

	let newTablature = state.tablature;

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

const moveSelectedColumn = (state, direction) => {
    let newTablature = JSON.parse(JSON.stringify(state.tablature));
    let newSelectedColumn = state.selectedColumn;
    let {prevLineBreak, nextLineBreak} = findClosestLineBreakIndexes(newTablature, state.selectedColumn);

    if (direction + newSelectedColumn === prevLineBreak && direction + newSelectedColumn !== 0) {
        return state;
    } 

    if (newSelectedColumn + direction === nextLineBreak) {
        newTablature = insertEmptyColumn(newTablature, direction + newSelectedColumn);
        newSelectedColumn += 1;
    } else {
        return changeSelectedColumn(state, direction + state.selectedColumn);
    }

    const updatedState = {
        ...state,
        tablature: newTablature,
        selectedColumn: newSelectedColumn
    }

    return updatedState;
};

const clearColumn = (state) => {
	const newTablature = updateAllItemsInSelectedColumn(state.tablature, state.selectedColumn, EMPTY_NOTE_CHAR);

	const updatedState = {
		...state,
		tablature: newTablature,
	};

	return saveChangesToHistory(state, updatedState);
};

const addSpaceColumns = (state, spaces = SPACE_BETWEEN_NOTES) => {
	const newTablature = insertEmptyColumn(state.tablature, state.selectedColumn, spaces);

	const updatedState = {
		...state,
		tablature: newTablature,
		selectedColumn: state.selectedColumn + spaces
	};

	return saveChangesToHistory(state, updatedState);
};

const changeColumnToDivider = (state) => {
	let newTablature = updateAllItemsInSelectedColumn(state.tablature, state.selectedColumn, '|');

	let newSelectedColumn = state.selectedColumn;

	if (state.selectedColumn === state.tablature.length - 1) {
		newTablature = appendEmptyColumns(newTablature, 3);
		newSelectedColumn = newTablature.length - 1;
	}

	const updatedState = {
		...state,
		tablature: newTablature,
		selectedColumn: newSelectedColumn,
	};

	return saveChangesToHistory(state, updatedState);
};

const newLineBreak = (state) => {
    let newTablature = JSON.parse(JSON.stringify(state.tablature));
    let newSelectedColumn = state.selectedColumn;
    let {_, nextLineBreak} = findClosestLineBreakIndexes(newTablature, state.selectedColumn);

    if (nextLineBreak === null) {
        // end chunk
        nextLineBreak = newTablature.length;
    }

    newTablature = insertEmptyColumn(newTablature, nextLineBreak);
    newSelectedColumn = nextLineBreak;
    newTablature = updateAllItemsInSelectedColumn(newTablature, newSelectedColumn, LINE_BREAK_CHAR);
    newTablature = insertEmptyColumn(newTablature, newSelectedColumn+1, SPACE_BETWEEN_NOTES);
    newSelectedColumn += SPACE_BETWEEN_NOTES;

    const updatedState = {
		...state,
		tablature: newTablature,
		selectedColumn: newSelectedColumn,
	};

    return saveChangesToHistory(state, updatedState);
}

const deleteLastLineBreak = (state) => {
    let newTablature = JSON.parse(JSON.stringify(state.tablature));
    let newSelectedColumn = state.selectedColumn;
    let {prevLineBreak, nextLineBreak} = findClosestLineBreakIndexes(newTablature, state.selectedColumn);

    if (nextLineBreak === null && prevLineBreak === 0) return state;

    if (prevLineBreak === 0) {
        // beginning chunk
        newTablature.splice(prevLineBreak, nextLineBreak-prevLineBreak+1);
        newSelectedColumn = 0;
    } else if (nextLineBreak === null) {
        // end chunk
        newTablature.splice(prevLineBreak, (newTablature.length-1)-prevLineBreak+1);
        newSelectedColumn = prevLineBreak-1;
    } else {
        // middle chunk
        newTablature.splice(prevLineBreak+1, nextLineBreak-prevLineBreak);
        newSelectedColumn = prevLineBreak-1;
    }

	const updatedState = {
		...state,
		tablature: newTablature,
		selectedColumn: newSelectedColumn,
	};

	return saveChangesToHistory(state, updatedState);
};

const setStringNote = (state, guitarString, note, spaces = SPACE_BETWEEN_NOTES) => {
	let newTablature = updateItemInSelectedColumn(state.tablature, state.selectedColumn, guitarString, note);

	let newSelectedColumn = state.selectedColumn;
	if (!state.holdingShift) {
		if (state.selectedColumn === state.tablature.length - 1) {
			newTablature = appendEmptyColumns(newTablature, spaces);
			newSelectedColumn = newTablature.length - 1;
		} else if (shallowEqual(state.tablature[state.selectedColumn + 1], LINE_BREAK_COLUMN)) {
			newTablature = insertEmptyColumn(newTablature, newSelectedColumn + 1);
			newTablature = insertEmptyColumn(newTablature, newSelectedColumn + 2);
			newSelectedColumn += 2;
		}
	}

	const updatedState = {
		...state,
		tablature: newTablature,
		selectedColumn: newSelectedColumn,
	};

	return saveChangesToHistory(state, updatedState);
};

const snapStringNoteToPrevious = (state, guitarString, note, spaces = SPACE_BETWEEN_NOTES) => {
	if (state.selectedColumn < SPACE_BETWEEN_NOTES) return setStringNote(state, guitarString, note, spaces);

	let columnToSnapTo = state.tablature[state.selectedColumn - SPACE_BETWEEN_NOTES];

	if (
		state.tablature[state.selectedColumn] !== EMPTY_COLUMN ||
		state.tablature[state.selectedColumn - 1] !== EMPTY_COLUMN ||
		state.tablature[state.selectedColumn - 2] !== EMPTY_COLUMN ||
		typeof columnToSnapTo[guitarString] !== 'number'
	) {
		return setStringNote(state, guitarString, note, spaces);
	}

	let newTablature = state.tablature.slice(0, state.selectedColumn - 1);

	let newState = changeSelectedColumn(state, newTablature.length - 1);
	newState = {
		...newState,
		tablature: newTablature,
	};

	return setStringNote(newState, guitarString, note, 1);
};


// TODO: left and right movement need to add spaces to line rather than move to next line (DONE)
//       change to divider needs to add spaces when on a line
//       space button needs to add spaces to proper line
//       move EMPTY_COLUMN and the rest to GUITAR.js