import React from 'react';
import {observer} from 'mobx-react';
import store from './index';

@observer
export default class DateUse extends React.Component{
    render(){
        return (
            <div className="date-example">
            </div>
        )
    }
}