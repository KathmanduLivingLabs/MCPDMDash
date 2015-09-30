import React from 'react';

var barData = require('../../data/realData.json');

require('./style.scss');

var dataConstants = {
	needs_met: 'Did not Require Additional Urgent Items',
	needs_unmet: 'Nedded Additional Urgent Items not Present in the Kit',
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
			labels: ['Food', 'Construction Material and Labour', 'Basic Household', 'Savings'],
			series: [[data[0][0], data[0][1], data[0][2]], 
							[, , , data[0][3]]]
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
					}, 'percent-text') .text(data.value[valueAxis]).text('%'));
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
		var chartPrioritiesSpending = new Chartist.Bar('.area-spending', this.chartPrioritiesData[0], options_2);
		var chartPrioritiesDebt1 = new Chartist.Bar('.have-received-debt', this.chartPrioritiesData[1], options_2);
		var chartPrioritiesDebt2 = new Chartist.Bar('.have-not-received-debt', this.chartPrioritiesData[2], options_2);

		this.makePercentCircles(chartPrioritiesSpending, 'y', 25, 5, false);
		this.makePercentCircles(chartPrioritiesDebt1, 'y', 18, 5, true);
		this.makePercentCircles(chartPrioritiesDebt2, 'y', 18, 5, true);
	}
	
	render() {
		this.setChartData(
			// no data for composite graph only data for single graph. ask nirab dai
			[[
				Number(barData.aggregate.area_of_spending[0]),
				Number(barData.aggregate.area_of_spending[1]),
				Number(barData.aggregate.area_of_spending[2]), 
				Number(barData.aggregate.area_of_spending[3])
			], [
				Math.round((Number(barData.district_wise[0][dataConstants.debt_taken]) /
				(Number(barData.district_wise[0][dataConstants.debt_taken]) + 
				 Number(barData.district_wise[0][dataConstants.debt_not_taken]))) * 10000) / 100,

				Math.round((Number(barData.district_wise[1][dataConstants.debt_taken]) /
				(Number(barData.district_wise[1][dataConstants.debt_taken]) + 
				 Number(barData.district_wise[1][dataConstants.debt_not_taken]))) * 10000) / 100,

				Math.round((Number(barData.district_wise[2][dataConstants.debt_taken]) /
				(Number(barData.district_wise[2][dataConstants.debt_taken]) + 
				 Number(barData.district_wise[2][dataConstants.debt_not_taken]))) * 10000) / 100,

				Math.round((Number(barData.district_wise[3][dataConstants.debt_taken]) /
				(Number(barData.district_wise[3][dataConstants.debt_taken]) + 
				 Number(barData.district_wise[3][dataConstants.debt_not_taken]))) * 10000) / 100,
			], [
				Math.round((Number(barData.district_wise[0][dataConstants.debt_not_taken]) /
				(Number(barData.district_wise[0][dataConstants.debt_taken]) + 
				 Number(barData.district_wise[0][dataConstants.debt_not_taken]))) * 10000) / 100,

				Math.round((Number(barData.district_wise[1][dataConstants.debt_not_taken]) /
				(Number(barData.district_wise[1][dataConstants.debt_taken]) + 
				 Number(barData.district_wise[1][dataConstants.debt_not_taken]))) * 10000) / 100,

				Math.round((Number(barData.district_wise[2][dataConstants.debt_not_taken]) /
				(Number(barData.district_wise[2][dataConstants.debt_taken]) + 
				 Number(barData.district_wise[2][dataConstants.debt_not_taken]))) * 10000) / 100,

				Math.round((Number(barData.district_wise[3][dataConstants.debt_not_taken]) /
				(Number(barData.district_wise[3][dataConstants.debt_taken]) + 
				 Number(barData.district_wise[3][dataConstants.debt_not_taken]))) * 10000) / 100,
			]]
		);
		return(
			<div className="priorities">
				<div className="area-spending">
					<span className="chart-title-spending">Top Three Area of Spending</span>
				</div>
					<span className="chart-title-debt">Recepients who have taken debt after the earthquake</span>
				<div className="debt">
					<div className="have-received-debt">
						<span className="chart-title-received-debt"></span>
					</div>
					
				</div>
			</div>
		);
	}
}
