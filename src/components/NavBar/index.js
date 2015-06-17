var React = require('react');

require('.//style.scss');

export default class NavBar extends React.Component {
	render() {
		return(
			<div className="navbar">
				<a className="banner" href="#"></a>
				<span className="navbar-buttons-group">
					<a className="nav-button" href="#"><span>Earthquake Response<span></span></span></a>
					<a className="nav-button active" href="#"><span>Response Dashboard<span></span></span></a>
					<a className="nav-button" href="#"><span>Recovery Strategy<span></span></span></a>
					<a className="nav-button" href="#"><span>Mercy Corps Nepal</span></a>
				</span>
			</div>
		);
	}
}
