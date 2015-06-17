var React = require('react');
var Map = require('../Map');
var EthnicChart = require('../EthnicChart');
var NavBar = require('../NavBar');

require('./style.scss');

export default class App extends React.Component {
	constructor() {
		super();
		this.state = {
			selectedDistrict: null
		};
	}

	componentDidUpdate() {
		console.log(this.state.selectedDistrict);
	}

	setSelectedDistrict(selectedDistrict) {
		this.setState({
			selectedDistrict: selectedDistrict
		});
	}

	render() {
		return(
			<div className="container">
				<NavBar />
				<div className="map-container">
					<Map setSelectedDistrict={this.setSelectedDistrict.bind(this)} />
				</div>
				<div className="chart-container">
					<EthnicChart selectedDistrict={this.state.selectedDistrict} />
				</div>
			</div>
		);
	}
}
