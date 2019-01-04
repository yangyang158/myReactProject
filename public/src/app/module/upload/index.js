import {observable, action, } from 'mobx';

export default new class FileDetailStore {

    @observable form = '';
    @observable visible = false;

    @action
    initForm = (node)=>{
        this.form = node;
    }
    
    @action
    onFileSelected = e=>{
        console.log('选择了文件', e.target.files);
        this.getImageUrl(e.target.files[0]);
    }

    @action
    getImageUrl = (file)=>{
        let reader = new FileReader();
        //读文件
        reader.readAsDataURL(file);
        //读取文件完毕
        reader.onload = e=>{
            //创建一个图像
            var image = new Image();
            image.src = e.target.result;
            //当图像装载完毕时调用的事件
            image.onload = ()=>{
                let width = image.width;
                let height = image.height;
                let m = width / height;

                let canvas = document.createElement('canvas');
                canvas.height = 50;
                canvas.width = 50*m;
                var ctx= canvas.getContext('2d');
                document.querySelector('.module-container').appendChild(canvas);
                ctx.drawImage(image, 0, 0, 50*m, 50);

                this.getImageBase64();
            }
            console.log('old图片', e.target.result);
            console.log('old查看文件内容字节大小', new Blob([file]));
        }
    }

    @action
    getImageBase64 = ()=>{
        let canvas = document.querySelector('canvas');
        let newImage = canvas.toDataURL('image/jpeg');
        console.log('new图片', newImage)
    }

    @action
    previewPDF = ()=>{
        this.visible = !this.visible;
    }
}