import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import store from './index';
import './index.less';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@observer
export default class Layout extends React.Component{

    printToPdf = () => {
        const ele = document.getElementById('content')
        html2canvas(ele, {imageTimeout: 0}).then(function(canvas) {
            // document.body.appendChild(canvas)
            // return  
            let canvasWidth = canvas.width;
            let canvasHeight = canvas.height;
            // console.log('canvas 宽 高', canvasWidth, canvasHeight)
            // a4纸的尺寸[595.28pt,841.89pt]
            // 将canvas生成的图片 按a4纸的大小等比例缩放
            let imgWidth = 555.28; // 自定义
            let imgHeight = 555.28/canvasWidth * canvasHeight;
            // console.log('按a4纸缩放 宽 高', imgWidth, imgHeight)

            //一页pdf对应的canvas高度;
            let pageHeight = canvasWidth / 595.28 * 841.89;
            //未生成pdf的html页面高度
            let tempHeight = canvasHeight;
            //页面偏移
            let position = 0;

            // toDataURL 第二个参数为图片的质量0-1, 默认0.92
            let pageData = canvas.toDataURL('image/jpeg', 1.0);

            let pdf = new jsPDF('p', 'pt', 'a4');

            // 有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
            // 当内容未超过pdf一页显示的范围，无需分页
            if (tempHeight < pageHeight) {
                pdf.addImage(pageData, 'JPEG', 20, 0, imgWidth, imgHeight);
            } else {
                while(tempHeight > 0) {
                    pdf.addImage(pageData, 'JPEG', 20, position, imgWidth, imgHeight)
                    tempHeight -= pageHeight;
                    position -= 841.89;
                    //避免添加空白页
                    if(tempHeight > 0) {
                        pdf.addPage();
                    }
                }
            }
            // pdf.save('content.pdf');
            pdf.output('dataurlnewwindow')
        })
    }

    render(){
        return (
            <div className="flex-setting" id="content">
                <button onClick={this.printToPdf}>打印</button>
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