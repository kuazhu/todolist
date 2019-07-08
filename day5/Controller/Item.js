/*
* @Author: TomChen
* @Date:   2019-07-08 09:28:51
* @Last Modified by:   TomChen
* @Last Modified time: 2019-07-08 09:40:22
*/
const path = require('path')
const querystring = require('querystring')

const swig = require('swig')

const { get:getItems,add:addItem,del:delItem } = require('../Model/item.js')

class Item {
    //action
    index(req,res,...args){
        //获取所有的数据
        getItems()
        .then(data=>{
            //生成一个模版函数            
            const filePath = path.normalize(__dirname + "/../View/Item/index.html")
            const template = swig.compileFile(filePath)
            //用模版函数生成html代码
            const html = template({
                data:data
            })
            res.end(html)
        })
        .catch(e=>{
            console.log(e)
            //设置响应头
            res.setHeader('Content-Type','text/html;charset=UTF-8')
            res.statusCode = 404
            res.end("<h1>请求页面走丢了</h1>")            
        })        
    }
    add(req,res,...args){
       //1.获取浏览器端的参数
        let body = '';
        req.on('data',(chunk)=>{
            body += chunk
        })
        req.on('end',()=>{
            const query = querystring.parse(body)
            //2.根据参数生成任务对象并且存储到文件中
            addItem(query.task)
            .then(obj=>{
                //3.返回新添加的任务对象
                res.end(JSON.stringify({
                    code:0,
                    message:'添加任务成功',
                    data:obj
                })) 
            })
            .catch(e=>{
                console.log(e)
                res.end(JSON.stringify({
                    code:1,
                    message:'添加任务失败'
                })) 
            })                       
        })
    }
    del(req,res,...args){
         //1.获取浏览器端的参数
        const id = args[0]
        //2.根据参数删除任务并且存储到文件中
        delItem(id)
        .then(()=>{
            //3.返回数据
            res.end(JSON.stringify({
                code:0,
                message:'删除任务成功',
            })) 
        })
        .catch(e=>{
            console.log(e)
            res.end(JSON.stringify({
                code:1,
                message:'删除任务失败'
            })) 
        }) 
    }
}

module.exports = new Item()