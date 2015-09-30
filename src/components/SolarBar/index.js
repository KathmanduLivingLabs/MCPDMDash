import React from 'react';

//var barData = require('../../data/mockData.json');
var barData = require('../../data/realData.json');

require('./style.scss');

export default class SolarBar extends React.Component {
	constructor() {
		super();
		this.chartSolarData = [];
		this.state = {
			chartSolarData: [],
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
			labels: ['Strongly Agree', 'Agree'],
			series: [data[1]]
		};
		this.chartSolarData[2] = {
			labels: ['Strongly Agree', 'Agree', 'Neutral', 'Disagree', 'N/A'],
			series: [data[2]]
		};
		this.chartSolarData[3] = {
			labels: ['Strongly Agree', 'Agree', 'Neutral', 'Disagree'],
			series: [data[3]]
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
		var chartSolarUtility_secure = new Chartist.Bar('.utility_secure', this.chartSolarData[1], options);
		var chartSolarUtility_children = new Chartist.Bar('.utility_children', this.chartSolarData[2], options);
		var chartSolarUtility_money = new Chartist.Bar('.utility_money', this.chartSolarData[3], options);
		this.makePercentCircles(chartSolarFrequency, 'x', 15, 3, true);
		this.makePercentCircles(chartSolarUtility_secure, 'x', 15, 3, true);
		this.makePercentCircles(chartSolarUtility_children, 'x', 15, 3, true);
		this.makePercentCircles(chartSolarUtility_money, 'x', 15, 3, true);
	}
	
	render() {
		var totalFreq = 
				Number(barData.aggregate.frequency[0]) +
				Number(barData.aggregate.frequency[1]) +
				Number(barData.aggregate.frequency[2]) +
				Number(barData.aggregate.frequency[3]) +
				Number(barData.aggregate.frequency[4]);
		var totalUtil_secure = 
				Number(barData.aggregate.utility_secure[0]) +
				Number(barData.aggregate.utility_secure[1]);
		var totalUtil_children = 
				Number(barData.aggregate.utility_children[0]) +
				Number(barData.aggregate.utility_children[1]) +
				Number(barData.aggregate.utility_children[2]) +
				Number(barData.aggregate.utility_children[3]) +
				Number(barData.aggregate.utility_children[4]);
		var totalUtil_money = 
				Number(barData.aggregate.utility_money[0]) +
				Number(barData.aggregate.utility_money[1]) +
				Number(barData.aggregate.utility_money[2]) +
				Number(barData.aggregate.utility_money[3]);

		this.setChartData(
			[[
				Math.round((Number(barData.aggregate.frequency[0]) / totalFreq) * 100),
				Math.round((Number(barData.aggregate.frequency[1]) / totalFreq) * 100),
				Math.round((Number(barData.aggregate.frequency[2]) / totalFreq) * 100),
				Math.round((Number(barData.aggregate.frequency[3]) / totalFreq) * 100),
				Math.round((Number(barData.aggregate.frequency[4]) / totalFreq) * 100),
			], [
				Math.round((Number(barData.aggregate.utility_secure[0]) / totalUtil_secure) * 100),
				Math.round((Number(barData.aggregate.utility_secure[1]) / totalUtil_secure) * 100),
			], [
				Math.round((Number(barData.aggregate.utility_children[0]) / totalUtil_children) * 100),
				Math.round((Number(barData.aggregate.utility_children[1]) / totalUtil_children) * 100),
				Math.round((Number(barData.aggregate.utility_children[2]) / totalUtil_children) * 100),
				Math.round((Number(barData.aggregate.utility_children[3]) / totalUtil_children) * 100),
				Math.round((Number(barData.aggregate.utility_children[4]) / totalUtil_children) * 100),
			], [
				Math.round((Number(barData.aggregate.utility_money[0]) / totalUtil_money) * 100),
				Math.round((Number(barData.aggregate.utility_money[1]) / totalUtil_money) * 100),
				Math.round((Number(barData.aggregate.utility_money[2]) / totalUtil_money) * 100),
				Math.round((Number(barData.aggregate.utility_money[3]) / totalUtil_money) * 100),
			]]
		);
		return(
			<div className="solar-impact">
				<div className="frequency">
					<span className="chart-title-solar">How frequently the respondents used solar lamps</span>
				</div>
				<div className="utility utility_secure">
					<span className="chart-title-solar">
						Since receiving the solar lamps, they feel more secure at night
					</span>
				</div>
				<div className="utility utility_children">
					<span className="chart-title-solar">
						Solar lamps help their children study
					</span>
				</div>
				<div className="utility utility_money">
					<span className="chart-title-solar">
						Solar lamps help them save money on electricity
					</span>
				</div>
			</div>
		);
	}
}
