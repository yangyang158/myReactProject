import {observable, action, computed } from 'mobx';

export default new class FileDetailStore {

    @observable form = '';
    @observable visible = false;
    @observable mouseInBox = false;
    timer = null

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

    // 自滚动
    destory = () => {
        this.clearTimeId()
    }

    clearTimeId = () => {
        clearInterval(this.timer)
    }

    autoScroll = (t) => {
        let content = document.querySelector('.content');
        let content2 = document.querySelector('.content2');
        let box = document.querySelector('.review_box');
        // 鼠标移入div时暂停滚动
        box.onmouseenter = () => {
            this.mouseInBox = true
            this.clearTimeId()
        }
        // 鼠标移出div后继续滚动
        box.onmouseleave = () => {
            this.mouseInBox = false
            this.clearTimeId()
            this.timer = setInterval(this.rollStart, t);
        }
        if (!box || !content) {
            return 
        }
        // 是否需要滚动
        let contentHeight = content.getBoundingClientRect().height
        let boxHeight = box.getBoundingClientRect().height
        if (contentHeight < boxHeight) {
            return 
        }
        content2.innerHTML = content.innerHTML;
        box.scrollTop = 0; // 开始无滚动时设为0
        this.clearTimeId()
        // 如果鼠标在元素内部，不执行
        if(!this.mouseInBox){
            this.timer = setInterval(this.rollStart, t); // 设置定时器，参数t用在这为间隔时间（单位毫秒），参数t越小，滚动速度越快
        }
    }

    // 开始滚动函数
    rollStart = () => {
        // 上面声明的DOM对象为局部对象需要再次声明
        let content = document.querySelector('.content');
        let ulbox = document.querySelector('.review_box');
        if (!content || !ulbox) return 
        // 正常滚动不断给scrollTop的值+1,当滚动高度大于列表内容高度时恢复为0
        if (ulbox.scrollTop >= content.scrollHeight) {
            ulbox.scrollTop = 0;
        } else {
            ulbox.scrollTop++;
        }
    }


    // 长列表优化:一共24条数据,每页8条，分3页
    dataLists = [{
        rowIndex: 0,
        value: 1
    }, {
        rowIndex: 1,
        value: 2
    }, {
        rowIndex: 2,
        value: 3
    }, {
        rowIndex: 3,
        value: 4
    }, {
        rowIndex: 4,
        value: 5
    }, {
        rowIndex: 5,
        value: 6
    }, {
        rowIndex: 6,
        value: 7
    }, {
        rowIndex: 7,
        value: 8
    }, {
        rowIndex: 8,
        value: 9
    }, {
        rowIndex: 9,
        value: 10
    }, {
        rowIndex: 10,
        value: 11
    }, {
        rowIndex: 11,
        value: 12
    }, {
        rowIndex: 12,
        value: 13
    }, {
        rowIndex: 13,
        value: 14
    }, {
        rowIndex: 14,
        value: 15
    }, {
        rowIndex: 15,
        value: 16
    }, {
        rowIndex: 16,
        value: 17
    }, {
        rowIndex: 17,
        value: 18
    }, {
        rowIndex: 18,
        value: 19
    }, {
        rowIndex: 19,
        value: 20
    }, {
        rowIndex: 20,
        value: 21
    }, {
        rowIndex: 21,
        value: 22
    }, {
        rowIndex: 22,
        value: 23
    }, {
        rowIndex: 23,
        value: 24
    }]
    @observable startIndex = 0

    @computed get showDataLists() {
        // 每页需要多展示1条，避免空白
        return this.dataLists.slice(this.startIndex, this.startIndex + 8 + 1)
    }

    @action
    onScroll = (e) => {
        let scrollTop = e.target.scrollTop
        let count = Math.floor(scrollTop / 30)
        this.startIndex = count
    }
}