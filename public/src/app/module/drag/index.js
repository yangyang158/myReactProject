import {observable, action, } from 'mobx';
import moment from 'moment';
import uuidv1 from 'uuid/v1';
import _ from 'lodash';

export default new class DragableStore {

    @observable dateList = [];
    @observable timeline = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', 
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00',
    '19:00', '20:00', '21:00', '22:00', '23:00', '24:00'];

    @action
    getWeekDate = ()=>{
        for(let i=0;i<=6;i++){
            let obj = {
                date: moment().add(i, 'days').format('YYYY-MM-DD'),
                detail: []
            }
            this.dateList.push(obj);
        }
    }

    @action
    onMouseDown = (e, row, timeShiftIndex, direction, id)=>{
        let currentEditAreaEle = document.querySelector(`.table-row.row-${row} .thd-editArea`);
        let dragIndex;
        let uuid = '';
        if(typeof timeShiftIndex === 'undefined'){
            //新增
            uuid = uuidv1();
            this.createEle(row, uuid);
            dragIndex = this.dragEleIndex(row, uuid);
        }else{
            //修改
            dragIndex = timeShiftIndex;
            uuid = id;
        }
        let initPosition = e.clientX;

        let mouseMove = e=>{
            console.log('----', e.target.className)
            let newNode = currentEditAreaEle.querySelector(`.time-shift-${dragIndex}`);
            let width = 0;
            if(e.target){
                //防止重叠
                let bool = _.includes(e.target.className, 'right-resize') || _.includes(e.target.className, 'left-resize');
                if(bool && !_.includes(e.target.parentNode.className, `time-shift-${dragIndex}`)){
                    currentEditAreaEle.removeEventListener('mousemove', mouseMove);
                    currentEditAreaEle.removeEventListener('mouseup', mouseUp);
                    return;
                }
                //防止拖出24:00之外的区域
                if(_.includes(e.target.className, 'thd-editArea')){
                    currentEditAreaEle.removeEventListener('mousemove', mouseMove);
                    currentEditAreaEle.removeEventListener('mouseup', mouseUp);
                    return;
                }
            }

            let allWidth = currentEditAreaEle.querySelector('.t-cell').getBoundingClientRect().width*24;
            let unit = ((24*60) / allWidth).toFixed(2);
            if(newNode){
                if(typeof timeShiftIndex !== 'undefined'){
                    let x = newNode.getBoundingClientRect().x;
                    let right = newNode.getBoundingClientRect().right;
                    if(direction === 'right'){
                        newNode.style.width = e.clientX - x + 'px';
                    }else{
                        newNode.style.left = e.clientX - 352 + 'px';
                        newNode.style.width = right - e.clientX + 'px';
                    }
                }else{
                    newNode.style.left = initPosition - 352 + 'px';
                    newNode.style.width = e.clientX - initPosition + 'px';
                }
                let startTime = _.toNumber(_.replace(newNode.style.left, 'px', '')) * unit;
                let endTime = (_.toNumber(_.replace(newNode.style.left, 'px', '')) + _.toNumber(_.replace(newNode.style.width, 'px', ''))) * unit;
                this.updateEle(row, uuid, startTime, endTime)
            }
        }
        let mouseUp = e=>{
            currentEditAreaEle.removeEventListener('mousemove', mouseMove);
            currentEditAreaEle.removeEventListener('mouseup', mouseUp);
            let newNode = currentEditAreaEle.querySelector(`.time-shift-${dragIndex}`);

            if(newNode){
                let width = newNode.getBoundingClientRect().width;
                if(!width){
                    _.map(this.dateList, (item, index)=>{
                        if(index === row){
                            let obj = _.find(item.detail, ['id', uuid]);
                            if(obj){
                                _.pull(item.detail, obj);
                            }
                        }
                    })
                }
            }
        }
        let mouseLeave = e=>{
            currentEditAreaEle.removeEventListener('mousemove', mouseMove);
        }
        currentEditAreaEle.addEventListener('mousemove', mouseMove);
        currentEditAreaEle.addEventListener('mouseup', mouseUp);
        currentEditAreaEle.addEventListener('mouseleave', mouseLeave);
    }

    @action
    createEle = (row, uuid)=>{
        _.map(this.dateList, (item, index)=>{
            if(index === row){
                item.detail.push({
                    startTime: '',
                    endTime: '',
                    id: uuid,
                })
            }
        })
    }

    @action
    updateEle = (row, uuid, startTime, endTime)=>{
        _.map(this.dateList, (item, index)=>{
            if(index === row){
                _.map(item.detail, (ite, inde)=>{
                    if(ite.id === uuid){
                        let startHour = _.floor(_.floor(startTime) / 60);
                        let startMinute = _.floor(startTime) % 60;
                        let endHour = _.floor(_.floor(endTime) / 60);
                        let endMinute = _.floor(endTime) % 60;
                        let formatStartTime = moment().set({'hour': startHour, 'minute': startMinute}).format('HH:mm');
                        let formatEndTime = moment().set({'hour': endHour, 'minute': endMinute}).format('HH:mm');
                        ite.startTime = formatStartTime;
                        ite.endTime = formatEndTime;
                    }
                })
            }
        })
    }

    @action
    dragEleIndex = (row, uuid)=>{
        let newIndex;
        this.dateList.some((item, index)=>{
            if(index === row){
                let objIndex = _.findIndex(item.detail, ['id', uuid]);
                if(objIndex !== -1){
                    newIndex = objIndex;
                }
            }
        })
        return newIndex;
    }

    @action
    onMouseDownToLeftORRight = (e, id, direction)=>{
        let [row, timeShiftIndex] = this.getDragTimeShift(id);
        let currentDragEle = document.querySelector(`.table-row.row-${row} .thd-editArea .time-shift-${timeShiftIndex}`);
        this.onMouseDown(e, row, timeShiftIndex, direction, id);
    }

    @action
    onMouseDownBody = (e)=>{
        e.stopPropagation();
    }

    @action
    getDragTimeShift = (id)=>{
        let row;
        let timeShiftIndex;
        _.forEach(this.dateList, (rowData, rowIndex)=>{
            _.forEach(rowData.detail, (item, index)=>{
                if(item.id === id){
                    row = rowIndex;
                    timeShiftIndex = index;
                }
            })
        })
        return [row, timeShiftIndex]
    }

    @action
    calcTime = ()=>{
        let editAreaEle = document.querySelector('.table-body .thd-editArea');
        if(editAreaEle){
            let width = editAreaEle.getBoundingClientRect().width;
            width = width - Math.ceil(width/25);
            let num = width / 1440;
        }
    }
}