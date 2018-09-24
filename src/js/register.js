;require(['config'],function(){
    require(['jquery','common'],function($){

        //引入底部
        $('.smallbox').load('common.html #last');

        //生成随机字母验证码
            yzm()
        function yzm(){
            var arr = ['A','B','C','D','E','F','G','H','I','J','L','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
            // console.log(9999)
            //生成0-25的随机数字作为索引值
            //生成随机的六位字母，获取随机的验证码
            var yzm = ''
            for(var i = 0;i<=5;i++){
                yzm+=arr[randomNumber(0,25)]
            }
            // console.log(yzm)
            $('.d_yzm').text(yzm);
            $('.d_yzm').css({'font-size':'25px','color':randomColor(16),'font-weight':'bold'})
            var dd = randomColor(16)
        }

        //点击验证码处，更换验证码
        $('.h_yzm').click(function(){
            yzm();
        })

        //点击切换，登录页面
        $('.qiehuan').on('click','li',function(){
            $(this).css({'background':'#bb2b34','color':'white','font-weight':'bold'})
            $(this).siblings('li').css({'background':'#f5f5f5','color':'#656565','font-weight':'normal'})

            //切换输入框
            if($(this)[0]==$('.qiehuan2')[0]){
                $('.input').css({'display':'block'});
                $('.pt').css({'display':'none'});
                console.log(9999)
            }
            if($(this)[0]==$('.qiehuan1')[0]){
                $('.pt').css({'display':'block'});
                $('.input').css({'display':'none'});
                console.log(8888)
            }
        })

        //点击登录按钮，跳转到首页(发起ajax请求，验证用户用户信息是否正确)
        $('.denglu').click(function(){
            //获取用户信息
            var number  = $('.number2').val();
            var password = $('.password2').val();
            console.log(password,number)
            //发起ajax请求
            $.ajax({
                url:'../api/mysql/register.php',
                type:'get',
                data:{
                    number: number,
                    password:password,
                },
                success:function(xhr){
                    if(xhr=='exist'){
                        //用户信息正确，跳转首页页面
                        location.href = '../index.html?'+number+'&'+password;
                    }else if(xhr=='inexistence'){
                        //用户信息错误
                        alert('用户信息错误')
                    }
                }
            })
            
            
        })


    })
});