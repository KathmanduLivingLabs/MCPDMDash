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
		console.log(data[0][0].length);
		console.log(data[0][0].slice(15, 30));
		console.log('dootototo');
		this.chartPrioritiesData[0] = {
			labels: ['Shelter', 'Labour', 'Food', 'Medical', 'Paying Debts', 'Agriculture Inputs',
					'Clothing', 'Education', 'Basic Household', 'Large Household', 'Transport', 'Giving Loan',
					'Family Business', 'Hygiene', 'Savings'],
			series: [data[0][0].slice(0, 15), data[0][0].slice(15, 30)]
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
				showGrid: true,
				showLabel: true,
				offset: 100
			},
		};
		var chartPrioritiesSpending = new Chartist.Bar('.area-spending', this.chartPrioritiesData[0], options_2);
		var chartPrioritiesDebt1 = new Chartist.Bar('.have-received-debt', this.chartPrioritiesData[1], options_2);
		var chartPrioritiesDebt2 = new Chartist.Bar('.have-not-received-debt', this.chartPrioritiesData[2], options_2);

		//this.makePercentCircles(chartPrioritiesSpending, 'y', 25, 5, false);
		this.makePercentCircles(chartPrioritiesDebt1, 'y', 18, 5, true);
		this.makePercentCircles(chartPrioritiesDebt2, 'y', 18, 5, true);
	}
	
	render() {
		this.setChartData(
			// no data for composite graph only data for single graph. ask nirab dai
			[[
				(() => {
					var obj = [];
					for(var i = 0; i < 30; i++)
						obj.push(Number(barData.aggregate.area_of_spending[i]));
					return obj;
				})()
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
					<div className="legend">
						<div className="first">
							<div className="first-icon"></div>
							<div className="first-label">Cash Spent %</div>
						</div>
						<div className="second">
							<div className="second-icon"></div>
							<div className="second-label">Remaining Areas of Spending %</div>
						</div>
					</div>
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
