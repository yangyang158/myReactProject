import React from 'react';
import store from './index.js';
import {observer} from 'mobx-react';
@observer
export default class Home extends React.Component{


    render(){
        return (
            <div>
                <h1>form表单上传</h1>
                <form action="api/common/upload" ref={node=>store.saveForm=node} method="post" encType="multipart/form-data" target="uploadTarget">
                    <input name="file" type="file" onChange={store.onFileSelected} />
                    <input type="submit" value="提交" />
                </form>
                <iframe id="uploadTarget" name="uploadTarget" style={{display:'none'}}></iframe>
            </div>
        )
    }
}