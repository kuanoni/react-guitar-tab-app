const TabColumn = (props) => {
    return (
        <div className={props.selectedColumn === props.id ? 'tab-column selected' : 'tab-column'} onClick={() => props.setSelectedColumn(props.id)}>
            <div>{props.column[5]}</div>
            <div>{props.column[4]}</div>
            <div>{props.column[3]}</div>
            <div>{props.column[2]}</div>
            <div>{props.column[1]}</div>
            <div>{props.column[0]}</div>
        </div>
    )
}

export default TabColumn