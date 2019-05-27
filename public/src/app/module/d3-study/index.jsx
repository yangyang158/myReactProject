import React from 'react';
import store from './index.js';
import {observer} from 'mobx-react';
import * as d3 from 'd3';

@observer
export default class D3Study extends React.Component{

    componentDidMount () {
        var dataset = [ 250 , 210 , 170 , 130 , 90 ]
        var rectHeight = 25
        var svg = d3.select('.d3-page')
            .select('.container')
            .append('svg')
            .attr('width', 200) //设定宽度
            .attr('height', 100)
        svg.selectAll('rect') //选择svg内所有的矩形
            .data(dataset) //绑定数组
            .enter() //指定选择集的enter部分
            .append('rect') 
            .attr('x', 20)
            .attr('y', function(d,i){
                return i * rectHeight;
            })
            .attr('width', function(d){
                return d;
            })
            .attr('height', rectHeight-2)
            .attr('fill', 'steelblue')
    }

    render(){
        return (
            <div className="d3-page">
                <h1>D3学习</h1>
                <div className="container">

                </div>
            </div>
        )
    }
}