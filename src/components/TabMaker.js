import { useEffect } from "react"
import { useDispatch } from "react-redux"
import Controller from "./controller/Controller"
import Fretboard from "./fretboard/Fretboard"
import Tab from "./tabs/Tab"

const TabMaker = () => {
    const dispatch = useDispatch();

    const keyHandler = e => {
      switch(e.keyCode) {
        case 39: { // ArrowRight
          dispatch({ type: 'tabMaker/moveSelectedColumn', payload: 1 });
          break;
        }
        
        case 37: { // ArrowLeft
          dispatch({ type: 'tabMaker/moveSelectedColumn', payload: -1 });
          break;
        }

        default:
          return;
      }

    }

    useEffect(() => {
      window.addEventListener("keyup", keyHandler, false);
    }, [])


    return (
      <div>
          <Tab />
          <Controller />
          <Fretboard />
      </div>
    )
}

export default TabMaker