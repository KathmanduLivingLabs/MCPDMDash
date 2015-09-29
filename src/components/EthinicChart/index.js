import React from 'react';

var barData = require('../../data/realData.json');

require('./style.scss');

export default class EthinicChart extends React.Component {
	constructor() {
		super();
		this.chartData = [];
		this.state = {
			ageOrEthinicity: true
		};
	}

	setAgeOrEthinicity(status) {
		this.setState({
			ageOrEthinicity: status
		});
	}

	render() {
		console.log('hello');
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
			
		var title = this.props.title + ' ' + this.props.selectedDistrict.feature.properties.NAME;
		var chartType = barData.district_wise[district][this.props.chartType];
		console.log(this.props.chartType);
		return(
				<div className="actual-chart">
					<div className="chart-title">{title}</div>
					{
						(() => {
								var dom;
								var total = 0;

								Object.keys(chartType).map(function(item, index) {
									total += chartType[item];
								});
								dom = Object.keys(chartType).map(function(item, index) {
									var percent = (chartType[item] / total) * 100;
									percent = Math.round(percent * 100) / 100;
									var displayPercent = percent;
									percent = percent < 5 ? percent === 0 ? 0 : 5 : percent;
									var barStyle = {
										width: percent + '%'
									};
									return(
										<div className="bars-and-label">
											<div className="label">{item}</div>
											<div className="bar-unit">({displayPercent}%)</div>
											<div className="bars">
												<div className="progress" style={barStyle}></div>
											</div>
										</div>
									);
								})

							return({dom})
						})()
					}
				</div>
		);
	}
}
