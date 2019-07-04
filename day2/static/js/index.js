/*
* @Author: TomChen
* @Date:   2019-07-04 09:41:52
* @Last Modified by:   TomChen
* @Last Modified time: 2019-07-04 10:30:44
*/
(function($){
    var $input = $('.input-item')
    $input.on('keydown',function(ev){
        if(ev.keyCode == 13){
            alert('going...')
        }
    })
})(jQuery);