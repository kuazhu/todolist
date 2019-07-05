/*
* @Author: TomChen
* @Date:   2019-07-05 09:41:58
* @Last Modified by:   TomChen
* @Last Modified time: 2019-07-05 09:51:58
*/
const fs = require('fs')
const path = require('path')
const util = require('util')

const readFile = util.promisify(fs.readFile)

const dataPath = path.normalize(__dirname + "/../data/item.json")

async function get(){
    const data = await readFile(dataPath)
    const arr = JSON.parse(data)
    return arr
}

module.exports = {
    get
}