/*
* @Author: TomChen
* @Date:   2019-07-04 09:06:54
* @Last Modified by:   TomChen
* @Last Modified time: 2019-07-05 10:54:22
*/
const http = require('http')
const fs = require('fs')
const path = require('path')
const url = require('url')

const swig = require('swig')

const mime = require('./mime.json')
const { get } = require('./Model/item.js')


const server = http.createServer((req,res)=>{
    console.log(req.method+":"+req.url)
    const parsedUrl = url.parse(req.url,true)
    const pathname = parsedUrl.pathname
    //路由处理
    //处理首页
    if(pathname == "/index.html" || pathname == "/"){
        //获取所有的数据
        get()
        .then(data=>{
            //生成一个模版函数            
            const filePath = path.normalize(__dirname + "/static/index.html")
            const template = swig.compileFile(filePath)
            //用模版函数生成html代码
            const html = template({
                data:data
            })
            res.end(html)
        })
        .catch(e=>{
            console.log(e)
        })
    }
    //处理添加
    else if(pathname == "/add"){
        res.end(JSON.stringify({
            code:0
        }))
    }
    //处理静态资源
    else{
        const filePath = path.normalize(__dirname + "/static/"+req.url)
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

})

server.listen(3000,'127.0.0.1',()=>{
    console.log('server is running on http://127.0.0.1:3000')
})