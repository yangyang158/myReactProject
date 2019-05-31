import React from 'react';
import store from './index.js';
import {observer} from 'mobx-react';
import * as maptalks from 'maptalks';
import './index.less'

@observer
export default class D3Study extends React.Component{

    componentDidMount () {
        var map = new maptalks.Map('map', {
            center: [-0.113049, 51.498568],
            zoom: 14,
            pitch : 56,
            baseLayer: new maptalks.TileLayer('base', {
                urlTemplate: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                subdomains: ['a','b','c'],
                attribution: '&copy; <a href="http://www.osm.org" target="_blank">OpenStreetMap</a> contributors'
            })
        })
        // point with altitude
        var point = new maptalks.Marker(
            [-0.113049, 51.498568],
            {
                properties : {
                    altitude : 400
                }
            }
        )
        // same point without altitude
        var point0 = new maptalks.Marker(
            [-0.113049, 51.498568]
        ).updateSymbol({
            markerOpacity : 0.5,
            markerFill : '#bbb'
        })

        new maptalks.VectorLayer('vector', [point0, point], {
            enableAltitude : true,        
            altitudeProperty : 'altitude' 
        }).addTo(map);
    }

    render(){
        return (
            <div className="map-talk-page">
                <h1>maptalks学习</h1>
                <div className="container" id="map"></div>
            </div>
        )
    }
}