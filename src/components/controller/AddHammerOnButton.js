import { useDispatch } from "react-redux";

const AddHammerOnButton = (props) => {
    const dispatch = useDispatch();

    const onClick = () => {
        dispatch({ type: 'tabMaker/setStringNote', payload: { guitarString: props.guitarString, value: 'h' } })
    }

    return (
        <div onClick={onClick}>
            h
        </div>
    )
}

export default AddHammerOnButton