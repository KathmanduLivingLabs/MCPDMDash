import React from 'react';

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

export default class PrioritiesBar extends React.Component {
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
			labels: ['Food', 'Construction Material and Labour', 'Basic Household'],
			series: [
				[data[0][0][0], data[0][1][0], data[0][2][0]],
				[data[0][0][1], data[0][1][1], data[0][2][1]]
			]
		};
		this.chartPrioritiesData[1] = {
			labels: ['Sindhupalchok', 'Dolakha', 'Nuwakot', 'Kavre'],
			series: [data[1]]
		};
		this.chartPrioritiesData[2] = {
			labels: ['Sindhupalchok', 'Dolakha', 'Nuwakot', 'Kavre'],
			series: [data[2]]
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
					}, 'percent-text').text(data.value[valueAxis]));
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
					}, 'percent-text').attr({transform:'rotate(90 ' + data.x2 + ' ' + data.y2 + ')'}).text(data.value[valueAxis]));
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
		};
		var chartPrioritiesSpending = new Chartist.Bar('.area-spending', this.chartPrioritiesData[0], options_1);
		var chartPrioritiesDebt1 = new Chartist.Bar('.have-received-debt', this.chartPrioritiesData[1], options_2);
		var chartPrioritiesDebt2 = new Chartist.Bar('.have-not-received-debt', this.chartPrioritiesData[2], options_2);

		this.makePercentCircles(chartPrioritiesSpending, 'x', 10, 3, true);
		this.makePercentCircles(chartPrioritiesDebt1, 'y', 8, 5, false);
		this.makePercentCircles(chartPrioritiesDebt2, 'y', 8, 5, false);
	}
	
	render() {
		this.setChartData(
			// no data for composite graph only data for single graph. ask nirab dai
			[[
				[Number(barData.district_wise[0].needs_met), Number(barData.district_wise[1].needs_met)],
				[Number(barData.district_wise[1].needs_met), Number(barData.district_wise[2].needs_met)],
				[Number(barData.district_wise[2].needs_met), Number(barData.district_wise[0].needs_met)],
			], [
				Number(barData.district_wise[0][dataConstants.debt_taken]),
				Number(barData.district_wise[1][dataConstants.debt_taken]),
				Number(barData.district_wise[2][dataConstants.debt_taken]),
				Number(barData.district_wise[3][dataConstants.debt_taken])
			], [
				Number(barData.district_wise[0][dataConstants.debt_not_taken]),
				Number(barData.district_wise[1][dataConstants.debt_not_taken]),
				Number(barData.district_wise[2][dataConstants.debt_not_taken]),
				Number(barData.district_wise[3][dataConstants.debt_not_taken])
			]]
		);
		return(
			<div className="priorities">
				<div className="area-spending">
					<span className="chart-title-solar">Top Three Area of Spending</span>
				</div>
					<span className="chart-title-debt">Have the receipients taken any debt?</span>
				<div className="debt">
					<div className="have-received-debt">
						<span className="chart-title-needs">Percentage of Needs Met</span>
					</div>
					<div className="vertical-line"></div>
					<div className="have-not-received-debt">
						<span className="chart-title-needs">Percentage of Needs Met</span>
					</div>
				</div>
			</div>
		);
	}
}
