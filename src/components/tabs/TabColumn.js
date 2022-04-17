import { useDispatch } from "react-redux";

const TabColumn = (props) => {
    const dispatch = useDispatch();

    const setSelectedColumn = (columnId) => {
		dispatch({ type: 'tabMaker/changeSelectedColumn', payload: columnId });
	};

    // console.log(props.selectedColumn, props.id);

	return (
		<div
			className={props.selectedColumn === props.id ? 'tab-column selected' : 'tab-column'}
			onClick={() => setSelectedColumn(props.id)}
		>
			<div>{props.column[5]}</div>
			<div>{props.column[4]}</div>
			<div>{props.column[3]}</div>
			<div>{props.column[2]}</div>
			<div>{props.column[1]}</div>
			<div>{props.column[0]}</div>
		</div>
	);
};

export default TabColumn;
