import Controller from "./controller/Controller"
import Fretboard from "./fretboard/Fretboard"
import Tab from "./tabs/Tab"

const TabMaker = () => {
    return (
      <div>
          <Tab />
          <Controller />
          <Fretboard />
      </div>
    )
}

export default TabMaker