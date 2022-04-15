const initialState = {
    selectedColumn: 2,
    tuning: [28, 33, 38, 43, 47, 52],
    tablature: [
        ['—', '—', '—', '—', '—', '—'],
        ['—', '—', '—', '—', '—', '—'],
        ['—', '—', '—', '—', '—', '—'],
    ],
    history: []
}

const updateItemInSelectedColumn = (tablature, selectedCol, guitarString, value) => {
    let changedTablature = JSON.parse(JSON.stringify(tablature));
    changedTablature[selectedCol][guitarString] = value;
    return changedTablature;
}

const updateAllItemsInSelectedColumn = (tablature, selectedCol, value) => {
    let changedTablature = JSON.parse(JSON.stringify(tablature));
    changedTablature[selectedCol] = tablature[selectedCol].map(() => value);
    return changedTablature;
}

const createEmptyColumns = (amount=1) => {
    let newColumns = [];
    for (let i = 0; i < amount; i++) {
        newColumns.push(['—', '—', '—', '—', '—', '—']);
    }

    return newColumns;
} 

const addEmptyColumns = (tablature, amount) => {
    const newColumns = createEmptyColumns(amount);
    return [
        ...tablature,
        ...newColumns
    ]
}

const saveChangesToHistory = (oldState, updatedState) => {
    return {
        ...updatedState,
        history: [
            ...updatedState.history,
            { 
                selectedColumn: oldState.selectedColumn,
                tablature: JSON.parse(JSON.stringify(oldState.tablature))
            }           
        ]
    }
}

export default function tabMakerReducer(state = initialState, action) {
    switch (action.type) {
        case 'tabMaker/undoToHistory':
            return undoToHistory(state);

        case 'tabMaker/changeStringTuning':
            return changeStringTuning(state, action.payload.guitarString, action.payload.tuning);

        case 'tabMaker/changeSelectedColumn': 
            return changeSelectedColumn(state, action.payload);

        case 'tabMaker/clearSelectedColumn': 
            return clearColumn(state);

        case 'tabMaker/changeColumnToDivider': 

            return changeColumnToDivider(state);

        case 'tabMaker/setStringNote': 
            return setStringNote(state, 
                action.payload.guitarString, 
                action.payload.note,
                action.payload.spaces
            );

        default:
            return state
    }
}

const undoToHistory = (state) => {
    const previousState = state.history.at(-1);

    if (previousState === undefined) {
        return state;
    }

    return {
        ...state,
        selectedColumn: previousState.selectedColumn,
        tablature: previousState.tablature,
        history: state.history.slice(0, -1)
    }
}

const changeStringTuning = (state, guitarString, tuning) => {
    let newTuning = [...state.tuning];
    newTuning[guitarString] = tuning;

    return {
        ...state, 
        tuning: newTuning
    }
}

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
        selectedColumn: columnIndex
    }

    return updatedState;
}

const clearColumn = (state) => {
    const newTablature = updateAllItemsInSelectedColumn(
        state.tablature,
        state.selectedColumn,
        '—'
    );

    const updatedState = {
        ...state,
        tablature: newTablature
    }

    return saveChangesToHistory(state, updatedState);
}

const changeColumnToDivider = (state) => {
    const newTablature = updateAllItemsInSelectedColumn(
        state.tablature,
        state.selectedColumn,
        '|'
    );

    const updatedState = {
        ...state,
        tablature: newTablature
    }

    return saveChangesToHistory(state, updatedState);
}

const setStringNote = (state, guitarString, note, spaces) => {
    let newTablature = updateItemInSelectedColumn(
        state.tablature, 
        state.selectedColumn, 
        guitarString, 
        note
    );

    let newSelectedColumn = state.selectedColumn;

    if (state.selectedColumn === state.tablature.length - 1) {
        newTablature = addEmptyColumns(newTablature, spaces);
        newSelectedColumn = newTablature.length - 1;
    }

    let updatedState = {
        ...state,
        tablature: newTablature,
        selectedColumn: newSelectedColumn
    } 

    return saveChangesToHistory(state, updatedState);
}

