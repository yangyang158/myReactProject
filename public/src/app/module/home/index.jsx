import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import store from './index';
import Rx from 'rx';

@observer
export default class Home extends React.Component{

    componentDidMount(){
        console.log(Rx)
        Rx.Observable.fromEvent(this.refs.btn, 'click')
        .scan(count=>count+2, 1)
        .subscribe((count) => console.log('Clicked!', count));
    }

    render(){
        return (
            <div>
                点击了3{store.count}次
                <button ref='btn' onClick={store.add}>点我</button>
            </div>
        )
    }
}