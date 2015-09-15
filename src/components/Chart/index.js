import React from 'react';
import ChartHeading from '../ChartHeading';

require('./style.scss');

export default class Chart extends React.Component {
	render() {
		return(
			<div className="chart-container">
				<ChartHeading />
				<div className="chart">

				</div>
			</div>
		)
	}
}
