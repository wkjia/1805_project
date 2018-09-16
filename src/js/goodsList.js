
//引入模块
require(['config'],function(){
    require(['jquery'],function($){
    //引入公共头部
        // var get =function(){
            // return  new Promise(resolve=>{
                $('.g_header').load('common.html #header');
                $('.nav').load('common.html #daoh',function(){
                    // console.log($('li'))
                    $('.navlist li').hover(function(){
                    $(this).find('.subNav').animate({height: 'toggle'}, "fast");
                    },function(){
                            $(this).find('.subNav').animate({height: 'toggle'}, "fast");
                    })
                });
                // resolve();
            // })
        // }
        // get().then(function(){
            //导航条
            //导航条动画效果
            // console.log($('li'))
            
        // })

    })
})