import { useState } from 'react';
import { RiQuestionMark, RiCloseFill } from 'react-icons/ri';
import ReactModal from 'react-modal';
import './navbar.scss';

const Navbar = () => {
	const [showModal, setShowModal] = useState(false);

	return (
		<nav>
			<div className='logo'>Text Tabber</div>
			<RiQuestionMark onClick={() => setShowModal(true)} />
			<ReactModal
				isOpen={showModal}
				contentLabel='onRequestClose Example'
				shouldCloseOnOverlayClick={true}
                className='modal'
                overlayClassName='overlay'
			>
            <RiCloseFill onClick={() => setShowModal(false)} className='modal-exit' />
				reeeee
			</ReactModal>
		</nav>
	);
};

export default Navbar;
