import { useState } from 'react';
import { RiQuestionMark, RiCloseFill } from 'react-icons/ri';
import ReactModal from 'react-modal';
import './navbar.scss';

const Navbar = () => {
	const [showModal, setShowModal] = useState(false);

    const handleCloseModal = e => {
        setShowModal(false);
    }

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
                <h1>Help</h1>
                <div className="divider"></div>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur reiciendis inventore adipisci placeat maiores. Optio molestiae distinctio vero placeat dolores adipisci architecto cum consectetur facere, natus ratione sit dolor amet repellat ipsum aut, blanditiis maxime magnam nulla incidunt, ex iusto.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae sunt cumque obcaecati dicta dolore veritatis deleniti itaque iusto, unde voluptatum quidem, corrupti repudiandae in est velit excepturi temporibus, illum mollitia! Labore a tenetur vel dolorem consectetur magnam, dolore repellendus cumque excepturi nostrum in ipsam magni architecto temporibus aliquid ab? Debitis?</p>
                <h1>Keybindings</h1>
                <div className="divider"></div>
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
							<div className='key'>Ctrl</div> + <div className='key'>Z</div>
						</div>
						<div className='keybinding-text'>Undo</div>
					</div>
				</div>
                <h1>Changes</h1>
                <div className="divider"></div>
			</ReactModal>
		</nav>
	);
};

export default Navbar;
