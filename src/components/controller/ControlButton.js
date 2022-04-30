const ControlButton = (props) => {
	return (
		<div className={props.className ? 'control-button ' + props.className : 'control-button'} onClick={props.click}>
            <span className="tooltip">{props.buttonName}</span>
			{props.children}
		</div>
	);
};

export default ControlButton;
