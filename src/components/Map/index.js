import React from 'react';
import EthnicChart from '../EthnicChart';
var districtsJson = require('../../data/district1.geojson');

require('./style.scss');

export default class Map extends React.Component {
	constructor() {
		super();
		this.lmap = null;
		this.geoJson = null;
	}
	componentDidMount() {
		this.setupMap();
	}

	setupMap() {
		this.lmap = L.map('map').setView([27.8, 85.8333], 9);

		var tileLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
			zoomControl: false,
			maxZoom: 9,
			minZoom: 9
		}).addTo(this.lmap);
		this.geoJson = L.geoJson(districtsJson, {
			style: this.styleMe.bind(this),
			onEachFeature: this.onEachFeature.bind(this)
		}).addTo(this.lmap);
		tileLayer._container.className += ' fade-base-map';
	}

	onEachFeature(feature, layer) {
		layer.on({
			mouseover: this.setHighlight,
			mouseout: this.resetHighlight.bind(this),
			click: this.setClickedDistrict.bind(this)
		});
		var label = L.divIcon({className: 'map-label', html: feature.properties.NAME});
		L.marker(layer.getBounds().getCenter(), {icon:label}).addTo(this.lmap);
	}

	setHighlight(e) {
		var layer = e.target;

		layer.setStyle({
			weight: 2,
			color: 'brown',
		});
		layer.bringToFront();
	}

	resetHighlight(e) {
		this.geoJson.resetStyle(e.target);
	}

	setClickedDistrict(e) {
		this.props.setSelectedDistrict(e.target);
		this.props.setCloseButton(false);
	}

	getColor(percent) {
		return percent === 100 ? '#ec7014' :
			percent > 75 ? '#2A85B3' :
			percent > 50 ? '#88C0EB' :
			percent > 25 ? '#C7E7FF' :
			percent > 0 ? '#E3F3FF' :
										'#ffffff';
	}

	styleMe(feature) {
		return {
			fillColor: this.getColor(feature.properties.PERCENT),
			fillOpacity: 0.7,
			weight: 2,
			opacity: 1,
			color: 'white'
		}
	}

	render() {
		return(
			<div className="map-container">
				<div id="map">
					<div className="aggregate-ethinic-btn" 
						onClick={() => {this.props.setEthinicAggregate(true); this.props.setCloseButton(false)}}>
						Aggregate Ethnic Distibution
					</div>
				</div>
			</div>
		);
	}
}