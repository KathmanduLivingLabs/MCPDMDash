import React from 'react';

var barData = require('../../data/realData.json');

require('./style.scss');

const ETHNIC_GROUPS = ['Adibasi Janjati', 'Brahmin', 'Chhetri', 'Dalit', 'Madhesi', 'Other'];

export default class EthnicChart extends React.Component {
	constructor() {
		super();
		this.chartData = [];
	}

	closeChart(e) {
		this.props.setCloseButton(true);
		this.props.setEthinicAggregate(false);
	}

	render() {
		var title = '';
		if(this.props.ethinicAggregate)
			title = 'Aggregate Ethinic Distribution of All Districts';
		else
			title = 'Ethinic Distribution of ' + this.props.selectedDistrict.feature.properties.NAME;
			
		var district = 0;
		if(!this.props.ethinicAggregate) {
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
					<div className="chart-title">{title}</div>
					{
						(() => {
							var dom;
							if(this.props.ethinicAggregate) {
								var total = 0;
								barData.aggregate.ethinicity.map(function(item, index) {
									total += item;
								})
								dom = barData.aggregate.ethinicity.map(function(item, index) {
									var percent = (item / total) * 100;
									percent = Math.round(percent * 100) / 100;
									var displayPercent = percent;
									percent = percent < 5 ? percent === 0 ? 0 : 5 : percent;
									var barStyle = {
										width: percent + '%'
									};
									return(
										<div className="bars-and-label">
											<div className="label">{ETHNIC_GROUPS[index]}</div>
											<div className="bar-unit">({displayPercent}%)</div>
											<div className="bars">
												<div className="progress" style={barStyle}></div>
											</div>
										</div>
									);
								})
							} else {
								var total = 0;

								Object.keys(ethinicity).map(function(item, index) {
									total += ethinicity[item];
								});
								dom = Object.keys(ethinicity).map(function(item, index) {
									var percent = (ethinicity[item] / total) * 100;
									percent = Math.round(percent * 100) / 100;
									var displayPercent = percent;
									percent = percent < 5 ? percent === 0 ? 0 : 5 : percent;
									var barStyle = {
										width: percent + '%'
									};
									return(
										<div className="bars-and-label">
											<div className="label">{cleanData(item)}</div>
											<div className="bar-unit">({displayPercent}%)</div>
											<div className="bars">
												<div className="progress" style={barStyle}></div>
											</div>
										</div>
									);
								})
							}
							return dom;
						})()
					}
					</div>
				</div>
			</div>
		);
	}
}
