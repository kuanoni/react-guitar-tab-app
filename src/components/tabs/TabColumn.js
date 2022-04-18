import { useDispatch } from "react-redux";
import { EMPTY_COLUMN, EMPTY_NOTE_CHAR } from "../../GUITAR";

const TabColumn = (props) => {
    const dispatch = useDispatch();

    const setSelectedColumn = (columnId) => {
		dispatch({ type: 'tabMaker/changeSelectedColumn', payload: columnId });
	};

    const notes = props.column.map((note, i) => {
        return <div key={i} className='note'>{note.toString()[0]}</div>
    }).reverse();

    const fakeNotes = props.column.map((note, i) => {
        if (note.toString().length > 1) {
            return <div key={i} className='note'>{note.toString()[1]}</div>
        } else {
            return <div key={i} className='note'>{EMPTY_NOTE_CHAR}</div>
        }
    }).reverse();

	return (
        <div className={props.selectedColumn === props.id ? 'columns selected' : 'columns'}>
		<div
			className='tab-column'
			onClick={() => setSelectedColumn(props.id)}
		>
            {notes}
		</div>
        <div
			className='tab-column'
			onClick={() => setSelectedColumn(props.id)}
		>
            {fakeNotes}
		</div>
        <div
			className='tab-column'
			onClick={() => setSelectedColumn(props.id)}
		>
            {EMPTY_COLUMN.map((note, i) => <div key={i} className='note'>{note}</div>)}
		</div>
        </div>
	);
};

export default TabColumn;
