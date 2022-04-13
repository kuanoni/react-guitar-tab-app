import { useSelector, useDispatch  } from 'react-redux';
import { TUNINGS } from '../../GUITAR';
import TabColumn from "./TabColumn";
import './tab.scss'

const selectTablature = state => state.tabMaker.tablature;
const selectSelectedColumn = state => state.tabMaker.selectedColumn;
const selectTuning = state => state.tabMaker.tuning;

const Tab = () => {
    const dispatch = useDispatch();
    const tablature = useSelector(selectTablature);
    const selectedColumn = useSelector(selectSelectedColumn);
    const tunings = useSelector(selectTuning);

    const setSelectedColumn = columnId => {
        dispatch({ type: 'tabMaker/changeSelectedColumn', payload: columnId })
    }

    const getTabColumns = () => {
        let columns = [];
        if (tablature) {
            for (let i = 0; i < tablature.length; i++) {
                columns.push(<TabColumn key={i} id={i} column={tablature[i]} selectedColumn={selectedColumn} setSelectedColumn={setSelectedColumn} tuning={tunings} />);
            }
        }
        return columns;
    }

    const tabColumns = getTabColumns();

    return (
        <div className="tab">
            <div className="tunings">
                { tunings.map((tuning, i) => <div key={i}>{TUNINGS[tuning].slice(0, 1) + '|'}</div>).reverse() }
            </div>
            { tabColumns }
        </div>
    )
}

export default Tab