//引入模块
require(['config'],function(){

    require(['jquery','bootstrap','common','carousel'],function($){

        //接收登录页面传递过来的参数
        var params = decodeURI(location.search);
        params = params.slice(1);
        console.log(params)
        if(params!=''){
            $('.top').text( params)
            $('.denglu').text('退出登录')
            $('.zhuc').text('更换用户')
            $('.zhuc').css({'color':'red'})
            $('.denglu').css({'color':'red'})
        }

        //点击退出登录
        $('.denglu').click(function(){
            location.href = '../index.html';
        })
        //导航条动画效果
        $('.navlist li').hover(function(){
                $(this).find('.subNav').animate({height: 'toggle'}, "fast");
                // $(this).find('.subNav').css({'display':'block'})
        },function(){
                $(this).find('.subNav').animate({height: 'toggle'}, "fast");
                // $(this).find('.subNav').css({'display':'none'})
        })

       
        //返回顶部的效果
        //获取目标元素
        var  toTop = $('.BlackTop');
        // console.log(toTop)
        toTop.on('click',function(){

            var timer = setInterval(function(){

                var  speed = Math.ceil(window.scrollY/5);

                scrollBy(0,-speed);

                if(window.scrollY <= 0){
                    clearInterval(timer);
                }
            },30)
        })



        /*
        
         走动时间的效果(倒计时)
            倒计时思路：
                    1）指定结束时间
                    2）不断拿当前时间跟结束时间对比，计算差值
                    3）把差值转换成《剩余时间》
                    4）拼接时间格式，写入页面
                    5）倒计时结束时
                        * 停止定时器
                        * 替换购买按钮
                        * 隐藏倒计时
                                                  */
        //指定结束时间
        var endTime = '2018-10-18 09:13:00'
        //将当前时间转换成毫秒数
        var end = Date.parse(endTime)
        time()
        //不断的拿当前时间跟结束时间比，计算差值
        var timer = setInterval(time,1000)
        //获取当前时间
        function time(){

            var now = Date.now();
            //计算差值(单位：s)
            var offset = parseInt((end -now)/1000);
            //倒计时结束（差值为零）
            if(offset<=0){
                //停止定时器
                clearInterval(timer);
                $('.t2').text(00)
                $('.t3').text(00)
                $('.t4').text(00)
            }

            //转换时间格式，写入到页面中
            /*
                    剩余秒数->x天x时x分x秒：
                        * 20s -> 0天0时0分20秒
                        * 65s -> 0天0时1分5秒
                        * 72m -> 0天1时12分x秒

                    求余：剩余时间
                 */
                
            var sec = offset%60;//（转换成分钟，得到剩余的秒数）
            var min = Math.floor(offset/60)%60;
            var hour = Math.floor(offset/60/60)%24;
            var days = Math.floor(offset/60/60/24);
            //补零操作
            sec = sec<10? '0'+sec:sec;
            min = min<10? '0'+min:min;
            hour = hour<10? '0'+hour:hour;
            days = days<10? '0'+days:days;
            //将时间格式写到页面中
            // console.log(sec,min,hour,days)
            $('.t2').text(hour)
            $('.t3').text(min)
            $('.t4').text(sec)
            //  time()
        }

        
        
    })
})