import React from 'react';
import Map from '../Map';
import EthnicChart from '../EthnicChart';
import NavBar from '../NavBar';
import Chart from '../Chart';
import Footer from '../Footer';

require('./style.scss');

var viewConstants = {
	survey: 'survey_completion',
	needs: 'needs_fullfilled',
	solar: 'solar_lamp_impact',
	priorities : 'priorities_for_spending'
};

export default class App extends React.Component {
	constructor() {
		super();
		this.state = {
			activeView: viewConstants.survey,
			selectedDistrict: null,
			closeButton: true
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
	
	setCloseButton() {
		this.setState({
			closeButton: !this.state.closeButton
		});
	}

	render() {
		return(
			<div className="container">
				<NavBar setActiveView={this.setActiveView.bind(this)} />
				<div className="content">
				{
					this.state.activeView === viewConstants.survey ?
						<div className="map-and-echart">
							<Map setSelectedDistrict={this.setSelectedDistrict.bind(this)} 
									setCloseButton={this.setCloseButton.bind(this)}/> 
							{
							this.state.closeButton ? null :
							<EthnicChart setCloseButton={this.setCloseButton.bind(this)} 
									selectedDistrict={this.state.selectedDistrict} />
							}
						</div>:
						<div className="chart-container">
							<Chart activeView={this.state.activeView}/>
						</div>
				}
				</div>
				<Footer />
			</div>
		);
	}
}
