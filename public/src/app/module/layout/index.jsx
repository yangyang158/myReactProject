import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import store from './index';
import './index.less';

@observer
export default class Home extends React.Component{

    render(){
        return (
            <div className="flex-setting">
                <h1>布局</h1>
                <div className="header">title</div>
                <div className="content">box</div>
            </div>
        )
    }
}