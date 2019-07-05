/*
* @Author: TomChen
* @Date:   2019-07-04 09:41:52
* @Last Modified by:   TomChen
* @Last Modified time: 2019-07-05 09:09:06
*/
(function($){
    var $input = $('.input-item')
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
                console.log(result)    
            }
           })
        }
    })
})(jQuery);