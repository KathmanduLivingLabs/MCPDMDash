var React = require('react');

require('.//style.scss');

var viewConstants = {
	survey: 'survey_completion',
	needs: 'needs_fullfilled',
	solar: 'solar_lamp_impact',
	priorities : 'priorities_for_spending',
	others: 'others'
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
					<a className="nav-button active" 
						onClick={this.setActiveView.bind(this, viewConstants.survey)}>
						<span>Respondent Demographics</span>
					</a>
					<a className="nav-button"
						onClick={this.setActiveView.bind(this, viewConstants.needs)}>
						<span>Needs Fullfilled</span>
					</a>
					<a className="nav-button"
						onClick={this.setActiveView.bind(this, viewConstants.solar)}>
						<span>Solar Lamp Impact</span>
					</a>
					<a className="nav-button"
						onClick={this.setActiveView.bind(this, viewConstants.priorities)}>
						<span>Priorities for Spending</span>
					</a>
					<a className="nav-button"
						onClick={this.setActiveView.bind(this, viewConstants.others)}>
						<span>Others</span>
					</a>
				</span>
			</div>
		);
	}
}
