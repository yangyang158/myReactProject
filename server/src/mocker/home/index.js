import {get, post} from 'koa-router-decors';

export default class Home{
    
    @get('/home/cardList')
    async GetCardeList(ctx){
        ctx.body = {
            "result": true,
            "data": ['宫格', '报表']
        };
    }

}