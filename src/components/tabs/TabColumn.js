import { useDispatch } from "react-redux";

const TabColumn = (props) => {
    const dispatch = useDispatch();

    const setSelectedColumn = (columnId) => {
		dispatch({ type: 'tabMaker/changeSelectedColumn', payload: columnId });
	};

    const notes = props.column.map((note, i) => {
        if (note.toString().length > 1) {
            return <div key={i} className='double-digit'>{note}</div>
        } else {
            return <div key={i}>{note}</div>
        }
    }).reverse();

	return (
		<div
			className={props.selectedColumn === props.id ? 'tab-column selected' : 'tab-column'}
			onClick={() => setSelectedColumn(props.id)}
		>
        {notes}
		</div>
	);
};

export default TabColumn;
