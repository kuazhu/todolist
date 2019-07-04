/*
* @Author: TomChen
* @Date:   2019-07-04 09:06:54
* @Last Modified by:   TomChen
* @Last Modified time: 2019-07-04 10:15:33
*/
const http = require('http')
const fs = require('fs')
const path = require('path')
const mime = require('./mime.json')
const server = http.createServer((req,res)=>{
    //请求http://127.0.0.1:3000/index.html
    //返回 index.html的内容
    console.log(req.url)
    //console.log(__dirname)
    /*
    后端处理文件的注意点:
    1. 尽量用绝对路径
    2. 用path.normalize格式化路径
     */
    const filePath = path.normalize(__dirname + "/static/"+req.url)
    //console.log(filePath)
    //读取文件并返回
    fs.readFile(filePath,(err,data)=>{
        if(err){
            //设置响应头
            res.setHeader('Content-Type','text/html;charset=UTF-8')
            res.statusCode = 404
            res.end("<h1>请求页面走丢了</h1>")
        }
        else{
            //根据请求文件的扩展名来决定使用什么MIME
            //.css text/css
            //.html text/html
            //res.setHeader('Content-Type','text/html;charset=UTF-8')
            
            const extname = path.extname(filePath)
            //console.log("extname",extname)
            //console.log("mime",mime)
            
            const mimeType = mime[extname] || "text/plain"
            res.setHeader('Content-Type',mimeType+';charset=UTF-8')
            res.end(data)  
        }
    })
})

server.listen(3000,'127.0.0.1',()=>{
    console.log('server is running on http://127.0.0.1:3000')
})