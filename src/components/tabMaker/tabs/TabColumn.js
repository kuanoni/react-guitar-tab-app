import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { EMPTY_NOTE_CHAR, EMPTY_NOTE_COLUMN, symbolsToSnapTo } from '../../../GUITAR';

const TabColumn = (props) => {
	const dispatch = useDispatch();
	const columnRef = useRef(null);

	useEffect(() => {
		columnRef.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
	}, []);

	const setSelectedColumn = (columnId) => {
		dispatch({ type: 'tabMaker/changeSelectedColumn', payload: columnId });
	};

	const containsSymbolToSnapTo = (notes) => {
		return notes.some((note) => symbolsToSnapTo.includes(note));
	};

	const wrapColumn = (column, i) => {
		return (
			<div key={i} className='tab-column' onClick={() => setSelectedColumn(props.id)}>
				{wrapColumnNotes(column).reverse()}
			</div>
		);
	};

	const wrapColumnNotes = (notesColumn) => {
		return notesColumn.map((note, i) => {
			return (
				<div key={i} className='note'>
					{note}
				</div>
			);
		});
	};

	const makeNotesColumns = () => {
		let columnWidth = props.column.notes
			.reduce((a, b) => {
				return a.toString().length > b.toString().length ? a : b;
			})
			.toString().length;

		let notesColumns = [];
		for (let i = 0; i < columnWidth; i++) {
			notesColumns.push([]);
		}

		props.column.notes.forEach((note) => {
			const noteString = note.toString();
			for (let i = 0; i < columnWidth; i++) {
				if (noteString[i]) notesColumns[i].push(noteString[i]);
				else notesColumns[i].push(EMPTY_NOTE_CHAR);
			}
		});

		if (!containsSymbolToSnapTo(notesColumns.at(-1))) {
			for (let i = 0; i < props.spaces; i++) {
				notesColumns.push(JSON.parse(JSON.stringify(EMPTY_NOTE_COLUMN)));
			}
		}

		notesColumns.forEach((column, i) => {
			const modifierStrings = props.column.modifier.modifierStrings;
			const modifierType = props.column.modifier.type;

			if (modifierType === 'end') {
				// put the 'end' marker at the last column
				if (i === notesColumns.length - 1) column.push(modifierStrings['end']);
				else column.push(modifierStrings['filler']);
			} else {
				if (modifierStrings[modifierType][i]) column.push(modifierStrings[modifierType][i]);
				else column.push(modifierStrings['filler']);
			}
		});

		return notesColumns;
	};

	const makeColumnElements = () => {
		const notesColumns = makeNotesColumns();

		return notesColumns.map((notesColumn, i) => {
			return wrapColumn(wrapColumnNotes(notesColumn), i);
		});
	};

	return (
		<div ref={columnRef} className={props.selectedColumn === props.id ? 'columns selected' : 'columns'}>
			{makeColumnElements()}
		</div>
	);
};

export default TabColumn;
