import {get, post} from 'koa-router-decors';

export default class Home{
    
    @get('/home/cardList')
    async GetCardeList(ctx){
        ctx.body = {
            "result": true,
            "data": ['宫格', '报表']
        };
    }

    @get('/common/jsonP')
    async GetJsonP(ctx){
        let func = ctx.query.callback
        // 简单的响应
        ctx.body = func + `('哈哈哈哈')`
    }

}