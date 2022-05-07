import { useSelector } from 'react-redux';
import { LINE_BREAK_COLUMN, TUNINGS } from '../../../GUITAR';
import TabColumn from './TabColumn';
import ExportToTextButton from '../controller/ExportToTextButton';
import { objectsEqual } from '../../../store/tabMakerReducer/TabMakerSliceUtilities';
import './tab.scss';

const selectTablature = (state) => state.tabMaker.tablature;
const selectSelectedColumnIndex = (state) => state.tabMaker.selectedColumnIndex;
const selectTuning = (state) => state.tabMaker.tuning;
const selectSpaces = (state) => state.tabMaker.spaces;

const Tab = () => {
	const tablature = useSelector(selectTablature);
	const selectedColumnIndex = useSelector(selectSelectedColumnIndex);
	const tunings = useSelector(selectTuning);
	const spaces = useSelector(selectSpaces);

	const tuningsElement = (
		<div className='tunings'>
			<div></div>
			{tunings.map((tuning, i) => <div key={i}>{TUNINGS[tuning].slice(0, 1) + '|'}</div>).reverse()}
		</div>
	);

	const getTabLineColumns = (tab, previousLineLength) => {
		let columns = tab.map((column, i) => {
			return (
				<TabColumn
					key={i}
					id={i + previousLineLength}
					column={column}
					selectedColumn={selectedColumnIndex}
					tuning={tunings}
					spaces={spaces}
				/>
			);
		});

		return columns;
	};

	const getTabLines = () => {
		let tablatureLines = [];
		let _i = 0;

		// slice tablature into chunks, separated by line-break markers: %
		tablature.forEach((column, i) => {
			if (objectsEqual(column, LINE_BREAK_COLUMN)) {
				tablatureLines.push(tablature.slice(_i, i));
				_i = i + 1;
			}
		});
		tablatureLines.push(tablature.slice(_i, tablature.length));

		let previousLineLength = 0;
		return tablatureLines.map((line, i) => {
			const tabLineElement = (
				<div key={i} className='tab-line'>
					{tuningsElement}
					{getTabLineColumns(line, previousLineLength)}
				</div>
			);
			previousLineLength += line.length + 1;

			return tabLineElement;
		});
	};

	return (
		<>
			<div className='tab'>{getTabLines()}</div>
			<ExportToTextButton tablature={tablature} tunings={tunings} />
		</>
	);
};

export default Tab;
