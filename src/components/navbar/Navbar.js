import { useState } from 'react';
import { RiQuestionMark, RiCloseFill, RiVolumeMuteLine, RiVolumeUpLine } from 'react-icons/ri';
import ReactModal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import HelpModalContent from './modal/HelpModalContent';
import './navbar.scss';

const audioMutedSelector = (state) => state.tabMaker.audioMuted;

const Navbar = () => {
	const dispatch = useDispatch();
	const audioMuted = useSelector(audioMutedSelector);
	const [showModal, setShowModal] = useState(false);

	const handleCloseModal = (e) => {
		setShowModal(false);
	};

	const mute = () => {
		dispatch({ type: 'tabMaker/setAudioMuted', payload: !audioMuted });
	};

	return (
		<nav>
			<div className='logo'>Text Tabber</div>
			<div className='nav-buttons'>
				{audioMuted ? <RiVolumeMuteLine onClick={mute} /> : <RiVolumeUpLine onClick={mute} />}
				<RiQuestionMark onClick={() => setShowModal(true)} />
			</div>
			<ReactModal
				isOpen={showModal}
				contentLabel='onRequestClose Example'
				onRequestClose={handleCloseModal}
				shouldCloseOnOverlayClick={true}
				ariaHideApp={false}
				className='modal'
				overlayClassName='overlay'
			>
				<RiCloseFill onClick={handleCloseModal} className='modal-exit' />
				<HelpModalContent />
			</ReactModal>
		</nav>
	);
};

export default Navbar;
