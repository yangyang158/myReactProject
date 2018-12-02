import {post, get} from 'koa-router-decors';

export default class Upload{
    
    @post('/common/upload')
    async GetCardeList(ctx){
        console.log(ctx, '------', ctx.body, ctx.query, ctx.request)
        ctx.body = {
            "result": true,
            "data": {
                id: "e7797abf-c3d4-4e2d-abd2-283a1cbf5544",
                name: "3ec39bb8-8998-490d-8f57-0778889e6cb9_20181022113618292.png",
                progress: 100,
                status: "done",
                url: "https://tse1.mm.bing.net/th?id=OIP.YV92RHDwHgMT9QQs8tOeAAHaEK&pid=Api"
            }
        };
    }

}