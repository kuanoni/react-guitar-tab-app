import { TUNINGS, EMPTY_NOTE_CHAR, symbolsToSnapTo, EMPTY_NOTE_COLUMN, LINE_BREAK_COLUMN } from '../../../GUITAR';
import { objectsEqual } from '../../../store/tabMakerReducer/TabMakerSliceUtilities';

const ExportToTextButton = (props) => {
	const onClickClipboard = () => {
		navigator.clipboard.writeText(makeTextTablature(props.tablature, props.tunings));
	};

	const onClickExport = () => {
		const element = document.createElement('a');
		const file = new Blob([makeTextTablature(props.tablature, props.tunings)], { type: 'text/plain' });
		element.href = URL.createObjectURL(file);
		element.download = 'guitar-tab.txt';
		document.body.appendChild(element); // Required for this to work in FireFox
		element.click();
	};

	const containsSymbolToSnapTo = (note) => {
		return symbolsToSnapTo.some((char) => {
			if (note.toString().includes(char)) return true;
			return false;
		});
	};

	const makeNotesColumns = (column) => {
		let columnWidth = column.notes
			.reduce((a, b) => {
				return a.toString().length > b.toString().length ? a : b;
			})
			.toString().length;

		let notesColumns = [];
		for (let i = 0; i < columnWidth; i++) {
			notesColumns.push([]);
		}

		column.notes.forEach((note) => {
			const noteString = note.toString();
			for (let i = 0; i < columnWidth; i++) {
				if (noteString[i]) notesColumns[i].push(noteString[i]);
				else notesColumns[i].push(EMPTY_NOTE_CHAR);
			}
		});

		if (!containsSymbolToSnapTo(notesColumns.at(-1))) {
			for (let i = 0; i < 1; i++) {
				notesColumns.push(JSON.parse(JSON.stringify(EMPTY_NOTE_COLUMN)));
			}
		}

		notesColumns.forEach((col, i) => {
			const modifierStrings = column.modifier.modifierStrings;
			const modifierType = column.modifier.type;

			if (modifierType === 'end') {
				// put the 'end' marker at the last column
				if (i === notesColumns.length - 1) col.push(modifierStrings['end']);
				else col.push(modifierStrings['filler']);
			} else {
				if (modifierStrings[modifierType][i]) col.push(modifierStrings[modifierType][i]);
				else col.push(modifierStrings['filler']);
			}
		});

		return notesColumns;
	};

	const makeTextTablature = (tablature, tunings) => {
		tunings = tunings.reverse();
		let tablatureLines = [];
		let _i = 0;

		let textTablature = '';

		// slice tablature into chunks, separated by line-break markers: %
		tablature.forEach((column, i) => {
			if (objectsEqual(column, LINE_BREAK_COLUMN)) {
				tablatureLines.push(tablature.slice(_i, i));
				_i = i + 1;
			}
		});
		tablatureLines.push(tablature.slice(_i, tablature.length));

		let textArray = tablatureLines.map((tabLine) => {
			let guitarStrings = [[], [], [], [], [], [], []];

			tabLine.forEach((column) => {
				const columns = makeNotesColumns(column);
				columns.forEach((column) => {
					column.forEach((note, i) => guitarStrings[i].push(note));
				});
			});

			let tabString = '';

			guitarStrings.reverse().forEach((guitarString, i) => {
				if (TUNINGS[tunings[i - 1]]) tabString += TUNINGS[tunings[i - 1]] + '|';
				else tabString += '   ';
				tabString += guitarString.reduce((previousValue, currentValue) => previousValue + currentValue);
				tabString += '\n';
			});

			return tabString + '\n';
		});

		textTablature += textArray.reduce((previousValue, currentValue) => previousValue + currentValue);
		textTablature += '\n~| Created with text-tabber.com |~';

		return textTablature;
	};

	return (
		<>
			<div className='copy-tab' onClick={onClickClipboard}>
				Copy tab to clipboard
			</div>
			<div className='copy-tab' onClick={onClickExport}>
				Export tab to text file
			</div>
		</>
	);
};

export default ExportToTextButton;
