require(['config'],function(){
    require(['jquery','common'],function($){


        //引入底部的公共部分
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
            $('.dv').text(yzm);
            $('.dv').css({'font-size':'25px','color':randomColor(16),'font-weight':'bold'})
            var dd = randomColor(16)
        }

        //点击验证码处，更换验证码
        $('.dv').click(function(){
            yzm();
        })
        //点击获取短信验证码，判断输入框的值是否与验证码一致
        // console.log($('.dv').text())
        $('.bt').click(function(){
            //判断手机号码处是否有值，且为手机号码格式
            if($('.zm2').val()=='' || !/^1[3-9]\d{9}$/.test($('.zm2').val())){
                $('.t2').css({'display':'block'})

                $('.t2').text('请输入有效手机号');
                    if($('.zm').val()==$('.dv').text()){

                }else if($('.zm').val()!=$('.dv').text()){
                    yzm();
                    $('.t1').text('请输入图片上的验证码后，再获取短信验证码')
                }
            }else if($('.zm2').val()!='' && /^1[3-9]\d{9}$/.test($('.zm2').val())){
                        $('.bt').text('正在发送')
            }

        })



        //输入框失去焦点时触发事件
        $('.signIn').on('blur','input',function(){
            switch($(this)[0]){
                case $('.zm')[0]:
                            zm_tishi();
                            break;
                case $('.zm2')[0]:
                            $('.zm2').css({'border-color':'#ccc'});
                            $('.t2').css({'display':'none'});
                            tishi2();
                            break;
                case $('.zm3')[0]:
                            $('.zm3').css({'border-color':'#ccc'});
                            $('.t3').css({'display':'none'});
                            break;
                case $('.zm4')[0]:
                            $('.zm4').css({'border-color':'#ccc'});
                            $('.t4').css({'display':'none'});
                            //密码框格式提示
                            mima();
                            break;
                case $('.zm5')[0]:
                            $('.zm5').css({'border-color':'#ccc'});
                            $('.t5').css({'display':'none'});
                            sure();
                            break;

            }
        })

        //输入框获取焦点时触发事件
        $('.signIn').on('focus','input',function(){
             switch($(this)[0]){
                case $('.zm')[0]:
                            zm_gl();
                            break;
                case $('.zm2')[0]:
                            $('.t2').css({'display':'block'});
                            $('.t2').text('请填写真实的手机号，并且进行短信验证');
                            $('.zm2').css({'border-color':'skyblue'});
                            break;
                case $('.zm3')[0]:
                            $('.zm3').css({'border-color':'skyblue'});
                            $('.t3').css({'display':'block'});
                            $('.t3').text('请输入手机接收到短信验证码');
                            break;
                case $('.zm4')[0]:
                            $('.zm4').css({'border-color':'skyblue'});
                            $('.t4').css({'display':'block'});
                            $('.t4').text('6-16位字符，可使用字母、数字或者符号的组合');
                            break;
                case $('.zm5')[0]:
                            $('.zm5').css({'border-color':'skyblue'});
                            $('.t5').css({'display':'block','background-color':'white','border':'none 0'});
                            $('.t5').text('请再次输入登录密码，两次输入必须一致');
                            break;
            }
        })

        //限定手机收入框中只能输入十一位
        $('.zm2').keyup(function(){
                var num = $('.zm2').val().slice(0,13)
                var num2 = num.slice(0,11)
                // console.log(num)
                // console.log(num2)
                $('.zm2').val(num2)
        })
        //限定密码收入框中只能输入十六位
        $('.zm4').keyup(function(){
                var num = $('.zm4').val().slice(0,17)
                var num2 = num.slice(0,16)
                // console.log(num)
                // console.log(num2)
                $('.zm4').val(num2)
        })


        //封装函数，失去焦点时在第一行的输入框中，设置提示信息
        function zm_tishi(){
            $('.zm').css({'border-color':'#ccc'})
            $('.t1').css({'display':'block'})
            $('.t1').text('请输入图片验证码')   
            if($('.zm').val()!=''){
                $('.t1').css({'display':'none'})
            }
        }
        //封装函数，获取焦点时在第一行的输入框中
        function zm_gl(){
            $('.zm').css({'border-color':'skyblue'});
        }
        function tishi2(){
            if(!/^1[3-9]\d{9}$/.test($('.zm2').val())){
                $('.t2').css({'display':'block'})
                $('.t2').text('请输入有效手机号')
                console.log(555)
                return
            }
        }

        //勾选高亮效果
        $(window).on('click',function(){
            if($('#chk_agreen').prop('checked')){
                $('.submitStyle').css({'background':'#b42025'})
            }else{
                $('.submitStyle').css({'background':'#9A9A9A'})
            }

        })

        //密码框提示
        function mima(){
            if(!/^\S+$/.test($('.zm4').val())&& $('.zm4').val() !=''){
                $('.t4').css({'display':'block'});
                $('.t4').text('密码中不允许存在空格，请重新输入');
                $('.v2reg_Safetyinfo').css({'display':'none'})
                return
            }
            if($('.zm4').val().length<6 && $('.zm4').val() !=''){
                $('.t4').css({'display':'block'});
                $('.t4').text('密码必须大于六位');
                $('.v2reg_Safetyinfo').css({'display':'none'})
                return
            }
            //密码强度的判断
            if(/^\S{6,16}$/.test($('.zm4').val())){
                var reg = $('.zm4').val();
                $('.v2reg_Safetyinfo').css({'display':'none'})
                //遍历字符串，根据不同的情况判断强度
                    //正则表达式
                        /*
                            数字：/\d+/
                            小写字母：/[a-z]+/
                            大写字母：/[A-Z]+/
                            特殊符号：/[~!@#\$%^&*\(\)\{\};,.\?\/'"]+/
                         */
                    if(/\d+/.test(reg)&&/[a-z]+/.test(reg)&&/[A-Z]+/.test(reg)&&/[~!@#\$%^&*\(\)\{\};,.\?\/'"]+/.test(reg)){
                        $('.v2reg_Safetyinfo').css({'display':'block'})
                        $('.v2reg_Class').text('强');
                        $('.v2regimg_01').css({'background-position':'0 -1139px'})
                        return
                    }

                    if(/\d+/.test(reg)&&/[a-z]+/.test(reg)||/\d+/.test(reg)&&/[A-Z]+/.test(reg)||/\d+/.test(reg)&&/[~!@#\$%^&*\(\)\{\};,.\?\/'"]+/.test(reg)||/[a-z]+/.test(reg)&&/[A-Z]+/.test(reg)||/[a-z]+/.test(reg)&&/[~!@#\$%^&*\(\)\{\};,.\?\/'"]+/.test(reg)||/[A-Z]+/.test(reg)&&/[~!@#\$%^&*\(\)\{\};,.\?\/'"]+/.test(reg)){
                        console.log(6666)
                        $('.v2reg_Safetyinfo').css({'display':'block'})
                        $('.v2reg_Class').text('中');
                        $('.v2regimg_01').css({'background-position':'0 -1117px'})
                        return 
                    }

                    if(/\d+/.test(reg)||/[a-z]+/.test(reg)||/[a-z]+/.test(reg)||/[A-Z]+/.test(reg)||/[~!@#\$%^&*\(\)\{\};,.\?\/'"]+/.test(reg)){
                        $('.v2reg_Safetyinfo').css({'display':'block'})
                    }
            }
        }

        //再次确认密码
        function sure(){
            if($('.zm4').val()!=$('.zm5').val()){
                $('.zm5').css({'border-color':'skyblue'});
                $('.t5').css({'display':'block','background-color':'white','border':'none 0'});
                $('.t5').text('两次密码不一致，请重新输入');
            } else{
                $('.t5').css({'display':'none'});
            }
        }
       
        //点击注册按钮实现注册用户信息
        $('.submitStyle').click(function(){
            if($('.t2').css('display')=='none' &&  $('.t5').css('display')=='none' && $('#chk_agreen').prop('checked') && $('.zm2').val()!='' && $('.zm5').val()!=''){
                //在此实现注册效果(先要判断手机号码是否已经注册过)
                var number = $('.zm2').val();
                var password = $('.zm5').val();
                //发起ajax请求
                $.ajax({
                    type:'get',
                    url:'../api/mysql/signIn.php',
                    data:{
                        number: number,
                        password:password,
                    },
                    success:function(xhr){
                        if(xhr=='already'){
                            alert('用户名已存在')    
                        }
                        if(xhr=='success'){
                            alert('注册成功')
                            //跳转到登录页面
                            function jump(){
                                return new Promise(resolve =>{
                                    location.href = '../index.html?'+number;
                                    resolve(); 
                                })
                            }
                            jump().then(function(){
                                console.log($('#skey'))
                            })

                        }
                    }

                })



            }
        })


    })
})