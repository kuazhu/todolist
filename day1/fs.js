/*
* @Author: TomChen
* @Date:   2019-07-03 10:19:04
* @Last Modified by:   TomChen
* @Last Modified time: 2019-07-03 10:33:42
*/
const fs = require('fs')

//fs.readFile("./a1.txt",(err,data)=>{})

/*
fs.readFile("./a1.txt",(err,data)=>{
    if(err){
        console.log(err)
    }else{
        console.log(data)
    }
})
*/
fs.writeFile("./a111.txt","LiYu",{flag:'a'},(err)=>{
    if(err){
        console.log('write file error!')
    }
})