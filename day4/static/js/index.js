/*
* @Author: TomChen
* @Date:   2019-07-04 09:41:52
* @Last Modified by:   TomChen
* @Last Modified time: 2019-07-07 10:25:58
*/
(function($){
    var $input = $('.input-item')
    var $ul = $('.doing-item ul')
    $input.on('keydown',function(ev){
        if(ev.keyCode == 13){
           //发送ajax请求
           $.ajax({
            url:"/add",
            type:"post",
            data:{
                task:$input.val()
            },
            dataType:"json",
            success:function(result){
                //请求成功
                if(result.code == 0){
                    //1.生成DOM
                    var $dom = $(`<li class="todo-item" data-id="${result.data.id}">${result.data.task}</li>`)
                    //2.插入DOM
                    $ul.append($dom)
                    //3.清空输入框
                    $input.val('')
                }
                //请求失败
                else{
                    alert(result.message)
                }   
            }
           })
        }
    })
    //注意: 由于动态添加DOM节点,这里使用事件代理
    $ul.on('click','li',function(){
        var $this = $(this)
        $.ajax({
            url:'/del',
            type:'get',
            data:{
                id:$this.data('id')
            },
            dataType:'json',
            success:function(result){
                //请求成功
                if(result.code == 0){
                   $this.remove() 
                }
                //请求失败
                else{
                    alert(result.message)
                }
            }
        })
    })
})(jQuery);