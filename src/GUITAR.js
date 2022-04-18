export const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export const TUNINGS = getTunings();

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
    LINE_BREAK_CHAR
]
export const SPACE_BETWEEN_NOTES = 3;

function getTunings() {
	let tunings = [];
	for (let i = 0; i < 10; i++) {
		NOTES.forEach((note) => {
			tunings.push(note + i);
		});
	}

	return tunings;
}
