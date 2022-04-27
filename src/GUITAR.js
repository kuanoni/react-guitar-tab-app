export const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export const TUNINGS = getTunings();
export const TUNING_SOUNDS = {};
TUNINGS.forEach((tuning) => {
	try {
		TUNING_SOUNDS[tuning] = new Audio(require('./sounds/guitar-' + tuning.replace('#', 's') + '.wav'));
	} catch (ex) {}
});

function getTunings() {
	let tunings = [];
	for (let i = 0; i < 10; i++) {
		NOTES.forEach((note) => {
			tunings.push(note + i);
		});
	}
	return tunings;
}

export const symbolsToSnapTo = ['h', 'p', 'b', '/', '\\'];
export const wrappingSymbols = ['(', ')', '<', '>'];

export const guitarTunings = {
    eStandard: {name: 'E Standard', tuning: [28, 33, 38, 43, 47, 52]},
    dropD: {name: 'Drop D', tuning: [26, 33, 38, 43, 47, 52]},
}

export const CHORDS = {
    openEMinor: {name: 'Open E Minor', column: [0, 2, 2, 0, 0, 0]},
}

export const EMPTY_NOTE_CHAR = '-';
export const EMPTY_COLUMN = [
	EMPTY_NOTE_CHAR,
	EMPTY_NOTE_CHAR,
	EMPTY_NOTE_CHAR,
	EMPTY_NOTE_CHAR,
	EMPTY_NOTE_CHAR,
	EMPTY_NOTE_CHAR,
];
export const LINE_BREAK_CHAR = ')';
export const LINE_BREAK_COLUMN = [
	LINE_BREAK_CHAR,
	LINE_BREAK_CHAR,
	LINE_BREAK_CHAR,
	LINE_BREAK_CHAR,
	LINE_BREAK_CHAR,
	LINE_BREAK_CHAR,
];
export const SPACE_BETWEEN_NOTES = 1;
