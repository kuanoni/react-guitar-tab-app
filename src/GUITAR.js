export const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export const TUNINGS = getTunings();

function getTunings() {
	let tunings = [];
	for (let i = 0; i < 10; i++) {
		NOTES.forEach((note) => {
			tunings.push(note + i);
		});
	}

	return tunings;
}
