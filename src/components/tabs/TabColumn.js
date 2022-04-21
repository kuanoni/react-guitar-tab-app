import { useDispatch } from 'react-redux';
import { EMPTY_NOTE_CHAR } from '../../GUITAR';

const TabColumn = (props) => {
	const dispatch = useDispatch();

	const setSelectedColumn = (columnId) => {
		dispatch({ type: 'tabMaker/changeSelectedColumn', payload: columnId });
	};

	const containsLetter = (column) => {
		return column.some((note) => /[a-z]/i.test(note));
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
		let columns = [[], [], []];
		props.column.forEach((note) => {
			for (let i = 0; i < 3; i++) {
				if (note.toString()[i]) {
					columns[i].push(note.toString()[i]);
				} else {
					columns[i].push(EMPTY_NOTE_CHAR);
				}
			}
		});

		return columns;
	};

	const orderColumns = () => {
		const [column1, column2, column3] = makeColumns();

		if (containsNumber(column1) && !containsNumber(column2)) {
			if (containsLetter(column2)) {
				return [column3, column1, column2];
			}
		}

		return [column1, column2, column3];
	};

	return (
		<div className={props.selectedColumn === props.id ? 'columns selected' : 'columns'}>
			{orderColumns().map((column, i) => wrapColumn(column, i))}
		</div>
	);
};

export default TabColumn;
