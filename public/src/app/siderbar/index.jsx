import React from 'react';
import { Link, BrowserRouter, HashRouter, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import './index.less';


export default withRouter(class Siderbar extends React.Component{

    render(){
        //let {t} = this.props;
        return(
            <div className="sider-bar">
                <ul>
                    <li><a href="#/layout">布局</a></li>
                    <li><a href="#/upload">上传</a></li>
                    <li><a href="#/drag">拖拽</a></li>
                    <li><a href="#/useCss">日期</a></li>
                    <li><a href="#/d3-study">d3学习</a></li>
                </ul>
            </div>
        ); 
    }
})