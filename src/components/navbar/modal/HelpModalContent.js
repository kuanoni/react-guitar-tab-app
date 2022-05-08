import modifiersExample from './imgs/modifiers_example.gif';
import chordsExample from './imgs/chords.png';
import tuningsExample from './imgs/tunings.png';
import './modal.scss';

const HelpModalContent = () => {
	return (
		<div className='modal-content'>
			<h1>Help</h1>
			<div className='divider-horizontal'></div>
			<div className='help-content'>
				<ul>
					<li className='tip'>
						Click on a fret on the fretboard and it will add the corresponding note to the selected column
						in the tablature.
						<ul>
							<li>Holding <b>SHIFT</b> will allow you to enter multiple notes into the same column.</li>
						</ul>
					</li>
                    <li className='tip'>The left side of the fretboard allows you to change the tunings of each string.</li>
                    <img src={tuningsExample} alt='tunings selectors' />
                    <li className='tip'>
                        Select a chord with the dropdown and place it by clicking the button next to it.
                        <ul>
                            <li>Add the selected column to the list by giving it a name and saving it.</li>
                        </ul>
                    </li>
                    <img src={chordsExample} alt='chord selection dropdown and chord name input' />
                    <li className='tip'>Modifiers like palm muting, which will appear above the notes in your tablature, can be added by clicking the PM button. Click the PM button to start the modifier on the selected column, then select a different column and click it again.</li>
				    <img src={modifiersExample} alt='gif showing how to add palm muting' />
				</ul>
			</div>

			<h1>Keybindings</h1>
			<div className='divider-horizontal'></div>
			<div className='keybindings'>
				<div className='keybinding'>
					<div className='key'>A</div>
					<div className='keybinding-text'>Move selection left</div>
				</div>
				<div className='keybinding'>
					<div className='key'>D</div>
					<div className='keybinding-text'>Move selection right</div>
				</div>
				<div className='keybinding'>
					<div>
						<div className='key'>Shift</div> + <div className='key'>{'<'}</div> /{' '}
						<div className='key'>A</div>
					</div>
					<div className='keybinding-text'>Transpose Down</div>
				</div>
				<div className='keybinding'>
					<div>
						<div className='key'>Shift</div> + <div className='key'>{'>'}</div> /{' '}
						<div className='key'>D</div>
					</div>
					<div className='keybinding-text'>Transpose Up</div>
				</div>
				<div className='keybinding'>
					<div>
						<div className='key'>Shift</div> + <div className='key'>W</div>
					</div>
					<div className='keybinding-text'>Shift notes up</div>
				</div>
				<div className='keybinding'>
					<div>
						<div className='key'>Shift</div> + <div className='key'>S</div>
					</div>
					<div className='keybinding-text'>Shift notes down</div>
				</div>
				<div className='keybinding'>
					<div className='key'>Space</div>
					<div className='keybinding-text'>Add space</div>
				</div>
				<div className='keybinding'>
					<div className='key'>Enter</div>
					<div className='keybinding-text'>New line</div>
				</div>
				<div className='keybinding'>
					<div>
						<div className='key'>Ctrl</div> + <div className='key'>C</div>
					</div>
					<div className='keybinding-text'>Copy selection</div>
				</div>
				<div className='keybinding'>
					<div>
						<div className='key'>Ctrl</div> + <div className='key'>V</div>
					</div>
					<div className='keybinding-text'>Paste</div>
				</div>
				<div className='keybinding'>
					<div>
						<div className='key'>Ctrl</div> + <div className='key'>Z</div>
					</div>
					<div className='keybinding-text'>Undo</div>
				</div>
			</div>
			{/* <h1>Changes</h1>
			<div className='divider-horizontal'></div>
			<div className='changes-content'>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Id enim repudiandae deleniti sed numquam
				debitis, quos tempora, ea quis blanditiis distinctio. Sunt error sint ipsum quisquam, fuga, repellat
				fugiat consectetur numquam veritatis, soluta nostrum adipisci. In, odio perspiciatis quasi delectus
				corrupti provident fugiat rerum, ullam alias nihil quod ducimus maiores natus? Iusto blanditiis neque ut
				recusandae obcaecati ullam eius voluptates soluta provident laboriosam adipisci pariatur, quibusdam
				fugiat quidem corporis, deleniti laborum placeat est facere. Repellendus autem similique distinctio
				atque? Quam, necessitatibus modi officia beatae itaque eos temporibus ipsum, enim repudiandae mollitia,
				aperiam animi illum velit. Voluptates non rerum facilis qui? Lorem ipsum, dolor sit amet consectetur
				adipisicing elit. Sit, sequi officiis excepturi at repellat debitis suscipit maxime modi architecto
				eligendi repellendus aliquid esse quo blanditiis mollitia dolorem aspernatur veniam? At repellendus vel
				ab ipsa rerum, facilis dolore quibusdam earum ducimus tempora nulla nemo omnis aliquam doloribus
				repudiandae soluta. Recusandae omnis officiis temporibus excepturi, laudantium tempore accusamus aut,
				fuga harum voluptatem culpa earum consequatur et saepe. Id sequi modi quo ad quibusdam impedit ipsa
				ducimus nihil, doloremque voluptatibus laboriosam animi ullam? Consequuntur odio natus quam maxime
				repellendus? Rerum, neque aspernatur. Rerum libero quisquam numquam molestiae quasi reprehenderit illo
				quas autem enim, necessitatibus molestias modi distinctio repellat officia iure recusandae eius
				exercitationem maiores reiciendis aliquid est tenetur facilis! Expedita ratione harum consectetur facere
				ut cumque unde aliquid ducimus quod sit dicta similique non dolorum sint magnam illum facilis impedit
				architecto asperiores, perferendis optio? Voluptates necessitatibus assumenda quaerat repudiandae ad
				adipisci, debitis numquam, provident distinctio cum hic rerum eius doloribus, dolore corporis
				perspiciatis ea omnis ratione dolorem quasi voluptatibus architecto cupiditate quam! Magni officia sit,
				quo dolorem voluptatum aliquid nemo ea cupiditate amet ut voluptatem cum excepturi, consectetur delectus
				tenetur eveniet deleniti id! Porro ea similique voluptatum eius quisquam incidunt dolorem ratione
				quibusdam.
			</div> */}
		</div>
	);
};

export default HelpModalContent;
