import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { EMPTY_NOTE_CHAR, symbolsToSnapTo } from '../../../GUITAR';

const TabColumn = (props) => {
	const dispatch = useDispatch();
	const columnRef = useRef(null);

	useEffect(() => {
		columnRef.current.scrollIntoView();
	}, []);

	const setSelectedColumn = (columnId) => {
		dispatch({ type: 'tabMaker/changeSelectedColumn', payload: columnId });
	};

	const containsSymbolToSnapTo = (column) => {
		return column.some((note) => symbolsToSnapTo.includes(note));
	};

	const containsNumber = (column) => {
		return column.some((note) => {
			return parseInt(note);
		});
	};

	const wrapColumn = (column, i) => {
		return (
			<div key={i} className='tab-column' onClick={() => setSelectedColumn(props.id)}>
				{wrapColumnNotes(column)}
			</div>
		);
	};

	const wrapColumnNotes = (column) => {
		return column
			.map((note, i) => {
				return (
					<div key={i} className='note'>
						{note}
					</div>
				);
			})
			.reverse();
	};

	const makeColumns = () => {
		let columns = [[], [], [], []];

		var longest = props.column.notes.reduce((a, b) => {
			return a.length > b.length ? a : b;
		}).length;

		if (longest < 3 || !longest) longest = 3;

		props.column.notes.forEach((note) => {
			for (let i = 0; i < longest; i++) {
				if (note.toString()[i]) {
					columns[i].push(note.toString()[i]);
				} else {
					columns[i].push(EMPTY_NOTE_CHAR);
				}
			}
		});

		for (let i = 0; i < 4; i++) {
            if (i === 3) {
                columns[i].push(props.column.modifier[i]);
            } else {
                columns[i].push(props.column.modifier[i]);
            }
			
			if (i >= longest) columns[i] = [];
		}

		return columns;
	};

	const orderColumns = () => {
		const [column1, column2, column3, column4] = makeColumns();

		if (containsNumber(column1) && !containsNumber(column2)) {
			if (containsSymbolToSnapTo(column2)) {
				return [column3, column1, column2];
			}
		}

		if (column4.length !== 0) {
			return [column1, column2, column3, column4];
		}

		return [column1, column2, column3];
	};

	return (
		<div ref={columnRef} className={props.selectedColumn === props.id ? 'columns selected' : 'columns'}>
			{orderColumns().map((column, i) => wrapColumn(column, i))}
		</div>
	);
};

export default TabColumn;
