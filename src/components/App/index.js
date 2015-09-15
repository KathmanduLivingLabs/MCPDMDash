import React from 'react';
import Map from '../Map';
import EthnicChart from '../EthnicChart';
import NavBar from '../NavBar';
import Chart from '../Chart';

require('./style.scss');

var viewConstants = {
	survey: 'survey_completion',
	needs: 'needs_fullfilled',
	solar: 'solar_lamp_impact',
	priorities : 'Priorities for Spending'
};

export default class App extends React.Component {
	constructor() {
		super();
		this.state = {
			activeView: viewConstants.survey,
			selectedDistrict: null
		};
	}

	setActiveView(activeView) {
		this.setState({
			activeView: activeView
		});
	}

	setSelectedDistrict(selectedDistrict) {
		this.setState({
			selectedDistrict: selectedDistrict
		});
	}

	render() {
		return(
			<div className="container">
				<NavBar setActiveView={this.setActiveView.bind(this)} />
				<div className="content">
				{
					this.state.activeView === viewConstants.survey ?
						<Map setSelectedDistrict={this.setSelectedDistrict.bind(this)} /> :
						<Chart />
				}
				</div>
			</div>
		);
	}
}
