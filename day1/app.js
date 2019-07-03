/*
* @Author: TomChen
* @Date:   2019-07-03 09:50:31
* @Last Modified by:   TomChen
* @Last Modified time: 2019-07-03 09:56:33
*/
const http = require('http')

const server = http.createServer((req,res)=>{
    res.end('Hello LiYu')
})

server.listen(3000,'127.0.0.1',()=>{
    console.log('server is running on http://127.0.0.1:3000')
})