import React from 'react';

var barData = require('../../data/realData.json');

require('./style.scss');

var dataConstants = {
	needs_met: 'Did not Require Additional Urgent Items',
	needs_unmet: 'Nedded Additional Urgent Items not Present in the Kit',
	debt_taken: 'Debt Taken Due to Earthquake',
	debt_not_taken: 'No Debt Due to Earthquake'
};

export default class Others extends React.Component {
	constructor() {
		super();
		this.chartPrioritiesData = [];
		this.state = {
			chartPrioritiesData: []
		};
	}

	componentDidMount() {
		this.makeChart();
	}

	componentDidUpdate() {
		this.makeChart();
	}
	
	setChartData(data) {
		this.chartPrioritiesData[0] = {
			labels: ['Relative and Friends', 'Government', 'Private Sector', 'NGO’s'],
			series: [data[0]], 
		};
		this.chartPrioritiesData[1] = {
			labels: ['One Hour or Less', '1 to 2 Hours', '2 to 3 Hours', 
				'3 to 4 Hours', 'More Than 4 Hours', 'Time Unknown'],
			series: [data[1]]
		};
	}

	makePercentCircles(chart, valueAxis, textMarginX, textMarginY, horizBar) {
		chart.on('draw', function(data) {
			if(data.type === 'bar') {
					if(horizBar === false) {
					data.group.append(new Chartist.Svg('circle', {
						cx: data.x2,
						cy: data.y2,
						r: 25
					}, 'percent-circle'));
					data.group.append(new Chartist.Svg('text', {
						x: data.x2 - textMarginX,
						y: data.y2 - textMarginY,
					}, 'percent-text').text(data.value[valueAxis]).text('%'));
				}
				if(horizBar === true) {
					data.group.append(new Chartist.Svg('circle', {
						cx: data.x2,
						cy: data.y2,
						r: 25
					}, 'percent-circle'));
					data.group.append(new Chartist.Svg('text', {
						x: data.x2 - textMarginX,
						y: data.y2 - textMarginY,
					}, 'percent-text') .text(data.value[valueAxis]));
				}
			}
		});
	}

	makeChart() {
		var options_1 = {
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
			seriesBarDistance: 25
		};
		var options_2 = {
			axisX: {
				showGrid: false,
			},
			axisY: {
				showGrid: false,
				showLabel: false,
				offset: 100
			},
			high: 60,
		};
		var chartPrioritiesSpending = new Chartist.Bar('.area-spending', this.chartPrioritiesData[0], options_2);
		var chartPrioritiesDebt1 = new Chartist.Bar('.distance', this.chartPrioritiesData[1], options_2);

		this.makePercentCircles(chartPrioritiesSpending, 'y', 25, 5, false);
		this.makePercentCircles(chartPrioritiesDebt1, 'y', 13, 5, true);
	}
	
	render() {
		var total = 808;
		this.setChartData(
			// no data for composite graph only data for single graph. ask nirab dai
			[[
				Math.round((Number(barData.aggregate.cash[0]) / total) * 10000) / 100,
				Math.round((Number(barData.aggregate.cash[1]) / total) * 10000) / 100,
				Math.round((Number(barData.aggregate.cash[2]) / total) * 10000) / 100,
				Math.round((Number(barData.aggregate.cash[3]) / total) * 10000) / 100,
			], [
				Number(barData.aggregate.distance[0]),
				Number(barData.aggregate.distance[1]),
				Number(barData.aggregate.distance[2]),
				Number(barData.aggregate.distance[3]),
				Number(barData.aggregate.distance[4]),
				Number(barData.aggregate.distance[5])
			]]
		);
		return(
			<div className="priorities">
				<div className="area-spending">
					<span className="chart-title-spending">Respondents received cash from these sectors</span>
				</div>
				<div className="distance">
					<span className="chart-title-spending">Number of respondents who had to travel to the distribution point</span>
				</div>
			</div>
		);
	}
}
