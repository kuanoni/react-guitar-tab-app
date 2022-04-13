import { useDispatch, useSelector } from "react-redux";

const selectedColumnSelector = state => state.tabMaker.selectedColumn;

const MoveSelectionRightButton = () => {
    const dispatch = useDispatch();
    const selectedColumn = useSelector(selectedColumnSelector);

    const onClick = () => {
        dispatch({ type: 'tabMaker/changeSelectedColumn', payload: selectedColumn + 1 })
    }

    return (
        <div onClick={onClick}>
            MoveRight
        </div>
    )
}

export default MoveSelectionRightButton