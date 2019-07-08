/*
* @Author: TomChen
* @Date:   2019-07-08 09:47:17
* @Last Modified by:   TomChen
* @Last Modified time: 2019-07-08 09:48:21
*/
class Index {
    index(req,res,...args){
        res.end('<a href="/Item/index">go to todolist</a>')
    }
}

module.exports = new Index()