import React from 'react';
import store from './index.js';
import {PDFtoIMG} from 'react-pdf-to-image';
import {observer} from 'mobx-react';
import file from '../../../../assets/file/data.pdf';
import './index.less'
import img1 from '../../../../assets/img/user.png'
import img2 from '../../../../assets/img/pic.png'
import img3 from '../../../../assets/img/user-unknown.png'
@observer
export default class FileDetal extends React.Component{

    componentDidMount () {
        store.autoScroll(60)
    }

    componentWillUnmount () {
        store.destory()
    }

    testRequest = () => {
        let ele = document.createElement('script')
        window.showData = function(res){
            // console.log('响应结果', res)
        }
        ele.type = 'text/javascript'
        ele.src = 'api/common/jsonP?callback=showData'
        document.body.appendChild(ele)

    }

    render(){
        return (
            <div className="upload-page">
                <h1>form表单上传</h1>
                <div style={{background: 'pink'}} onClick={this.testRequest}>
                    <img src={img1} width={100} style={{background: 'red'}} />
                    <img src={img2} width={100} style={{background: 'yellow'}} />
                    <img src={img3} width={100} style={{background: 'green'}} />
                </div>
               
                <div style={{background: 'blue', color: '#fff'}}>23342434</div>
                <form action="api/common/upload" ref={node=>store.saveForm=node} method="post" encType="multipart/form-data" target="uploadTarget">
                    <input name="file" type="file" onChange={store.onFileSelected} />
                    <input type="submit" value="提交" />
                </form>
                <iframe id="uploadTarget" name="uploadTarget" style={{display:'none'}}></iframe>
                <h1></h1>
                <button onClick={store.previewPDF}>预览PDF</button>
                <If condition={store.visible}>
                    <div className="preview-pdf">
                        <PDFtoIMG file={file}>
                            {({pages}) => {
                                if (!pages.length) return 'Loading...';
                                return pages.map((page, index)=>
                                    <img key={index} src={page}/>
                                );
                            }}
                        </PDFtoIMG>
                    </div>
                </If>
                <h2>自滚动</h2>
                <div className="review_box">
                    <div className="content">
                        <p>1我在学习</p>
                        <p>2我在学习</p>
                        <p>3我在学习</p>
                        <p>4我在学习</p>
                        <p>5我在学习</p>
                        <p>6我在学习</p>
                        <p>7我在学习</p>
                        <p>8我在学习</p>
                        <p>9我在学习</p>
                        <p>10我在学习</p>
                        <p>11我在学习</p>
                        <p>12我在学习</p>
                        <p>13我在学习</p>
                        <p>14我在学习</p>
                        <p>15我在学习</p>
                        <p>16我在学习</p>
                    </div>
                    <div className="content2"></div>
                </div>
                <h2>长列表优化</h2>
                <div className="one-screen" onScroll={store.onScroll}>
                    <div className="box">
                        {
                            store.showDataLists.map((data, index) => {
                                return (
                                    <div style={{top: 30*data.rowIndex}} key={data.rowIndex}>数字{data.value}</div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}