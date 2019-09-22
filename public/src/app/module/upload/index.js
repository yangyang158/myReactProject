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
            let image = new Image();
            image.src = e.target.result;
            //当图像装载完毕时调用的事件
            image.onload = ()=>{
                let width = image.width;
                let height = image.height;
                let m = width / height;

                let canvas = document.createElement('canvas');
                canvas.height = 50;
                canvas.width = 50*m;
                let ctx= canvas.getContext('2d');
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

    autoScroll = (t) => {
        let content = document.querySelector('.content');
        let content2 = document.querySelector('.content2');
        let box = document.querySelector('.review_box');
        // 是否需要滚动
        let contentHeight = content.getBoundingClientRect().height
        let boxHeight = box.getBoundingClientRect().height
        if (contentHeight < boxHeight) {
            return 
        }
        content2.innerHTML = content.innerHTML;
        box.scrollTop = 0; // 开始无滚动时设为0
        let timer = setInterval(this.rollStart, t); // 设置定时器，参数t用在这为间隔时间（单位毫秒），参数t越小，滚动速度越快
        // 鼠标移入div时暂停滚动
        box.onmouseover = () => {
            clearInterval(timer);
        }
        // 鼠标移出div后继续滚动
        box.onmouseout = () => {
            timer = setInterval(this.rollStart, t);
        }
    }

    // 开始滚动函数
    rollStart = () => {
        // 上面声明的DOM对象为局部对象需要再次声明
        let content = document.querySelector('.content');
        let ulbox = document.querySelector('.review_box');
        // 正常滚动不断给scrollTop的值+1,当滚动高度大于列表内容高度时恢复为0
        if (ulbox.scrollTop >= content.scrollHeight) {
            ulbox.scrollTop = 0;
        } else {
            ulbox.scrollTop++;
        }
    }
}