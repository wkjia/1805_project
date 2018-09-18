require(['config'],function(){
    require(['jquery'],function(){
        //引入头部
        $('#gd_header').load('common.html #header');

        //引入导航条部分
        //引入导航条部分，并且执行动画效果
        $('#gd_nav').load('common.html #daoh',function(){
            $('.navlist li').hover(function(){
            $(this).find('.subNav').animate({height: 'toggle'}, "fast");
            },function(){
                    $(this).find('.subNav').animate({height: 'toggle'}, "fast");
            })
        });

        //引入底部
        //引入公共底部部分
        $('#gd_footer').load('common.html #last');

        //引入中间部分页面
        $('#server').load('common.html #center,#center_l');


    })
})