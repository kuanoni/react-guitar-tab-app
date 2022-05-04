import { useState } from 'react';
import { RiQuestionMark, RiCloseFill } from 'react-icons/ri';
import ReactModal from 'react-modal';
import HelpModalContent from './modal/HelpModalContent';
import './navbar.scss';

const Navbar = () => {
	const [showModal, setShowModal] = useState(false);

	const handleCloseModal = (e) => {
		setShowModal(false);
	};

	return (
		<nav>
			<div className='logo'>Text Tabber</div>
			<RiQuestionMark onClick={() => setShowModal(true)} />
			<ReactModal
				isOpen={showModal}
				contentLabel='onRequestClose Example'
				onRequestClose={handleCloseModal}
				shouldCloseOnOverlayClick={true}
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
