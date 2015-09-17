import React from 'react';

require('./style.scss');

export default class Bars extends React.Component {
	makeBars() {
		if(typeof this.props.needs !== 'undefined') {
		return(
			<div>
				<div className="top-label">{this.props.needs}%</div>
				<div className="bar-foreground" 
					style={{
									height:this.props.needs * 3 + 'px', 
									backgroundColor: this.props.color, 
								}}>
				</div>
			</div>
			);
		} else if(typeof this.props.solar !== 'undefined') {
			return null;
		} else if(typeof this.props.utility !== 'undefined') {
			return null;
		} else if(typeof this.props.area_of_spending !== 'undefined') {
			console.log("hello");
			console.log(this.props.area_of_spending);
			return(
					<div>
					{
					this.props.area_of_spending.map(function(item, index) {
						return(
								<div className="horiz-bar-and-label">
									<div className="horiz-bar-label">{Object.keys(item)[0]}</div>
								</div>
							);
					})
					}
					</div>
					);
		}
	}
	render() {
		return(
			(() => {
				 return this.makeBars.call(this);
			})()
		);
	}
}
