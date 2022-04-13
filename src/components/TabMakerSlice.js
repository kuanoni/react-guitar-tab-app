const initialState = {
    selectedColumn: 0,
    tuning: [28, 33, 38, 43, 47, 52],
    tablature: [
        ['—', '—', '—', '—', '—', '—'],
        ['—', '—', '—', '—', '—', '—'],
        ['—', '—', '—', '—', '—', '—'],
        ['—', '—', '—', '—', '—', '—'],
    ],
    history: []
  }

export default function tabMakerReducer(state = initialState, action) {
    // create deep copies of tablature
    const changedTablature = JSON.parse(JSON.stringify(state.tablature));
    const tablatureCopy = JSON.parse(JSON.stringify(state.tablature));
    const previousState = state.history.at(-1);

    switch (action.type) {
        // payload: none
        case 'tabMaker/undoToHistory': {
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

        case 'tabMaker/changeStringTuning': {
            let newTuning = [...state.tuning];
            newTuning[action.payload.guitarString] = action.payload.tuning;

            return {
                ...state, 
                tuning: newTuning
            }
        }

        //=====================================================
        //                   COLUMNS
        // ====================================================

        // payload: columnId
        case 'tabMaker/changeSelectedColumn': {
            if (action.payload < 0) return state;
            let mutableTabHistory = null;

            // creates new columns if newly selected column does not exist
            let newColumns = [];
            // difference between selected column and tab column amount
            const selectionDiff = action.payload - state.tablature.length + 1; 
            if (selectionDiff > 0) {
                newColumns = createEmptyColumns(selectionDiff);
                mutableTabHistory = tablatureCopy; // save to history when creating new columns
            }

            if (mutableTabHistory) {
                return {
                    ...state,
                    selectedColumn: action.payload,
                    tablature: [
                        ...state.tablature,
                        ...newColumns
                    ],
                    history: [
                        ...state.history,
                        {selectedColumn: state.selectedColumn, tablature: mutableTabHistory}
                    ]
                }
            } else {
                return {
                    ...state,
                    selectedColumn: action.payload,
                    tablature: [
                        ...state.tablature,
                        ...newColumns
                    ]
                }
            }
        }

        // payload: none
        case 'tabMaker/clearSelectedColumn': {
            changedTablature[state.selectedColumn] = createEmptyColumns().flat();

            return {
                ...state,
                tablature: changedTablature,
                history: [
                    ...state.history,
                    {selectedColumn: state.selectedColumn, tablature: tablatureCopy}
                ]
            }
        }

        // payload: none
        case 'tabMaker/changeColumnToDivider': {
            changedTablature[state.selectedColumn] = ['|', '|', '|', '|', '|', '|'];

            return {
                ...state,
                tablature: changedTablature,
                history: [
                    ...state.history,
                    {selectedColumn: state.selectedColumn, tablature: tablatureCopy}
                ]
            }
        }

        // payload: guitarString, value
        case 'tabMaker/setTabFret': {
            if (changedTablature[state.selectedColumn][action.payload.guitarString] === '—')
                changedTablature[state.selectedColumn][action.payload.guitarString] = action.payload.value;
            
            return {
                ...state,
                tablature: changedTablature,
                history: [
                    ...state.history,
                    {selectedColumn: state.selectedColumn, tablature: tablatureCopy}
                ]
            }
        }

        default:
            return state
        }
}

const createEmptyColumns = (amount=1) => {
    let newColumns = [];
    for (let i = 0; i < amount; i++) {
        newColumns.push(['—', '—', '—', '—', '—', '—']);
    }

    return newColumns;
} 