import React from 'react';

var barData = require('../../data/realData.json');

require('./style.scss');

export default class EthnicChart extends React.Component {
	constructor() {
		this.chartData = [];
	}

	closeChart(e) {
		document.getElementById("ethnic_chart").style.display = 'none';
	}

	render() {
		return(
			<div id="ethnic_chart" className="ethnic-chart">
				<a className="close-button" onClick={this.closeChart}>×</a>
				<div className="ethnic-chart-bar"></div>
			</div>
		);
	}
}
