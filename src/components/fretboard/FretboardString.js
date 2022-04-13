import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { TUNINGS } from "../../GUITAR";
import AddHammerOnButton from "../controller/AddHammerOnButton";
import FretButton from "./FretButton";

const selectTuning = state => state.tabMaker.tuning;

const FretboardString = (props) => {
    const dispatch = useDispatch();
    const tunings = useSelector(selectTuning);

    const changeStringTuning = e => {
        dispatch({ type: 'tabMaker/changeStringTuning', payload: { 
            guitarString: props.guitarString, tuning: parseInt(e.target.value) 
        }});
    }

    useEffect(() => {
    }, [tunings[props.guitarString]])

    const stringTuningOptions = [...Array(84).keys()].map(num => {
        return <option key={num} value={num}>{TUNINGS[num]}</option>
    })

    const fretNotes = [...Array(26).keys()].map(num => {
        return num + tunings[props.guitarString];
    })
    
    return (
        <div className="fretboard-string">
            <select defaultValue={tunings[props.guitarString]} onChange={changeStringTuning}>
                {stringTuningOptions}
            </select>
            {fretNotes.map((fret, i) => {
                return <FretButton key={fret} fretNum={i} fretNote={fret} guitarString={props.guitarString} />
            })}
            <AddHammerOnButton guitarString={props.guitarString}/>
        </div>
    )
}

export default FretboardString