import { useDispatch } from "react-redux";

const ChangeToDivider = () => {
    const dispatch = useDispatch();

    const onClick = () => {
        dispatch({ type: 'tabMaker/changeColumnToDivider' })
    }

    return (
        <div onClick={onClick}>
            ChangeToDivider
        </div>
    )
}

export default ChangeToDivider