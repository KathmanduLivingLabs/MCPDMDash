import React from 'react';
import ChartHeading from '../ChartHeading';
import NeedsBar from '../NeedsBar';
import SolarBar from '../SolarBar';
import PrioritiesBar from '../PrioritiesBar';
import Others from '../Others';

//var barData = require('../../data/mockData.json');
var barData = require('../../data/realData.json');

require('./style.scss');

var viewConstants = {
	survey: 'survey_completion',
	needs: 'needs_fullfilled',
	solar: 'solar_lamp_impact',
	priorities : 'priorities_for_spending',
	others: 'others'
};

var dataConstants = {
	needs_met: 'needs_met',
	needs_unmet: 'needs_unmet',
	debt_taken: 'Debt Taken Due to Earthquake',
	debt_not_taken: 'No Debt Due to Earthquake'
};

export default class Chart extends React.Component {
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

	render() {
		return(
			<div className="chart-container">
				<ChartHeading activeView={this.props.activeView}/>
				<div className="chart">
				{
					(() => {
						switch(this.props.activeView) {
							case viewConstants.needs:
								return <NeedsBar />
							case viewConstants.solar:
								return <SolarBar />
							case viewConstants.priorities:
								return <PrioritiesBar />
							case viewConstants.others :
								return <Others />
							default:
								return null
						}
					})()
				}
			</div>
		</div>
		);
	}
}
