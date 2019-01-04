import React from 'react';
import store from './index.js';
import {PDFtoIMG} from 'react-pdf-to-image';
import {observer} from 'mobx-react';
import file from '../../../../assets/file/data.pdf';
@observer
export default class FileDetal extends React.Component{


    render(){
        return (
            <div>
                <h1>form表单上传</h1>
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
                                console.log('pages', pages)
                                if (!pages.length) return 'Loading...';
                                return pages.map((page, index)=>
                                    <img key={index} src={page}/>
                                );
                            }}
                        </PDFtoIMG>
                    </div>
                </If>
            </div>
        )
    }
}