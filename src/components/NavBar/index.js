var React = require('react');

require('.//style.scss');

var viewConstants = {
	survey: 'survey_completion',
	needs: 'needs_fullfilled',
	solar: 'solar_lamp_impact',
	priorities : 'priorities_for_spending'
};

export default class NavBar extends React.Component {
	setActiveView(view, e) {
		this.props.setActiveView(view);
		var elements = document.getElementsByClassName('nav-button');
		[].forEach.call(elements, function(element) {
			element.className = 'nav-button';
		});

		if(e.target.tagName.toLowerCase() === 'span')
			e.target.parentNode.className += ' active';
		else
			e.target.className += ' active';
	}

	render() {
		return(
			<div className="navbar">
				<a className="banner" href="#"></a>
				<span className="navbar-buttons-group">
					<a className="nav-button active" href="#" 
						onClick={this.setActiveView.bind(this, viewConstants.survey)}>
						<span>Survey Completion</span>
					</a>
					<a className="nav-button" href="#"
						onClick={this.setActiveView.bind(this, viewConstants.needs)}>
						<span>Needs Fullfilled</span>
					</a>
					<a className="nav-button" href="#"
						onClick={this.setActiveView.bind(this, viewConstants.solar)}>
						<span>Solar Lamp Impact</span>
					</a>
					<a className="nav-button" href="#"
						onClick={this.setActiveView.bind(this, viewConstants.priorities)}>
						<span>Priorities for Spending</span>
					</a>
				</span>
			</div>
		);
	}
}
