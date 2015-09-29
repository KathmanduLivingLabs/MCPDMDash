import React from 'react';

require('./style.scss');

export default class ChartHeading extends React.Component {
	constructor() {
		super();
		this.heading = {
			needs_fullfilled: "Were the needs fully met?",
			solar_lamp_impact: "Solar Lamp Impact",
			priorities_for_spending: "Priorities for Spending",
			others: "Others"
		}
	}
	render() {
		return(
			<div className="chart-heading">
				{this.heading[this.props.activeView]}
			</div>
		);
	}
}
