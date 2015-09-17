import React from 'react';
import ChartHeading from '../ChartHeading'

var barData = require('../../data/mockData.json');

require('./style.scss');

var viewConstants = {
	survey: 'survey_completion',
	needs: 'needs_fullfilled',
	solar: 'solar_lamp_impact',
	priorities : 'priorities_for_spending'
};

export default class Chart extends React.Component {
	constructor() {
		super();
		this.chartNeedsData = [];
		this.chartSolarData = [];
		this.chartPrioritiesData = [];
	}

	componentDidMount() {
		this.makeChart();
	}

	componentDidUpdate() {
		this.makeChart();
	}

	setChartData(data) {
		switch(this.props.activeView) {
			case viewConstants.needs:
				this.chartNeedsData[0] = {
					labels: ['Sindhupalchok', 'Dolakha', 'Nuwakot', 'Kavre'],
					series: [data[0]]
				};
				this.chartNeedsData[1] = {
					labels: ['Sindhupalchok', 'Dolakha', 'Nuwakot', 'Kavre'],
					series: [data[1]]
				};
				break;
			case viewConstants.solar:
				this.chartSolarData[0] = {
					labels: ['Daily', 'Frequently', 'Seldom', 'Never', 'Did not receive a solar lamp'],
					series: [data[0]]
				};
				this.chartSolarData[1] = {
					labels: ['They feel more secure', 'It\'s easier for childern to study',
									'They spend less money on charging'],
					series: [data[1]]
				};
				break;
			case viewConstants.priorities:
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
				break;
		}
	}

	makeChart() {
		switch(this.props.activeView) {
			case viewConstants.needs: 
				var options = {
					axisX: {
						showGrid: false
					},
					axisY: {
						showGrid: false,
						showLabel: false
					},
					height: 400
				};
				new Chartist.Bar('.needs-met', this.chartNeedsData[0], options);
				new Chartist.Bar('.needs-unmet', this.chartNeedsData[1], options);
				break;
			case viewConstants.solar: 
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
					reverseData: true
				};
				new Chartist.Bar('.frequency', this.chartSolarData[0], options);
				new Chartist.Bar('.utility', this.chartSolarData[1], options);
				break;
			case viewConstants.priorities:
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
				new Chartist.Bar('.area-spending', this.chartPrioritiesData[0], options_1);
				new Chartist.Bar('.have-received-debt', this.chartPrioritiesData[1], options_2);
				new Chartist.Bar('.have-not-received-debt', this.chartPrioritiesData[2], options_2);
				break;

		}
	}

	renderChart() {
		switch(this.props.activeView) {
			case viewConstants.needs:
				this.setChartData(
					[[
						Number(barData.district_wise[0].needs_met),
						Number(barData.district_wise[1].needs_met),
						Number(barData.district_wise[2].needs_met),
						Number(barData.district_wise[3].needs_met)
					], [
						Number(barData.district_wise[0].needs_unmet),
						Number(barData.district_wise[1].needs_unmet),
						Number(barData.district_wise[2].needs_unmet),
						Number(barData.district_wise[3].needs_unmet)
					]]
				);
				return(
					<div className="needs">
						<div className="needs-met">
							<span className="chart-title-needs">Percentage of Needs Met</span>
						</div>
						<div className="vertical-line"></div>
						<div className="needs-unmet">
							<span className="chart-title-needs">Percentage of Needs Unmet</span>
						</div>
					</div>
				);
			case viewConstants.solar:
				this.setChartData(
					[[
						Number(barData.district_wise[0].needs_met),
						Number(barData.district_wise[1].needs_met),
						Number(barData.district_wise[2].needs_met),
						Number(barData.district_wise[3].needs_met),
						Number(barData.district_wise[3].needs_met),
					], [
						Number(barData.district_wise[0].needs_unmet),
						Number(barData.district_wise[1].needs_unmet),
						Number(barData.district_wise[2].needs_unmet),
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
			case viewConstants.priorities:
				this.setChartData(
					[[
						[Number(barData.district_wise[0].needs_met), Number(barData.district_wise[1].needs_met)],
						[Number(barData.district_wise[1].needs_met), Number(barData.district_wise[2].needs_met)],
						[Number(barData.district_wise[2].needs_met), Number(barData.district_wise[0].needs_met)],
					], [
						Number(barData.district_wise[0].needs_unmet),
						Number(barData.district_wise[1].needs_unmet),
						Number(barData.district_wise[2].needs_unmet),
						Number(barData.district_wise[3].needs_unmet)
					], [
						Number(barData.district_wise[0].needs_unmet),
						Number(barData.district_wise[1].needs_unmet),
						Number(barData.district_wise[2].needs_unmet),
						Number(barData.district_wise[3].needs_unmet)
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

	render() {
		return(
			<div className="chart-container">
				<ChartHeading activeView={this.props.activeView}/>
				<div className="chart">
				{
					(() => {
						return this.renderChart.call(this);
					})()
				}
				</div>
			</div>
		)
	}
}
