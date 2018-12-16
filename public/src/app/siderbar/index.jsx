import React from 'react';
import { Link, BrowserRouter, HashRouter, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import './index.less';


export default withRouter(class Siderbar extends React.Component{
    componentDidMount(){
        console.log(this.props);
    }

    static contextTypes = {
        location: PropTypes.object,
    };

    render(){
        //let {t} = this.props;
        return(
            <div className="sider-bar">
                <ul>
                    <li><a href="#/layout">布局</a></li>
                    <li><a href="#/upload">上传</a></li>
                    <li><a href="#/drag">拖拽</a></li>
                </ul>
            </div>
        ); 
    }
})