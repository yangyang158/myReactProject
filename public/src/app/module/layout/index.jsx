import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import store from './index';
import './index.less';

@observer
export default class Layout extends React.Component{

    render(){
        return (
            <div className="flex-setting">
                <For each="item" index="index" of={store.flexPropertyList}>
                    <div className="detail" key={index}>
                        <If condition={typeof item === 'string'}>
                            <h2>{item}</h2>
                        </If>
                        <If condition={typeof item === 'object'}>
                            <h3>{item.propertyName}</h3>
                            <h4>{item.desc}</h4>
                            <For each="btn" index="index" of={item.propertyValue}>
                                <button onClick={()=>{store.changeStyle(item.propertyName, btn)}} key={index}>{btn}</button> 
                            </For>
                        </If>
                    </div>
                </For>
                <div className="container">
                    <For each="item" index="index" of={store.boxList}>
                        <div key={index} className={`box${item} box`} onClick={()=>{store.changeChildStyle(item)}}>box{item}</div>
                    </For>
                </div>
            </div>
        )
    }
}