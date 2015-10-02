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
	needs_met: 'Did not Require Additional Urgent Items',
	needs_unmet: 'Nedded Additional Urgent Items not Present in the Kit',
	debt_taken: 'Debt Taken Due to Earthquake',
	debt_not_taken: 'No Debt Due to Earthquake'
};

export default class NeedsBar extends React.Component {
	constructor() {
		super();
		this.chartNeedsData = [];
		this.state = {
			chartNeedsData: [],
		}
	}

	componentDidMount() {
		this.makeChart();
	}

	componentDidUpdate() {
		this.makeChart();
	}

	setChartNeedsData(chartNeedsData) {
		var temp = [].concat(chartNeedsData);
		this.setState({
			chartNeedsData: temp
		});
	}

	setChartData(data) {
		this.chartNeedsData[0] = {
			labels: ['Sindhupalchok', 'Dolakha', 'Nuwakot', 'Kavre'],
			series: [data[0]]
		};
		this.chartNeedsData[1] = {
			labels: ['Sindhupalchok', 'Dolakha', 'Nuwakot', 'Kavre'],
			series: [data[1]]
		};
		this.chartNeedsData[2] = {
			labels: ['NFI', 'Cash', 'Food', 
				'Medical Care', 'Supplies of Temporary Shelter', 'Tents', 'Other Assistance'],
			series: [data[2]]
		};
		this.chartNeedsData[3] = {
			labels: ['Shelter Construction Materials', 
				'Food', 'Clothing', 'Medical Supplies', 'Agricultural Inputs', 'Basic Household Items',
				'Large Household Items', 'Hygine Products', 'Educational Materials'],
			series: [data[3]]
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
			}
		});
	}

	makeChart() {
		var options = {
			axisX: {
				showGrid: false
			},
			axisY: {
			},
			height: 400,
			high: 100,
		};
		var options1_2 = {
			axisX: {
				showGrid: false
			},
			axisY: {
				position: 'end',
				showLabel: false
			},
			height: 400,
			high: 100,
		};
		var options_2 = {
			axisX: {
				showGrid: false,
			},
			axisY: {
				offset: 100
			},
		};
		var chartNeedsMet = new Chartist.Bar('.needs-met', this.chartNeedsData[0], options);
		var chartNeedsUnmet = new Chartist.Bar('.needs-unmet', this.chartNeedsData[1], options1_2);
		var chartAssistance = new Chartist.Bar('.assistance', this.chartNeedsData[2], options_2);
		var chartBreakdown = new Chartist.Bar('.needs-breakdown', this.chartNeedsData[3], options_2);

		this.makePercentCircles(chartNeedsMet, 'y', 18, 5, false);
		this.makePercentCircles(chartNeedsUnmet, 'y', 18, 5, false);
		this.makePercentCircles(chartAssistance, 'y', 18, 5, false);
		this.makePercentCircles(chartBreakdown, 'y', 18, 5, false);
	}

	render() {
		var needsMetTotal = 0;
		var needsUnmetTotal = 0;
		var total_assistance = 403;

		barData.district_wise.map(function(item) {
			needsMetTotal += Number(item[dataConstants.needs_met]);
			needsUnmetTotal += Number(item[dataConstants.needs_unmet])
		});

		this.setChartData(
			[[
				Math.round((Number(barData.district_wise[0][dataConstants.needs_met]) / 
				(Number(barData.district_wise[0][dataConstants.needs_met]) +
				Number(barData.district_wise[0][dataConstants.needs_unmet]))) * 10000) / 100,

				Math.round((Number(barData.district_wise[1][dataConstants.needs_met]) / 
				(Number(barData.district_wise[1][dataConstants.needs_met]) +
				Number(barData.district_wise[1][dataConstants.needs_unmet]))) * 10000) / 100,

				Math.round((Number(barData.district_wise[2][dataConstants.needs_met]) / 
				(Number(barData.district_wise[2][dataConstants.needs_met]) +
				Number(barData.district_wise[2][dataConstants.needs_unmet]))) * 10000) / 100,

				Math.round((Number(barData.district_wise[3][dataConstants.needs_met]) / 
				(Number(barData.district_wise[3][dataConstants.needs_met]) +
				Number(barData.district_wise[3][dataConstants.needs_unmet]))) * 10000) / 100,
			], [
				Math.round((Number(barData.district_wise[0][dataConstants.needs_unmet]) / 
				(Number(barData.district_wise[0][dataConstants.needs_met]) +
				Number(barData.district_wise[0][dataConstants.needs_unmet]))) * 10000) / 100,

				Math.round((Number(barData.district_wise[1][dataConstants.needs_unmet]) / 
				(Number(barData.district_wise[1][dataConstants.needs_met]) +
				Number(barData.district_wise[1][dataConstants.needs_unmet]))) * 10000) / 100,

				Math.round((Number(barData.district_wise[2][dataConstants.needs_unmet]) / 
				(Number(barData.district_wise[2][dataConstants.needs_met]) +
				Number(barData.district_wise[2][dataConstants.needs_unmet]))) * 10000) / 100,

				Math.round((Number(barData.district_wise[3][dataConstants.needs_unmet]) / 
				(Number(barData.district_wise[3][dataConstants.needs_met]) +
				Number(barData.district_wise[3][dataConstants.needs_unmet]))) * 10000) / 100,
			], [
				Math.round((Number(barData.aggregate.assistance[0]) / total_assistance) * 10000) / 100,
				Math.round((Number(barData.aggregate.assistance[1]) / total_assistance) * 10000) / 100,
				Math.round((Number(barData.aggregate.assistance[2]) / total_assistance) * 10000) / 100,
				Math.round((Number(barData.aggregate.assistance[3]) / total_assistance) * 10000) / 100,
				Math.round((Number(barData.aggregate.assistance[4]) / total_assistance) * 10000) / 100,
				Math.round((Number(barData.aggregate.assistance[5]) / total_assistance) * 10000) / 100,
				Math.round((Number(barData.aggregate.assistance[6]) / total_assistance) * 10000) / 100,
			], [
				Number(barData.aggregate.breakdown[0]),
				Number(barData.aggregate.breakdown[1]),
				Number(barData.aggregate.breakdown[2]),
				Number(barData.aggregate.breakdown[3]),
				Number(barData.aggregate.breakdown[4]),
				Number(barData.aggregate.breakdown[5]),
				Number(barData.aggregate.breakdown[6]),
				Number(barData.aggregate.breakdown[7]),
				Number(barData.aggregate.breakdown[8]),
			]]
		);
		return(
			<div className="needs">
				<div className="needs-met">
					<span className="chart-title-needs">Respondets who said all urgently needed items were included</span>
				</div>
				<div className="vertical-line"></div>
				<div className="needs-unmet">
					<span className="chart-title-needs">Respondets who said not all urgently needed items were included</span>
				</div>
				<div className="spacer"></div>
				<div className="needs-breakdown">
					<span className="chart-heading title-margin">Urgently Needed Items Not Included in the Kit</span>
				</div>
				<div className="spacer"></div>
				<div className="assistance">
					<span className="chart-heading title-margin">Types of Assistance Received</span>
				</div>
			</div>
		);
	}
}
