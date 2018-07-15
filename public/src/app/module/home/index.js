import React from 'react';
import PropTypes from 'prop-types';
import {observable, action} from 'mobx';
// import { Observable} from 'rxjs/Observable';
import ajax from '../../../../js/ajax';

console.log('ajax', ajax.get)
export default new class HomeStore{
    @observable count = 0;
    @observable arr = [];

    @action
    add = ()=>{
        this.count += 1;
        this.arr.push(this.count)
        console.log('ajax', ajax)
        ajax.get('/home/cardList', {'a':1,'b':2}).then(data=>{
            console.log(data);
        })
    }
}