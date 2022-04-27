import { TUNINGS, EMPTY_NOTE_CHAR, symbolsToSnapTo, wrappingSymbols } from '../../GUITAR';

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

	const containsLetter = (note) => {
		return /[a-z]/i.test(note);
	};

	const makeTextTablature = (tablature, tunings) => {
		let guitarStrings = [[], [], [], [], [], []];

		tablature.forEach((column) => {
			let longest = column.reduce((a, b) => {
				return a.length > b.length ? a : b;
			}).length;

			if (longest < 3 || !longest) longest = 3;

			column.forEach((note, i) => {
				let difference = longest - note.toString().length;

				if (containsSymbolToSnapTo(note)) {
					guitarStrings[i].push(EMPTY_NOTE_CHAR.repeat(difference) + note);
				} else if (containsWrappingSymbol(note)) {
					guitarStrings[i].push(note);
				} else {
					guitarStrings[i].push(note + EMPTY_NOTE_CHAR.repeat(difference));
				}
			});
		});

		let tabString = '';
		let tuningsRev = tunings.reverse();

		guitarStrings.reverse().forEach((str, i) => {
			tabString += TUNINGS[tuningsRev[i]] + '|' + str.join('') + '\n';
		});

		return tabString;
	};

	return (
		<div className='copy-tab' onClick={onClick}>
			Copy tab to clipboard
		</div>
	);
};

export default ExportToTextButton;
