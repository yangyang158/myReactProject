'use strict';
import i18next from 'i18next';
import _ from 'lodash';

function Ajax() {
    let ajax = {}

    ajax.prefix = '/api';


    let methods = {
        get: 'GET',
        put: 'PUT',
        del: 'DELETE',
        post: 'POST',
    };

    for (let key in methods) {
        ajax[key] = function (url, params) {
            return request(methods[key], url, params);
        };
    }

    function request(method, url, params) {
        return new Promise(function (resolve, reject) {
            sendRequest(method, url, params, resolve, reject);
        });
    }

    function sendRequest(method, url, params, resolve, reject) {
        if(method === 'GET'){
            let str = [];
            for(let key in params){
                str.push(`${key}=${params[key]}`);
            }
            url = url + '?' + str.join('&');
        }
        var _opts = {method, url, params, resolve, reject};
        console.log('_opts', _opts)
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if(xhr.readyState===4 && xhr.status===200){
                console.log('xmlhttp.responseText', xhr.responseText)
            }
        }
        let newUrl = ajax.prefix + url + '&_v=' + Math.floor(Math.random() * 1000000);
        xhr.open(method, newUrl);
        xhr.send();
    }


    return ajax;
}

let ajax = Ajax();
ajax.Ajax = Ajax;
ajax.clone = function () {
    return _.clone(ajax);
}

export default ajax;
