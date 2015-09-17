import React from 'react';
import ChartHeading from '../ChartHeading';
import Bars from '../Bars';

var barData = require('../../data/mockData.json');
var Utils = require('../../utils');
require('./style.scss');

var viewConstants = {
	survey: 'survey_completion',
	needs: 'needs_fullfilled',
	solar: 'solar_lamp_impact',
	priorities : 'priorities_for_spending'
};

export default class Chart extends React.Component {
	renderChart() {
		console.log(this.props.activeView === viewConstants.solar);
		switch(this.props.activeView) {
			case viewConstants.needs:
				return(
					<div className="needs">
						<div className="needs-met">
							<div className="graph-heading">Percentage of Needs Met</div>
						{
							barData.district_wise.map(function(item, index) {
								return (
									<div className="bar-and-label">
										<Bars needs={item.needs_met} color={Utils.colors.first_blue} />
										<div className="horiz-line"></div>
										<div className="bar-label">{item.district_name}</div>
									</div>
								);
							})
						}
						<div className="vertical-line"></div>
						</div>

						<div className="needs-unmet">
							<div className="graph-heading">Percentage of Needs Unmet</div>
						{
							barData.district_wise.map(function(item, index) {
								return (
									<div className="bar-and-label">
										<Bars needs={item.needs_unmet} color={Utils.colors.second_red}/>
										<div className="horiz-line"></div>
										<div className="bar-label">{item.district_name}</div>
									</div>
								);
							})
						}
						</div>

					</div>
				);
			case viewConstants.solar:
				<div className="solar-impact">
					<div className="frequency"></div>
					<div className="utility"></div>
				</div>
				break;
			case viewConstants.priorities:
				return(
					<div className="priorities">
						<div className="area-spending">
							<Bars area_of_spending={barData.aggregate.priorities.area_of_spending} />
						</div>
						<div className="debt">
							<div className="chart-semi-heading">Have the recipients taken any debt?</div>
							<div className="have-received-debt">
								<div className="graph-heading">Percentage of Debt Taken</div>
								{
									barData.district_wise.map(function(item, index) {
										return (
											<div className="bar-and-label">
												<Bars needs={item.debt_taken} color={Utils.colors.first_blue} />
												<div className="horiz-line"></div>
												<div className="bar-label">{item.district_name}</div>
											</div>
										);
									})
								}
								<div className="vertical-line"></div>
							</div>

							<div className="have-not-received-debt">
								<div className="graph-heading">Percentage of Debt Not Taken</div>
								{
									barData.district_wise.map(function(item, index) {
										return (
											<div className="bar-and-label">
												<Bars needs={item.debt_not_taken} color={Utils.colors.second_red} />
												<div className="horiz-line"></div>
												<div className="bar-label">{item.district_name}</div>
											</div>
										);
									})
								}
							</div>
						</div>
					</div>
				);
		}
	}
	render() {
		console.log(Utils);
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
