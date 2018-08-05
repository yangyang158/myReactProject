import {observable, action} from 'mobx';
import ajax from '../../../../js/ajax';

export default new class HomeStore{
    @observable count = 0;
    @observable arr = [];

    @action
    add = ()=>{
        this.count += 1;
        this.arr.push( this.count)   
        ajax.get('/home/cardList', {'a':1,'b':2}).then(data=>{
        })
    }
}