import { shallowEqual } from 'react-redux';
import { EMPTY_COLUMN, LINE_BREAK_COLUMN } from '../GUITAR';

export const updateItemInSelectedColumn = (tablature, selectedCol, guitarString, value) => {
	let changedTablature = JSON.parse(JSON.stringify(tablature));
	changedTablature[selectedCol][guitarString] = value;
	return changedTablature;
};

export const updateAllItemsInSelectedColumn = (tablature, selectedCol, value) => {
	let changedTablature = JSON.parse(JSON.stringify(tablature));
	changedTablature[selectedCol] = tablature[selectedCol].map(() => value);
	return changedTablature;
};

export const findClosestLineBreakIndexes = (tablature, selectedCol) => {
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

	return { prevLineBreak, nextLineBreak };
};

export const appendEmptyColumns = (tablature, amount) => {
	const newColumns = createEmptyColumns(amount);
	return [...tablature, ...newColumns];
};

export const createEmptyColumns = (amount = 1) => {
	let newColumns = [];
	for (let i = 0; i < amount; i++) {
		newColumns.push(EMPTY_COLUMN);
	}

	return newColumns;
};

export const insertEmptyColumn = (tablature, index, amount = 1) => {
	let changedTablature = JSON.parse(JSON.stringify(tablature));
	for (let i = 0; i < amount; i++) {
		changedTablature.splice(index, 0, createEmptyColumns(1).flat());
	}

	return changedTablature;
};

export const saveChangesToHistory = (oldState, updatedState) => {
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


export const addColumnsIfNecessary = (tablature, prevColumn, newColumn) => {
    if (prevColumn >= newColumn) return tablature;

    let newTablature = JSON.parse(JSON.stringify(tablature));
    const columnAfterPrev = newTablature[prevColumn + 1];
    if (columnAfterPrev === undefined || shallowEqual(columnAfterPrev, LINE_BREAK_COLUMN)) {
        const difference = newColumn - prevColumn;
        for (let i = 0; i < difference; i++) {
            newTablature = insertEmptyColumnAfter(newTablature, prevColumn);
        }
    }

    return newTablature;
}

export const insertEmptyColumnBefore = (tablature, index) => {
    tablature.splice(index, 0, EMPTY_COLUMN);
    return tablature;
}

export const insertEmptyColumnAfter = (tablature, index) => {
    tablature.splice(index + 1, 0, EMPTY_COLUMN);
    return tablature;
}

export const setColumnNote = (tablature, selectedColumn, guitarString, note) => {
	let newTablature = JSON.parse(JSON.stringify(tablature));
	newTablature[selectedColumn][guitarString] = note;
	return newTablature;
}