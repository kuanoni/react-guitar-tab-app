import { useSelector } from 'react-redux';
import FretboardString from './FretboardString';
import './fretboard.scss';

const selectTuning = (state) => state.tabMaker.tuning;

const Fretboard = () => {
	const tuning = useSelector(selectTuning);

	return (
		<div className='fretboard-wrapper'>
			<div className='fretboard'>
				<div className='fretboard-labels'>
					<span className='first'></span>
					{[...Array(26).keys()].map((i) => (
						<span key={i}>{i}</span>
					))}
				</div>
				<FretboardString guitarString={5} stringTuning={tuning[5]} />
				<FretboardString guitarString={4} stringTuning={tuning[4]} />
				<FretboardString guitarString={3} stringTuning={tuning[3]} />
				<FretboardString guitarString={2} stringTuning={tuning[2]} />
				<FretboardString guitarString={1} stringTuning={tuning[1]} />
				<FretboardString guitarString={0} stringTuning={tuning[0]} />
			</div>
		</div>
	);
};

export default Fretboard;
