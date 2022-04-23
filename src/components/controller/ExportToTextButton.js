import { TUNINGS } from '../../GUITAR';

const ExportToTextButton = (props) => {

	const onClick = () => {
        navigator.clipboard.writeText(makeTextTablature(props.tablature, props.tunings));
	};

    const containsLetter = (note) => {
		return /[a-z]/i.test(note);
	};

    const makeTextTablature = (tablature, tunings) => {
        let guitarStrings = [[],[],[],[],[],[]];

        tablature.forEach(column => {
            column.forEach((note, i) => {
                if (containsLetter(note)) {
                    if (note.length > 2) {
                        guitarStrings[i].push(note);
                    } else {
                        guitarStrings[i].push('-' + note);
                    }
                } else {
                    if (note.toString().length > 1) {
                        guitarStrings[i].push(note + '-');
                    } else {
                        guitarStrings[i].push(note + '--');
                    }
                }

            });
        });

        let tabString = '';
        let tuningsRev = tunings.reverse();

        guitarStrings.reverse().forEach((str, i) => {
            tabString += TUNINGS[tuningsRev[i]] + '|' + str.join('') + '\n';
        })

        return tabString;
    }

	return <div className='copy-tab' onClick={onClick}>Copy tab to clipboard</div>;
};

export default ExportToTextButton;
