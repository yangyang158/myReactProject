import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import moment from 'moment';
import classnames from 'classnames';
import solarlunar from 'solarlunar';
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
        console.log('农历', solarlunar.solar2lunar(2019, 2, 19))
        console.log('农历', solarlunar.solar2lunar(2019, 3, 8))

        return (
            <div className="calendar">
                请输入年份：<input type="text" value={this.state.inputYear || 2019} onChange={this.changeYear} onBlur={this.onBlur} />
                <div className="one-row">
                    <For each="month" index="index" of={monthsOne}>
                        <Month key={index} month={month} year={this.state.year || 2019} />
                    </For>
                </div>
                <div className="two-row">
                    <For each="month" index="index" of={monthsTwo}>
                        <Month key={index} month={month} year={this.state.year || 2019} />
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
        //本月1号之前的日期排列
        if(startWeekDay > 0) {
            for(let i = lastMonthEndDay-startWeekDay+1; i<=lastMonthEndDay; i++){
                let lunar = solarlunar.solar2lunar(lastMonthYear, lastMonth+1, i);
                dateArr.push({
                    currentMonth: false,
                    date: `${lastMonthYear}-${lastMonth+1}-${i}`,
                    lunar:  lunar.lDay === 1 ? lunar.monthCn : lunar.dayCn,//日历
                    throttle: lunar.term//节气
                });
            }
        }
       //本月日期排列
        for(let i = 1; i<=endDay; i++){
            let lunar = solarlunar.solar2lunar(year, month, i);

            dateArr.push({
                currentMonth: true,
                date: `${year}-${month}-${i}`,
                lunar: lunar.lDay === 1 ? lunar.monthCn : lunar.dayCn,//日历
                throttle: lunar.term//节气
            });
        }
        //本月月末之后的日期排列
        //排列最少4行，最多6行, dateArr.length/6 判断目前有几行
        let line = _.floor(dateArr.length / 6);
        if(line === 4){
            for(let i = 1; i<=14; i++){
                let lunar = solarlunar.solar2lunar(nextMonthYear, nextMonth+1, i);
                dateArr.push({
                    currentMonth: false,
                    date: `${nextMonthYear}-${nextMonth+1}-${i}`,
                    lunar: lunar.lDay === 1 ? lunar.monthCn : lunar.dayCn,//日历
                    throttle: lunar.term//节气
                });
            }
        }
        if(line === 5){
            for(let i = 1; i<=(7-endWeekDay-1+7); i++){
                let lunar = solarlunar.solar2lunar(nextMonthYear, nextMonth+1, i);
                dateArr.push({
                    currentMonth: false,
                    date: `${nextMonthYear}-${nextMonth+1}-${i}`,
                    lunar: lunar.lDay === 1 ? lunar.monthCn : lunar.dayCn,//日历
                    throttle: lunar.term//节气
                });
            }
        }
        if(line === 6){
            for(let i = 1; i<=(7-endWeekDay-1); i++){
                let lunar = solarlunar.solar2lunar(nextMonthYear, nextMonth+1, i);
                dateArr.push({
                    currentMonth: false,
                    date: `${nextMonthYear}-${nextMonth+1}-${i}`,
                    lunar: lunar.lDay === 1 ? lunar.monthCn : lunar.dayCn,//日历
                    throttle: lunar.term//节气
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
                        <Day day={day} key={index} />
                    </For>
                </div>
            </div>
        )
    }
}

export class Day extends React.Component{

    static propTypes = {
        day: PropTypes.object,
    }

    state = {
        time: 1,
        currentShow: 'lunar'
    }

    interval = null;
    lunarEle = undefined;
    throttleEle = undefined;
    boxEle = undefined;

    componentDidMount(){
        let {day, } = this.props;
        
    }

    render(){
        let {day, } = this.props;

        return (
            <div className="month-day">
                <p data-value={day.date} className={classnames('date', {'other-month': !day.currentMonth})}>
                    {moment(day.date).date()}
                </p>
                {/*<If condition={!day.throttle}>
                    <span className="lunar">{day.lunar}</span>
        </If>*/}
                {/*<If condition={day.throttle && this.state.time%2 === 0}>
                    <span className={classnames('lunar', {'throttle': day.throttle, 'show-lunar': this.state.time%2 === 0, 'show-throttle': this.state.time%2 !== 0})}>
                        {day.lunar}
                    </span>
                </If>
                <If condition={day.throttle && this.state.time%2 !== 0}>
                    <span className={classnames('lunar', {'throttle': day.throttle, 'show-lunar': this.state.time%2 === 0, 'show-throttle': this.state.time%2 !== 0})}>
                        {day.throttle}
                    </span>
                </If>*/}
                <div className="day-box">
                    <div key={Math.random()} className={classnames({'day-detail': day.throttle})} ref={node=>this.boxEle=node}>
                        <span className={classnames('lunar', {'lunar-animation': day.throttle})} ref={node=>this.lunarEle=node}>
                            {day.lunar}
                        </span> 
                        <span className={classnames({'throttle': day.throttle})} ref={node=>this.throttleEle=node}>
                            {day.throttle}
                        </span>
                    </div>
   
                </div>
            </div>
        )
    }
}