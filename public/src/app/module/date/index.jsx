import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import moment from 'moment';
import classnames from 'classnames';
import _ from 'lodash';
import store from './index';
import './index.less';
@observer
export default class DateUse extends React.Component{

    state = {
        inputYear: '',
        year: 0,
    }

    changeYear = e=>{
        this.setState({
            inputYear: e.target.value
        })
    }

    onBlur = ()=>{
        this.setState({
            year: _.toNumber(this.state.inputYear)
        })
    }

    render(){
        let monthsOne = [1, 2, 3, 4, 5, 6];
        let monthsTwo = [7, 8, 9, 10, 11, 12];

        return (
            <div className="calendar">
                请输入年份：<input type="text" value={this.state.inputYear || 2019} onChange={this.changeYear} onBlur={this.onBlur} />
                <div className="one-row">
                    <For each="month" index="index" of={monthsOne}>
                        <Month month={month} year={this.state.year || 2019} />
                    </For>
                </div>
                <div className="two-row">
                    <For each="month" index="index" of={monthsTwo}>
                        <Month month={month} year={this.state.year || 2019} />
                    </For>
                </div>
            </div>
        )
    }
}

export class Month extends React.Component{
    monthTitle = ['日', '一', '二', '三', '四', '五', '六'];

    static propTypes = {
        month: PropTypes.number,
        year: PropTypes.number,
    }

    static defaultProps = {
        month: 2,
        year: 2025,
    }

    monthDate = [];

    calcMonthDate = ()=>{
        let {month, year } = this.props;
        //获取月初、月末, 月末也代表本月的总天数
        let endDay = moment().set({year, 'month': month - 1}).endOf('month').date();

        //判断 月初、月末 是 星期几
        let startWeekDay = moment().set({year, 'month': month - 1}).startOf('month').day();
        let endWeekDay = moment().set({year, 'month': month - 1}).endOf('month').day();

        //判断 当前月的上一个月的月末, 当前的上个月属于哪一年, 哪个月
        let lastMonthEndDay = moment().set({year, 'month': month - 2}).endOf('month').date();
        let lastMonthYear = moment().set({year, 'month': month - 2}).year();
        let lastMonth = moment().set({year, 'month': month - 2}).month();

        //判断 当前月的下个月属于哪一年,哪个月
        let nextMonthYear = moment().set({year, 'month': month}).year();
        let nextMonth = moment().set({year, 'month': month}).month();

        let dateArr = [];

        if(startWeekDay > 0) {
            for(let i = lastMonthEndDay-startWeekDay+1; i<=lastMonthEndDay; i++){
                dateArr.push({
                    currentMonth: false,
                    date: `${lastMonthYear}-${lastMonth+1}-${i}`
                });
            }
        }
       
        for(let i = 1; i<=endDay; i++){
            dateArr.push({
                currentMonth: true,
                date: `${year}-${month}-${i}`
            });
        }

        //排列最少4行，最多6行, dateArr.length/6 判断目前有几行
        let line = _.floor(dateArr.length / 6);
        if(line === 4){
            for(let i = 1; i<=14; i++){
                dateArr.push({
                    currentMonth: false,
                    date: `${nextMonthYear}-${nextMonth+1}-${i}`
                });
            }
        }
        if(line === 5){
            for(let i = 1; i<=(7-endWeekDay-1+7); i++){
                dateArr.push({
                    currentMonth: false,
                    date: `${nextMonthYear}-${nextMonth+1}-${i}`
                });
            }
        }
        if(line === 6){
            for(let i = 1; i<=(7-endWeekDay-1); i++){
                dateArr.push({
                    currentMonth: false,
                    date: `${nextMonthYear}-${nextMonth+1}-${i}`
                });
            }
        }
        this.monthDate = dateArr;
    }

    render(){
        let {month, year } = this.props;
        this.calcMonthDate();
        return (
            <div className="month">
                <div className="month-year">
                    {month}
                </div>
                <div className="month-week">
                    <For each="title" index="index" of={this.monthTitle}>
                        <span className="week" key={index}>{title}</span>
                    </For>
                </div>
                <div className="month-date">
                    <For each="day" index="index" of={this.monthDate}>
                        <span data-value={day.date} className={classnames('date', {'other-month': !day.currentMonth})} key={index}>
                            {moment(day.date).date()}
                        </span>
                    </For>
                </div>
            </div>
        )
    }
}