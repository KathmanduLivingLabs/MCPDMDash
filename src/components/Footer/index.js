import React from 'react';

require('./style.scss');

export default class Footer extends React.Component {
	render() {
		return(
			<div className="footer">
				<a href="http://www.kathmandulivinglabs.org" target="_blank">© Designed and Developed by Kathmandu Living Labs</a> CC-BY-SA
			</div>
		);
	}
}
