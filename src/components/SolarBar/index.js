import React from 'react';

//var barData = require('../../data/mockData.json');
var barData = require('../../data/realData.json');

require('./style.scss');

var viewConstants = {
	survey: 'survey_completion',
	needs: 'needs_fullfilled',
	solar: 'solar_lamp_impact',
	priorities : 'priorities_for_spending'
};

var dataConstants = {
	needs_met: 'needs_met',
	needs_unmet: 'needs_unmet',
	debt_taken: 'Debt Taken Due to Earthquake',
	debt_not_taken: 'No Debt Due to Earthquake'
};

export default class SolarBar extends React.Component {
	constructor() {
		super();
		this.chartNeedsData = [];
		this.chartSolarData = [];
		this.chartPrioritiesData = [];
		this.state = {
			chartNeedsData: [],
			chartSolarData: [],
			chartPrioritiesData: []
		};
	}

	componentDidMount() {
		this.makeChart();
	}

	componentDidUpdate() {
		this.makeChart();
	}

	setChartSolarData(chartSolarData) {
		var temp = [].concat(chartSolarData);
		this.setState({
			chartSolarData: temp
		});
	}

	setChartData(data) {
		this.chartSolarData[0] = {
			labels: ['Daily', 'Frequently', 'Seldom', 'Never', 'Did not receive a solar lamp'],
			series: [data[0]]
		};
		this.chartSolarData[1] = {
			labels: ['They feel more secure', 'It\'s easier for childern to study',
							'They spend less money on charging'],
			series: [data[1]]
		};
	}

	makePercentCircles(chart, valueAxis, textMarginX, textMarginY, horizBar) {
		chart.on('draw', function(data) {
			if(data.type === 'bar') {
				data.group.append(new Chartist.Svg('circle', {
					cx: data.x2,
					cy: data.y2,
					r: 25
				}, 'percent-circle'));
				data.group.append(new Chartist.Svg('text', {
					x: data.x2 - textMarginX,
					y: data.y2 - textMarginY,
				}, 'percent-text').attr({transform:'rotate(90 ' + data.x2 + ' ' + data.y2 + ')'})
							.text(data.value[valueAxis]).text('%'));
			}
		});
	}

	makeChart() {
		var options = {
			axisX: {
				showGrid: false,
				showLabel: false
			},
			axisY: {
				showGrid: false,
				offset: 100,
			},
			horizontalBars: true,
			reverseData: true,
		};
		var chartSolarFrequency = new Chartist.Bar('.frequency', this.chartSolarData[0], options);
		var chartSolarUtility = new Chartist.Bar('.utility', this.chartSolarData[1], options);
		this.makePercentCircles(chartSolarFrequency, 'x', 15, 3, true);
		this.makePercentCircles(chartSolarUtility, 'x', 15, 3, true);
	}
	
	render() {
		var totalFreq = 
				Number(barData.aggregate.frequency[0]) +
				Number(barData.aggregate.frequency[1]) +
				Number(barData.aggregate.frequency[2]) +
				Number(barData.aggregate.frequency[3]) +
				Number(barData.aggregate.frequency[4]);
		var totalUtil = 
				Number(barData.aggregate.utility[0]) +
				Number(barData.aggregate.utility[1]) +
				Number(barData.aggregate.utility[2]);

		this.setChartData(
			[[
				Math.round((Number(barData.aggregate.frequency[0]) / totalFreq) * 100),
				Math.round((Number(barData.aggregate.frequency[1]) / totalFreq) * 100),
				Math.round((Number(barData.aggregate.frequency[2]) / totalFreq) * 100),
				Math.round((Number(barData.aggregate.frequency[3]) / totalFreq) * 100),
				Math.round((Number(barData.aggregate.frequency[4]) / totalFreq) * 100),
			], [
				Math.round((Number(barData.aggregate.utility[0]) / totalUtil) * 100),
				Math.round((Number(barData.aggregate.utility[1]) / totalUtil) * 100),
				Math.round((Number(barData.aggregate.utility[2]) / totalUtil) * 100),
			]]
		);
		return(
			<div className="solar-impact">
				<div className="frequency">
					<span className="chart-title-solar">How often do you use the solar lamp?</span>
				</div>
				<div className="utility">
					<span className="chart-title-solar">Since using solar lamp</span>
				</div>
			</div>
		);
	}
}
