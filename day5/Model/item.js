/*
* @Author: TomChen
* @Date:   2019-07-05 09:41:58
* @Last Modified by:   TomChen
* @Last Modified time: 2019-07-07 10:21:17
*/
const fs = require('fs')
const path = require('path')
const util = require('util')

const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

const dataPath = path.normalize(__dirname + "/../data/item.json")

async function get(){
    const data = await readFile(dataPath)
    const arr = JSON.parse(data)
    return arr
}

async function add(task){
    //1.读取需要写入的文件
    const data = await readFile(dataPath)
    //2.把读入的数据转换为JSON(array)
    const arr = JSON.parse(data)
    //3.根据传入的参数生成任务对象并且追加到数组中
    const obj = {
        id:Date.now().toString(),
        task:task
    }
    arr.push(obj)
    //4.把新的数组写入到文件当中
    await writeFile(dataPath,JSON.stringify(arr))
    //5.返回新的任务对象
    return obj
}
async function del(id){
    //1.读取需要写入的文件
    const data = await readFile(dataPath)
    //2.把读入的数据转换为JSON(array)
    const arr = JSON.parse(data)
    //3.根据传入的ID删除数组中对应的对象,生成新的数组
    const newArr = arr.filter((item)=>{
        return item.id != id
    })
    //4.把新的数组写入到文件当中
    await writeFile(dataPath,JSON.stringify(newArr))
}



module.exports = {
    get,
    add,
    del
}