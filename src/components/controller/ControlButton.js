const ControlButton = (props) => {
	return (
		<div className='control-button' onClick={props.click}>
            <span className="tooltip">{props.buttonName}</span>
			{props.children}
		</div>
	);
};

export default ControlButton;
