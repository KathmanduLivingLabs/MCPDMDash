var React = require('react');

require('.//style.scss');

var viewConstants = {
	survey: 'survey_completion',
	needs: 'needs_fullfilled',
	solar: 'solar_lamp_impact',
	priorities : 'priorities_for_spending'
};

export default class NavBar extends React.Component {
	render() {
		return(
			<div className="navbar">
				<a className="banner" href="#"></a>
				<span className="navbar-buttons-group">
					<a className="nav-button active" href="#" 
						onClick={(e) => {this.props.setActiveView(viewConstants.survey)}}>
						<span>Survey Completion</span>
					</a>
					<a className="nav-button" href="#"
						onClick={(e) => {this.props.setActiveView(viewConstants.needs)}}>
						<span>Needs Fullfilled</span>
					</a>
					<a className="nav-button" href="#"
						onClick={(e) => {this.props.setActiveView(viewConstants.solar)}}>
						<span>Solar Lamp Impact</span>
					</a>
					<a className="nav-button" href="#"
						onClick={(e) => {this.props.setActiveView(viewConstants.priorities)}}>
						<span>Priorities for Spending</span>
					</a>
				</span>
			</div>
		);
	}
}
