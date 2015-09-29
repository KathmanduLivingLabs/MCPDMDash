import React from 'react';
import EthinicChart from '../EthinicChart';

require('./style.scss');

const chartTypes = [
	{chartType: 'ethinicity', title: 'Ethininic Distribution of '},
	{chartType: 'male', title: 'Male Population Distribution of '},
	{chartType: 'female', title: 'Female Population Distribution of '},
]

export default class EthinicChartMaker extends React.Component {
	constructor() {
		super();
		this.page = 0;
	}

	closeChart(e) {
		this.props.setCloseButton(true);
	}

	componentDidMount() {
		var allCharts = document.getElementsByClassName('actual-chart');
		for(var i = 1; i < chartTypes.length; i++) {
			allCharts[i].className = 'actual-chart hide';
		}
	}

	showClass(nextClassNumber, currClassNumber) {
		console.log(nextClassNumber);
		console.log(currClassNumber);
		var allCharts = document.getElementsByClassName('actual-chart');
		allCharts[nextClassNumber].className = 'actual-chart';
		allCharts[currClassNumber].className = 'actual-chart hide';
	}

	prevClick() {
		var allCharts = document.getElementsByClassName('actual-chart');
		var i = 0;
		var currClassNumber = 0;
		for(i = 0; i < allCharts.length; i++) {
			if(allCharts[i].className.indexOf('hide') === -1) {
				currClassNumber = i;
				break;
			}
		}
		this.showClass(Math.abs(i - 1) % 3, i % 3);
	}

	nextClick() {
		var allCharts = document.getElementsByClassName('actual-chart');
		var i = 0;
		var currClassNumber = 0;
		for(i = 0; i < allCharts.length; i++) {
			if(allCharts[i].className.indexOf('hide') === -1) {
				currClassNumber = i;
				break;
			}
		}
		this.showClass((i + 1) % 3, i % 3);
	}

	render() {
		var _this = this;
		return(
			<div className="type-chart">
				<div className="type-chart-bar">
					<a className="close-button" onClick={this.closeChart.bind(this)}>×</a>
					{
						chartTypes.map(function(item, index) {
							return <EthinicChart chartType={chartTypes[index].chartType} title={item.title}
									selectedDistrict={_this.props.selectedDistrict} ref={'chart' + index} />
						})
					}
				</div>
				<div className="prev-btn" onClick={this.prevClick.bind(this)}>prev</div>
				<div className="next-btn" onClick={this.nextClick.bind(this)}>next</div>
			</div>
		);
	}
}
