import React from 'react';

var barData = require('../../data/realData.json');

require('./style.scss');

export default class EthnicChart extends React.Component {
	constructor() {
		super();
		this.chartData = [];
	}

	componentDidMount() {
	}

	closeChart(e) {
		this.props.setCloseButton();
	}

	render() {
		var district = 0;
		switch(this.props.selectedDistrict.feature.properties.NAME) {
			case 'Sindhupalchok':
				district = 0;
				break;
			case 'Dolakha':
				district = 1;
				break;
			case 'Nuwakot':
				district = 2;
				break;
			case 'Kavrepalanchok':
				district = 3;
				break;
		}
		function cleanData(data) {
			var raw = data.split('_');
			var output = '';
			raw.forEach(function(item) {
				item = item[0].toUpperCase() + item.slice(1);
				if(raw.length > 1) {
					output += item + ' ';
				} else {
					output = item;
				}
			})
			return output.trim();
		}
		var ethinicity = barData.district_wise[district].ethinicity;
		var total = 0;
		Object.keys(ethinicity).forEach(function(item) {
			total += ethinicity[item];
		});
		return(
			<div id="ethnic_chart" className="ethnic-chart">
				<a className="close-button" onClick={this.closeChart.bind(this)}>×</a>
				<div className="ethnic-chart-bar">
					<div className="actual-chart">
					{
						Object.keys(ethinicity).map(function(item, index) {
							var percent = Math.round((ethinicity[item] / 100) * 100);
							percent = percent < 5 ? 5 : percent;
							var barStyle = {
								width: percent + '%'
							};
							return(
								<div className="bars-and-label">
									<div className="label">{cleanData(item)}</div>
									<div className="bars">
										<div className="progress" style={barStyle}></div>
									</div>
								</div>
							);
						})
					}
					</div>
				</div>
			</div>
		);
	}
}
