const CustomIcon = (props) => {
    const image = require('../../../icons/' + props.svgPath + '.svg')
	return <img className="icon" src={image} />;
};

export default CustomIcon;
