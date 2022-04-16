const EMPTY_NOTE_CHAR = '-'
const EMPTY_COLUMN = [
    EMPTY_NOTE_CHAR,
    EMPTY_NOTE_CHAR,
    EMPTY_NOTE_CHAR,
    EMPTY_NOTE_CHAR,
    EMPTY_NOTE_CHAR,
    EMPTY_NOTE_CHAR
];
const SPACE_BETWEEN_NOTES = 3;

const initialState = {
    selectedColumn: 2,
    tuning: [28, 33, 38, 43, 47, 52],
    tablature: [EMPTY_COLUMN, EMPTY_COLUMN, EMPTY_COLUMN],
    history: [],
    holdingShift: false,
    holdingCtrl: false,
};

const updateItemInSelectedColumn = (
    tablature,
    selectedCol,
    guitarString,
    value
) => {
    let changedTablature = JSON.parse(JSON.stringify(tablature));
    changedTablature[selectedCol][guitarString] = value;
    return changedTablature;
};

const updateAllItemsInSelectedColumn = (tablature, selectedCol, value) => {
    let changedTablature = JSON.parse(JSON.stringify(tablature));
    changedTablature[selectedCol] = tablature[selectedCol].map(() => value);
    return changedTablature;
};

const addEmptyColumns = (tablature, amount) => {
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
        case "tabMaker/setHoldingShift":
            return { ...state, holdingShift: action.payload };

        case "tabMaker/setHoldingCtrl":
            return { ...state, holdingCtrl: action.payload };

        case "tabMaker/undoToHistory":
            return undoToHistory(state);

        case "tabMaker/changeStringTuning":
            return changeStringTuning(
                state,
                action.payload.guitarString,
                action.payload.tuning
            );

        case "tabMaker/changeSelectedColumn":
            return changeSelectedColumn(state, action.payload);

        case "tabMaker/moveSelectedColumn":
            return moveSelectedColumn(state, action.payload);

        case "tabMaker/clearSelectedColumn":
            return clearColumn(state);

        case "tabMaker/addSpaceColumns":
            return addSpaceColumns(state);

        case "tabMaker/changeColumnToDivider":
            return changeColumnToDivider(state);

        case "tabMaker/setStringNote":
            return setStringNote(
                state,
                action.payload.guitarString,
                action.payload.note,
            );

        case "tabMaker/snapStringNoteToPrevious":
            return snapStringNoteToPrevious(
                state,
                action.payload.guitarString,
                action.payload.note
            );

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
        newTablature = addEmptyColumns(state.tablature, selectionDifference);
    }

    const updatedState = {
        ...state,
        tablature: newTablature,
        selectedColumn: columnIndex,
    };

    return updatedState;
};

const moveSelectedColumn = (state, direction) => {
    return changeSelectedColumn(state, direction + state.selectedColumn);
};

const clearColumn = (state) => {
    const newTablature = updateAllItemsInSelectedColumn(
        state.tablature,
        state.selectedColumn,
        "—"
    );

    const updatedState = {
        ...state,
        tablature: newTablature,
    };

    return saveChangesToHistory(state, updatedState);
};

const addSpaceColumns = (state, spaces = SPACE_BETWEEN_NOTES) => {
    const newTablature = addEmptyColumns(state.tablature, spaces);

    const updatedState = {
        ...state,
        tablature: newTablature,
        selectedColumn: newTablature.length - 1,
    };

    return saveChangesToHistory(state, updatedState);
};

const changeColumnToDivider = (state) => {
    let newTablature = updateAllItemsInSelectedColumn(
        state.tablature,
        state.selectedColumn,
        "|"
    );

    let newSelectedColumn = state.selectedColumn;

    if (state.selectedColumn === state.tablature.length - 1) {
        newTablature = addEmptyColumns(newTablature, 3);
        newSelectedColumn = newTablature.length - 1;
    }

    const updatedState = {
        ...state,
        tablature: newTablature,
        selectedColumn: newSelectedColumn,
    };

    return saveChangesToHistory(state, updatedState);
};

const setStringNote = (state, guitarString, note, spaces=SPACE_BETWEEN_NOTES) => {
    let newTablature = updateItemInSelectedColumn(
        state.tablature,
        state.selectedColumn,
        guitarString,
        note
    );

    let newSelectedColumn = state.selectedColumn;
    if (!state.holdingShift) {
        if (state.selectedColumn === state.tablature.length - 1) {
            newTablature = addEmptyColumns(newTablature, spaces);
            newSelectedColumn = newTablature.length - 1;
        }
    }

    const updatedState = {
        ...state,
        tablature: newTablature,
        selectedColumn: newSelectedColumn,
    };

    return saveChangesToHistory(state, updatedState);
};

const snapStringNoteToPrevious = (state, guitarString, note, spaces=SPACE_BETWEEN_NOTES) => {
    if (state.selectedColumn < SPACE_BETWEEN_NOTES)
        return setStringNote(state, guitarString, note, spaces);

    let columnToSnapTo = state.tablature[state.selectedColumn - SPACE_BETWEEN_NOTES];

    if (
        state.tablature[state.selectedColumn] !== EMPTY_COLUMN ||
        state.tablature[state.selectedColumn - 1] !== EMPTY_COLUMN ||
        state.tablature[state.selectedColumn - 2] !== EMPTY_COLUMN ||
        typeof columnToSnapTo[guitarString] !== "number"
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
