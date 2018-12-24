import {observable, action} from 'mobx';

export default new class LayoutStore{

    flexPropertyList = [
        '1、容器的属性'
    ,{
        propertyName: 'flex-direction',
        desc: '决定主轴的方向（即项目的排列方向）',
        propertyValue: ['row', 'row-reverse', 'column', 'column-reverse']
    }, {
        propertyName: 'flex-wrap',
        desc: '决定如何换行',
        propertyValue: ['nowrap', 'wrap', 'wrap-reverse']
    }, {
        propertyName: 'justify-content',
        desc: '定义了项目在主轴(水平轴)上的对齐方式',
        propertyValue: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around']
    }, {
        propertyName: 'align-items',
        desc: '定义项目在交叉轴(垂直轴)上如何对齐',
        propertyValue: ['flex-start', 'flex-end', 'center', 'baseline', 'stretch']
    }, {
        propertyName: 'align-content',
        desc: '定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用',
        propertyValue: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'stretch']
    }, 
        '2、项目的属性',
    {
        propertyName: 'order',
        desc: '定义项目的排列顺序。数值越小，排列越靠前，默认为0',
        propertyValue: [0, 1, 2, 3, 4]
    }, {
        propertyName: 'flex-grow',
        desc: '定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大',
        propertyValue: [0, 1, 2, 3, 4]

    }, {
        propertyName: 'flex-shrink',
        desc: '定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小',
        propertyValue: [0, 1, 2, 3, 4]

    }, {
        propertyName: 'flex-basis',
        desc: '定义了在分配多余空间之前，项目占据的主轴空间（main size）。比如可以设为跟width或height属性一样的值（比如350px），则项目将占据固定空间',
        propertyValue: [350]

    }]

    boxList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    @observable selectedBox = '';


    @action
    changeStyle = (propertyName, propertyValue)=>{
        console.log(propertyName, propertyValue)
        let containerEle = document.querySelector('.flex-setting .container');
        if(containerEle){
            if(propertyName === 'flex-basis'){
                if(!this.selectedBox) return;
                this.selectedBox.style[propertyName] = propertyValue + 'px';
                return;
            }
            if(propertyName !== 'order' && propertyName !== 'flex-grow' && propertyName !== 'flex-shrink'){
                containerEle.style[propertyName] = propertyValue;
            }else{
                if(!this.selectedBox) return;
                this.selectedBox.style[propertyName] = propertyValue;
            }
        }
    }

    @action
    changeChildStyle = (item)=>{
        let boxEle = document.querySelector(`.box${item}`);
        if(boxEle){
           this.selectedBox = boxEle;
        }
    }
}