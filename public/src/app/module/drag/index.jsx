import React from 'react';
import {observer} from 'mobx-react';
import store from './index';
import _ from 'lodash';
import './index.less';
@observer
export default class Dragable extends React.Component{

    componentDidMount(){
        store.getWeekDate();
    }

    render(){
        return (
            <div className="dragable1">
                <h1>拖拽</h1>
                <div className="table">
                    <div className="table-head">
                        <div className="table-row">
                            <div className="thd-date">日期</div>
                            <div className="thd-timeline">
                                <For each="item" index="index" of={store.timeline}>
                                    <div key={index} className="t-cell">
                                        <span>{item}</span>
                                    </div>
                                </For>
                            </div>
                        </div>
                    </div>
                    <div className="table-body">
                        <For each="item" index="index" of={store.dateList}>
                            <div key={index} className={`table-row row-${index}`}>
                                <div className="thd-date">{item.date}</div>
                                <div className="thd-editArea" onMouseDown={(e)=>{store.onMouseDown(e, index)}}>
                                    <For each="item" index="index" of={store.timeline}>
                                        <div key={index} className={`t-cell cell-${index}`}></div>
                                    </For>
                                    <For each="item" index="index" of={item.detail}>
                                        <div key={index} className={`timestamp time-shift-${index}`} id={item.id} onMouseDown={(e)=>{store.onMouseDownBody(e)}}>
                                            <span className="left-resize" onMouseDown={(e)=>{store.onMouseDownToLeftORRight(e, item.id, 'left')}}></span>
                                            <span className="time-range">{item.startTime} - {item.endTime}</span>
                                            <span className="right-resize" onMouseDown={(e)=>{store.onMouseDownToLeftORRight(e, item.id, 'right')}}></span>
                                            <div className="stampTooltip">
                                                <p>可用时间段：</p>
                                                <p>{item.startTime} - {item.endTime}</p>
                                            </div>
                                        </div>
                                    </For>
                                </div>
                            </div>
                        </For>
                    </div>
                </div>
            </div>
        )
    }
}