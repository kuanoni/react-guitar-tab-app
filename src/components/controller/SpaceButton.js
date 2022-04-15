import { useDispatch } from "react-redux";

const SpaceButton = () => {
    const dispatch = useDispatch();

    const onClick = () => {
        dispatch({ type: 'tabMaker/addSpaceColumns'})
    }

    return (
        <div onClick={onClick}>
            SpaceButton
        </div>
    )
}

export default SpaceButton