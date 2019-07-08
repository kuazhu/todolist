/*
* @Author: TomChen
* @Date:   2019-07-04 09:06:54
* @Last Modified by:   TomChen
* @Last Modified time: 2019-07-08 09:40:39
*/
const http = require('http')
const fs = require('fs')
const path = require('path')
const url = require('url')
const querystring = require('querystring')

const swig = require('swig')

const mime = require('./mime.json')
const { get,add,del } = require('./Model/item.js')


const server = http.createServer((req,res)=>{
    console.log(req.method+":"+req.url)
    const parsedUrl = url.parse(req.url,true)
    const pathname = parsedUrl.pathname
    /*
        约定:
           静态资源: 以"/static/"开头的请求是静态资源
           路由的格式: /Controller/action/arg1/arg2/arg3....
     */

     //处理静态资源
     if(pathname.startsWith("/static/")){
        const filePath = path.normalize(__dirname+req.url)
        fs.readFile(filePath,(err,data)=>{
            if(err){
                //设置响应头
                res.setHeader('Content-Type','text/html;charset=UTF-8')
                res.statusCode = 404
                res.end("<h1>请求页面走丢了</h1>")
            }
            else{
                const extname = path.extname(filePath)
                const mimeType = mime[extname] || "text/plain"
                res.setHeader('Content-Type',mimeType+';charset=UTF-8')
                res.end(data)  
            }
        }) 
     }
     //路由处理
     else{
        //路由的解析
        const paths = pathname.split('/')
        const controller = paths[1] || 'Index'
        const action = paths[2] || 'index'
        const args = paths.slice(3)
        /*
            根据解析结果调用相关的controller里的action
            约定:
                controller文件存储在 ./Controller/
         */
        try{
            const mode = require('./Controller/'+controller)
            mode[action] && mode[action].apply(null,[req,res].concat(args))
        }
        catch(e){
            console.log(e)
            res.setHeader('Content-Type','text/html;charset=UTF-8')
            res.statusCode = 500
            res.end("请求错误")            
        }
     }
})

server.listen(3000,'127.0.0.1',()=>{
    console.log('server is running on http://127.0.0.1:3000')
})