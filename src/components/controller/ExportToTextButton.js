import { TUNINGS, EMPTY_NOTE_CHAR, symbolsToSnapTo, wrappingSymbols, EMPTY_MODIFIER_CHAR, LINE_BREAK_COLUMN } from '../../GUITAR';

const ExportToTextButton = (props) => {
	const onClick = () => {
		navigator.clipboard.writeText(makeTextTablature(props.tablature, props.tunings));
	};

	const containsSymbolToSnapTo = (note) => {
		return symbolsToSnapTo.some((char) => {
			if (note.toString().includes(char)) return true;
			return false;
		});
	};

	const containsWrappingSymbol = (note) => {
		return wrappingSymbols.some((char) => {
			if (note.toString().includes(char)) return true;
			return false;
		});
	};

    const objectsEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);


	const makeTextTablature = (tablature, tunings) => {
        let modifiers = ['   '];
		let guitarStrings = [[], [], [], [], [], []];
        
        let tablatureLines = [];
		let _i = 0;

		// slice tablature into chunks, separated by line-break markers: %
		tablature.forEach((column, i) => {
			if (objectsEqual(column, LINE_BREAK_COLUMN)) {
				tablatureLines.push(tablature.slice(_i, i));
				_i = i + 1;
			}
		});
		tablatureLines.push(tablature.slice(_i, tablature.length));

        console.log(tablatureLines)

		tablature.forEach((column) => {
			let longest = column.notes.reduce((a, b) => {
				return a.length > b.length ? a : b;
			}).length;

			if (longest < 3 || !longest) longest = 3;

			column.notes.forEach((note, i) => {
				let difference = longest - note.toString().length;

				if (containsSymbolToSnapTo(note)) {
					guitarStrings[i].push(EMPTY_NOTE_CHAR.repeat(difference) + note);
				} else if (containsWrappingSymbol(note)) {
					guitarStrings[i].push(note);
				} else {
					guitarStrings[i].push(note + EMPTY_NOTE_CHAR.repeat(difference));
				}
			});

            if (column.modifier === EMPTY_MODIFIER_CHAR) {
                modifiers.push(column.modifier.repeat(longest))
            } else {
                modifiers.push(column.modifier.slice(0, longest));
                console.log(column.modifier.slice(0, longest))
            }
		});

		let tabString = modifiers.join('') + '\n';
		let tuningsRev = tunings.reverse();

		guitarStrings.reverse().forEach((str, i) => {
			tabString += TUNINGS[tuningsRev[i]] + '|' + str.join('') + '\n';
		});

		return tabString + '\n\n';
	};

	return (
		<div className='copy-tab' onClick={onClick}>
			Copy tab to clipboard
		</div>
	);
};

export default ExportToTextButton;
