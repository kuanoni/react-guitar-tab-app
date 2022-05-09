import { useDispatch } from 'react-redux';

const SelectSpacesDropdown = (props) => {
	const dispatch = useDispatch();

	const optionsElements = Array(5)
		.fill(0)
		.map((_, i) => {
			return (
				<option key={i + 1} value={i + 1}>
					{i + 1}
				</option>
			);
		});

	const onChange = (e) => {
		dispatch({ type: 'tabMaker/setSpaces', payload: parseInt(e.target.value) });
	};

	return (
		<>
			<label htmlFor='spaces'>Spaces: </label>
			<select className='spaces-selector' name='spaces' onChange={onChange} >
				{optionsElements}
			</select>
		</>
	);
};

export default SelectSpacesDropdown;
