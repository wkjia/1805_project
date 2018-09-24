;require(['config'],function(){
    require(['jquery','jquery.lxzoom','common'],function($){

        //接收列表页面传递过来的商品信息
        //进行转码
        var params = decodeURI(location.search);//str
        // console.log(params)//?id=9&url=../img/gd1 (9).jpg&type=凡客衬衫 吉国武 免烫 小方领 短袖4.4 浅灰&sale=398&price=118&evalute=97
        //处理传递过来数据，拆分格式
         params = params.slice(1);
         params = params.split('&');
         //遍历数据写成对象模式
         var obj={};
         params.map(function(item,idx){
            var arr = item.split('=')
            // console.log(arr)
            obj[arr[0]] = arr[1]
         })
         console.log(obj)
         //生成中间部分数据
         $('#styleinfo').html(obj.type)
         $('.biaoti').html(obj.type)
         var jg = obj.sale!='' ?obj.sale:obj.price;
         var cx = obj.sale!='' ?'特惠价：':'售价';
         $('.jg').prepend(jg)
         $('.tehuiMoney').prepend(cx)
         $('#midimg').attr({'title':obj.type})
         $('#midimg').attr({'src':obj.url})
         $('#midimg').attr({'data-big':obj.url})

         //吸顶菜单效果(滚动触发事件)
        $(window).scroll(function(){
            if(window.scrollY>=$('.danpin_YhTsBox ').offset().top){
              $('.cd').css({ 'display':'block'})
              $('.cd').find('h2').text(obj.type) 
            }
            if(window.scrollY<$('.danpin_YhTsBox ').offset().top){
              $('.cd').css({'display':'none'})  
            }
        });

         //放大镜效果
          // 插件是否支持链式调用
            $('.goods').lxzoom({width:440,height:400}).addClass('box');
            // console.log($('.goods'))
            // $('.small').on('click','img',function(){
            //     $('.goods img').attr({
            //         'src':this.src,
            //         'data-big':this.dataset.big
            //     });
            // })


         //点击勾选效果
         $('.selSize').on('click','li',function(){
            // $(this).siblings('li')
            $(this).siblings('li').find('span').remove()
            $(this).append('<span/>')
         })

         $('.selColor').on('click','li',function(){
            // $(this).siblings('li')
            $(this).siblings('li').find('.colorHoverok').remove()
            $(this).append('<span class="colorHoverok"></span>')
            $(this).siblings('li').removeClass('onlickColor')
            $(this).addClass('onlickColor')

         })




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


        /*---------------------------------------------------------------------------------*/
        //点击加入购物车按钮(将商品信息写入cookie当中)
        $('#addToShoppingCar').click(function(){
            $('.carlist').css({'display':'block'})
            //将商品信息写入cookie
               
            //获取cookie
            var carlist = Cookie.get('carlist');
            if(carlist===''){
                carlist = [];
            }else{
                carlist = unescape(carlist)
                // console.log(carlist)
                carlist = JSON.parse(carlist);
                // console.log(carlist)
            }   

            //添加商品到购物车列表(所需的参数：商品的总数量，总价格)
            
            //计算总价
            var total = 0;
            var qty = 0;
            for(var i=0;i<carlist.length;i++){
                var sum = carlist[i].sale!='' ?carlist[i].sale:carlist[i].price;
                // console.log(qty)
                total +=sum*carlist[i].qty;
                qty +=carlist[i].qty

            }
            //总数量
            // console.log(carlist)
            // console.log(qty)
            $('#shopcarcount').html(qty)
            //总价格
            $('#shopcarprice').html('￥'+total);
            
            //过滤商品信息
            // console.log($.type(carlist))
            // console.log(obj.id)
            var currentGoods = carlist.filter(
                function(item){
                return item.id === obj.id;
            });
            // console.log(currentGoods)
            //商品存在，在原有的数量加上现在添加商品数量
            var input = $('#selectedAmount').val();
            console.log(input)
            if(currentGoods.length>0){
                currentGoods[0].qty = currentGoods[0].qty*1 + input*1;
            }
            //如果商品不存在，就添加商品
            else{
                var toCar = {
                    id:obj.id,
                    url:obj.url,
                    type:obj.type,
                    sale:obj.sale,
                    qty:input,
                }
                //将当前商品写入数组当中
                carlist.push(toCar);
            }
            console.log(carlist)
            //添加cookie
            Cookie.set('carlist',JSON.stringify(carlist),{Path:'/html'})
            Cookie.set('cc',JSON.stringify(carlist),{Path:'/'})

            //点击去购物车按钮，跳转到结算页面
            $('.CarBox_goCar').click(function(){
                location.href = 'car.html';
                //把商品信息传递到结算页面
            })
            
        })
        /*---------------------------------------------------------------------------------*/
        //点击关闭按钮（关闭购物车列表）
        $('.close').click(function(){
            $('.carlist').css({'display':'none'});
        })
        
        

    })
});