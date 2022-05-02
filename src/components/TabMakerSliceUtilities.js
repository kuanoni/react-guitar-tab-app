import { shallowEqual } from 'react-redux';
import { EMPTY_COLUMN, LINE_BREAK_COLUMN, EMPTY_MODIFIER_CHAR, modifiers } from '../GUITAR';

export const saveChangesToHistory = (oldState, updatedState) => {
	let tablatureEqual = false;

	if (oldState.tablature.length >= updatedState.tablature.length) {
		tablatureEqual = oldState.tablature.every((column, i) => {
			if (!shallowEqual(column, updatedState.tablature[i])) return false;
			return true;
		});
	} else {
		tablatureEqual = updatedState.tablature.every((column, i) => {
			if (!shallowEqual(column, oldState.tablature[i])) return false;
			return true;
		});
	}

	if (tablatureEqual) return updatedState;

	updatedState = {
		...updatedState,
		history: [
			...updatedState.history,
			{
				selectedColumn: oldState.selectedColumn,
				tablature: JSON.parse(JSON.stringify(oldState.tablature)),
			},
		],
        // currentModifier: oldState.currentModifier,
        // modifierStart: oldState.modifierStart
	};

    console.log('pepe')

	return updatedState;
};

export const insertColumnBefore = (tablature, index, column = EMPTY_COLUMN) => {
	tablature.splice(index, 0, column);
	return tablature;
};

export const insertColumnAfter = (tablature, index, column = EMPTY_COLUMN) => {
	let newTablature = JSON.parse(JSON.stringify(tablature));
	newTablature.splice(index + 1, 0, column);
	return newTablature;
};

export const addColumnsIfNecessary = (tablature, prevColumnIndex, newColumnIndex) => {
	if (prevColumnIndex >= newColumnIndex) return tablature;

	let newTablature = JSON.parse(JSON.stringify(tablature));
	const columnAfterPrev = newTablature[prevColumnIndex + 1];
	if (columnAfterPrev === undefined || objectsEqual(columnAfterPrev, LINE_BREAK_COLUMN)) {
		const difference = newColumnIndex - prevColumnIndex;
		for (let i = 0; i < difference; i++) {
			newTablature = insertColumnAfter(newTablature, prevColumnIndex);
		}
	}

	return newTablature;
};

export const setColumnNote = (tablature, selectedColumnIndex, guitarString, note) => {
	let newTablature = JSON.parse(JSON.stringify(tablature));
	newTablature[selectedColumnIndex].notes[guitarString] = note;
	return newTablature;
};

export const setColumnAllNotes = (tablature, selectedColumn, note) => {
	let newTablature = JSON.parse(JSON.stringify(tablature));
	for (let i = 0; i < newTablature[selectedColumn].notes.length; i++) {
		newTablature[selectedColumn].notes[i] = note;
	}

	return newTablature;
};

export const replaceColumnInTablature = (tablature, selectedColumn, newColumn) => {
	let newTablature = JSON.parse(JSON.stringify(tablature));

	newTablature[selectedColumn] = newColumn;
	return newTablature;
};

export const findClosestLineBreaks = (tablature, selectedColumnIndex) => {
	let prevLineBreak = null;
	let nextLineBreak = null;

	let lineBreakIndexes = [-1];
	tablature.forEach((column, i) => {
		if (objectsEqual(column, LINE_BREAK_COLUMN)) {
			lineBreakIndexes.push(i);
		}
	});

	lineBreakIndexes.push(tablature.length);

	lineBreakIndexes.every((i) => {
		if (i < selectedColumnIndex) {
			prevLineBreak = i;
			return true;
		} else {
			nextLineBreak = i;
			return false;
		}
	});

	return { prevLineBreak, nextLineBreak };
};

export const findModifierStartAndEnd = (tablature, selectedColumn) => {
    let { prevLineBreak, nextLineBreak } = findClosestLineBreaks(tablature, selectedColumn);
    if (prevLineBreak === -1) prevLineBreak = 0;

    let modifierStart = 0;
    let modifierEnd = tablature.length - 1;
    const modifierStarts = Object.keys(modifiers).map(key => modifiers[key].start);
    const modifierEnds = Object.keys(modifiers).map(key => modifiers[key].end);

    for (let i = selectedColumn; i < nextLineBreak; i++) {
        if (modifierEnds.includes(tablature[i].modifier)) {
            modifierEnd = i;
            break;
        }
    }

    for (let i = selectedColumn; i > prevLineBreak; i--) {
        if (modifierStarts.includes(tablature[i].modifier)) {
            modifierStart = i;
            break;
        }
    }

    return { modifierStart, modifierEnd };
}

const objectsEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);