;require(['config'],function(){
    require(['jquery','common'],function(){
        //将商品信息写进cookie里面，本地保存读取
        var cookies = Cookie.get('carlist')
        console.log(cookies)

        //引入底部公共部分
        $('.footer').load('common.html #last',function(){
                $('.footBottom').css({'border-top':'0 none'});
        });
    })
});; // console.log(666)
 ;var Carousel = function (options) {
                //属性
                //默认值,如果没有传就用默认的,传了就用
                let defaults = {
                    ele: '',//必传参数,div
                    imgs: [],//必传参数,图片路径
                    width: 810,
                    height: 320,
                    index: 0,//默认初始索引值
                    page: true,//是否有分页
                    button: true,//是否有点击翻页按钮
                    type: 'horizontal',//动画类型:vertival(垂直),horizontal(水平),fade(淡入淡出)
                    seamless: true,//是否无缝滚动,这个可以不要.
                    duration:5000,//轮播时间
                }

                //扩展默认参数
                this.opt = Object.assign({}, defaults, options);

                this.init();
                // console.log(this);//Carousel
            }

            //方法
            //初始化
            Carousel.prototype.init = function () {
                var opt = this.opt;
                //获取/生成元素
                //绑定事件
                var ele = document.querySelector(opt.ele);

                //指定专有类型
                ele.classList.add('lx-carousel');
                // ele.className = 'lx-carousel';

                //设置样式(宽高)
                ele.style.width = opt.width + 'px';
                ele.style.height = opt.height + 'px';

                //生成图片(ul,li,img)
                let ul = document.createElement('ul');

                //根据图片路径生成li
                ul.innerHTML = opt.imgs.map(url => {
                    return `<li><a href="#"><img src = "${url}"></a></li>`
                }).join('');

                //把第一张图片复制到最后,无缝关键
                ul.appendChild(ul.children[0].cloneNode(true));

                //重新获取ul的长度
                opt.len = ul.children.length;

                //传递len
                this.len = opt.len;

                //给ul添加类型:设置轮播类型
                ul.className = opt.type;//horizontal,vertical,fade

                //水平轮播需要给ul添加宽度
                if (opt.type === 'horizontal') {
                    ul.style.width = opt.width * opt.len + 'px';
                } else if (opt.type === 'fade') {
                    ul.style.width = opt.width + 'px';
                    ul.style.height = opt.height + 'px';
                }

                // console.log(ul.style.width)//1200;

                //写入页面
                ele.appendChild(ul);

                //分页
                if (opt.page) {
                    this.page = document.createElement('div');
                    this.page.className = 'page';
                    for (var i = 0; i < this.len - 1; i++) {
                        var span = document.createElement('span');
                        span.innerHTML = i + 1;

                        //高亮
                        if (i === opt.index) {
                            span.className = 'active';
                        }
                        this.page.appendChild(span);
                    }
                    ele.appendChild(this.page);
                }

                //左右按钮
                if (opt.button) {
                    let btnPrev = document.createElement('span');
                    btnPrev.className = 'btn-prev';
                    btnPrev.innerHTML = '&lt;';

                    let btnNext = document.createElement('span');
                    btnNext.className = 'btn-next';
                    btnNext.innerHTML = '&gt;';

                    ele.appendChild(btnPrev);
                    ele.appendChild(btnNext);
                }

                //传递参数
                this.ul = ul; //第153行
                this.ele = ele;//第142行

                //初始化
                //页面进入时自动轮播
                this.timer = setInterval(this.autoPlay.bind(this), opt.duration);
                this.play();

                //鼠标移入移出
                ele.onmouseover = () => {
                    // console.log(666)
                    this.stop();
                }
                ele.onmouseout = () => {
                    this.timer = setInterval(this.autoPlay.bind(this), opt.duration);
                }

                //点击切换分页
                ele.onmouseover = e => {
                    this.stop();
                    if (e.target.parentNode.className === 'page') {
                        opt.index = e.target.innerText - 1;
                        this.play();
                        // e.stopPropagation()
                    } else if (e.target.className === 'btn-prev') {
                        opt.index--;
                        this.play();
                        // e.stopPropagation()
                    } else if (e.target.className === 'btn-next') {
                        opt.index++;
                        this.play();
                        // e.stopPropagation()
                    }
                }
                 ele.onclick = e => {
                    this.stop();
                    if (e.target.parentNode.className === 'page') {
                        opt.index = e.target.innerText - 1;
                        this.play();
                        // e.stopPropagation()
                    } else if (e.target.className === 'btn-prev') {
                        opt.index--;
                        this.play();
                        // e.stopPropagation()
                    } else if (e.target.className === 'btn-next') {
                        opt.index++;
                        this.play();
                        // e.stopPropagation()
                    }
                }
            }

            //自动播放
            Carousel.prototype.autoPlay = function () {
                this.opt.index++;
                this.play();
            }

            Carousel.prototype.play = function () {
                let opt = this.opt;

                //水平无缝滚动关键2：当滚动到复制那张图片时，瞬间重置回初始状态，并把index改成1
                if (opt.index >= this.len) {
                    opt.index = 1;
                    if (opt.type === 'horizontal') {
                        this.ul.style.left = 0;
                    } else if (opt.type === 'vertical') {
                        this.ul.style.top = 0;
                    }
                } else if (opt.index < 0) {
                    opt.index = this.len - 2;
                    if (opt.type === 'horizontal') {
                        //opt.width指的是div的宽度
                        this.ul.style.left = -opt.width * (this.len - 1) + 'px';
                    } else if (opt.type === 'vertical') {
                        this.ul.style.top = -opt.height * (this.len - 1) + 'px';
                    }

                }

                var obj = {}

                //水平
                if (opt.type === 'horizontal') {
                    obj.left = -opt.index * opt.width;
                    animate(this.ul, obj);
                } else if (opt.type === 'vertical') {
                    obj.top = -opt.index * opt.height;
                    animate(this.ul, obj)
                } else if (opt.type === 'fade') {
                    for (var i = 0; i < this.len; i++) {
                        animate(this.ul.children[i], { opacity: 0});
                    }
                    animate(this.ul.children[opt.index], { opacity: 1});
                    // console.log(this.ul.children[opt.index])
                }

                //页码高亮
                if (this.page) {
                    for (let i = 0; i < this.len - 1; i++) {
                        //如果i等于当前索引值,就添加类名
                        if (i === this.opt.index) {
                            this.page.children[opt.index].className = 'active';
                        } else {
                            this.page.children[i].className = '';
                        }
                    }

                    // 当到达复制图片动画时，高亮显示第一个页码
                    if (this.opt.index === this.len - 1) {
                        this.page.children[0].className = 'active';
                    }
                }


            }

            //停止
            Carousel.prototype.stop = function () {
                clearInterval(this.timer);
            }
            new Carousel({
                ele: '.banner',
                width: 1200,
                height: 535,
                index: 0,
                page: true,
                button: true,
                type: 'horizontal',
                imgs: ["img/b1.jpg","img/b2.jpg","img/b3.jpg","img/b4.jpg","img/b5.jpg","img/b6.jpg"]
            });;
//require配置

;require.config({

    //配置短路径
    paths:{
        'jquery':'../lib/jquery-3.2.1',
        'bootstrap':'../lib/bootstrap',
        'index':'js/index',
        'common':'../lib/common',
        'carousel':'/js/carousel',
        'goodsList':'js/goodsList',
        'goods':'js/goods',
        'jquery.lxzoom':'../lib/jquery-lxzoom/jquery.lxzoom',
        'register':'js/register',
        'signIn':'js/signIn',
        'car':'js/car'

    },

    //配置模块间依赖关系
    //讲明依赖关系（加载过程中自动处理先后顺序）
    
    shim:{        
        'index':['jquery'],
        'bootstrap':['jquery'],
        'carousel':['common'],
        'goodsList':['index'],
        'goods':['jquery'],
        'jquery.lxzoom':['jquery'],
        'signIn':['jquery'],
        'register':['jquery'],
        'car':['jquery']
    },



});;;require(['config'],function(){
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
});;
//引入模块
;require(['config'],function(){
    require(['jquery'],function($){
    //引入公共头部
    $('.g_header').load('common.html #header');

    //引入导航条部分，并且执行动画效果
    $('.nav').load('common.html #daoh',function(){
        $('.navlist li').hover(function(){
        $(this).find('.subNav').animate({height: 'toggle'}, "fast");
        },function(){
                $(this).find('.subNav').animate({height: 'toggle'}, "fast");
        })
    });


    //main部分页面
        //引入中间部分的页面
         // $('.server').load('common.html #center');
     $('.server').load('common.html #center,#center_l');
        //输入框获取焦点触发事件，高亮效果
    $('.searchbarInit').on('focus','input',function(){
        $(this).css({'border-color':'skyblue'})
        $('.searchbarFoused').css({'display':'block'})
    })
    $('.searchbarInit').on('blur','input',function(){
        $(this).css({'border-color':'#ccc'})
        // $('.searchbarFoused').css({'display':'none'})
    })
        //点击空白地方，隐藏状态框
    $("body").on("click", function(e) {
        e = e || window.event;
        // if(! 点击触发动作的区域的父级元素 && 点击区域在显示的状态下}{
        //      ==>即：点击其他body的其他区域 并且 在操作区域显示情况下 才进入判断
        //      ==>该区域隐藏
        // }
        if (!$(e.target).closest('.searchbarTextN50124').length && $(".searchbarTextN50124").is(':visible')) {
            $(".searchbarFoused").hide();
            e.preventDefault()
        }
})
        //发起ajax请求，获取数据生成商品列表
    require()
    function require(){
        $.ajax({
            type:'get',
            url:'../api/mysql/goodsList.php',
            data:{
                qty:44,
            },
            dataType:'json',
            success:function(xhr){
                console.log(xhr)//$.type(xhr)
                    //遍历数据数组生成html结构页面
                //默认排序页面
                xhr.map(function(item,idx){
                    for(var j=0;j<xhr.length-idx-1;j++){
                        if(parseInt(xhr[j].price) >= parseInt(xhr[j+1].price)){
                            temp = xhr[j+1]
                            xhr[j+1] = xhr[j];
                            xhr[j] = temp
                        }
                    }
                })
                insert()
                function insert(){

                    $('.goods').append(xhr.map(function(item,idx){
                    
                        var dom = item.sale!='' ?'<div class="teshui">'+item.sale+'</div>':'<i></i>'
                        var style = item.sale!=''?'text-decoration: line-through':''
                        // console.log(style)
                        // console.log(dom)
                        return `<li class="fl good">
                            <div class="pic">
                                <a href="#" title="${item.type}">
                                    <img src="${item.url}" style="width:228px;height:228px"/>
                                </a>
                                ${dom}
                            </div>
                            <p class="descript">
                                <a href="#">${item.type}</a>
                            </p>
                            <div class="Mpricediv0124">
                                <span class="Sprice" style="${style}">售价￥${item.price}</span>
                            </div>
                        </li>`
                    }))
                }

                //按商品条件类型排序
                $('.searchCol').on('click','li',function(){

                    //价格排序
                        //声明一个空数组，用于存放排序商品对应的id值
                    
                })
                   
                //价格排序 
                $('.dropdownList').on('click','p',function(e){
                    console.log(this)
                    //价格从从从高到低排序
                    if($(this)[0]==$('.price_h')[0]){
                        //遍历数据
                        var temp;
                        xhr.map(function(item,idx){
                            for(var j=0;j<xhr.length-idx-1;j++){
                                if(parseInt(xhr[j].price) <= parseInt(xhr[j+1].price)){
                                    temp = xhr[j+1]
                                    xhr[j+1] = xhr[j];
                                    xhr[j] = temp
                                }
                            }
                        })
                        console.log(xhr)//得到一个按价格排序的数据
                        $('.goods').html('')
                        insert()
                    }
                        
                    e.stopPropagation()
                })
                
                //按照价格区域进行筛选
                //
                $('.searchbarFoused').on('click','a',function(){
                    var arr3 = [];
                    var obj = {};
                    var value1 = $('.FpriceText0124').val()*1;
                    var value2 = $('#maxPrice').val()*1;
                    //遍历数据进行筛选排序
                    console.log(value1,value2)
                    xhr.map(function(item,idx){
                        if(item.price>=value1&&item.price<=value2){
                            arr3.push(item)
                        // console.log('hahaha')
                            // $('.goods').html('')
                            // insert()
                            console.log(item)
                        }
                    })
                    // console.log(arr3)
                    xhr = arr3
                    $('.goods').html('');
                    insert()
                    $('.searchbarFoused').css('display','none')
                })
                
                //点击跳转商品相应的详情页
               $('.goods').on('click','li',function(){
                    // console.log($(this))
                    //获取this的相对应的啥商品信息
                    var params = '';
                    //利用索引值获取对应的商品信息
                    var goods = xhr[$(this).index()];
                    //遍历数据，写成url的字符串的模式
                    for(var key in goods){
                        params +=key + '='+goods[key] + '&';
                    }
                    //去掉url后面多余的&
                    params = params.slice(0,-1);
                    //将数据传递到详情页面
                    location.href = 'goods.html?'+params;
                    console.log(params)
               })

            }
        })
    }

    //实现导航条的吸顶菜单效果（页面滚动触发事件）
        //触发条件$('.floatdiv')(滚动条滚动的距离等于或者大于目标元素的顶部偏移量)
    $(window).scroll(function(){
        if(window.scrollY>=$('#floatdiv').offset().top){
            $('#floatdiv').css({'position':'fixed','top':'0','z-index':'100000','background':'white'})
        }
        if(window.scrollY<288){
            $('#floatdiv').css({'position':'static','background':'white'})
        }


        if(window.scrollY>0){
            $('.tip').css({'display':'block'})

        }
        if(window.scrollY==0){
            $('.tip').css({'display':'none'})
        }
    })

    //点击返回顶部效果
    $('.tip').on('click',function(){

        var timer = setInterval(function(){

            var  speed = Math.ceil(window.scrollY/5);

            scrollBy(0,-speed);

            if(window.scrollY <= 0){
                clearInterval(timer);
            }
        },30)
    })

//引入公共底部部分
$('.g_footer').load('common.html #last');

    



    })
});;//引入模块
;require(['config'],function(){

    require(['jquery','bootstrap','common','carousel'],function($){

        //点击免烫按钮跳转详情页面
        $('.subNav').on('click','li',function(){
            if($(this).text()=='免烫'){
                location.href = '../html/goodsList.html'
            }
        })
        //点击登录注册按钮，跳转到登录注册页面
        $('span').on('click','a',function(){
            if($(this)[0]==$('.denglu')[0]){
                location.href = '../html/signIn.html';
            }
            if($(this)[0]==$('.zhuc')[0]){
                location.href = '../html/register.html';
            }
        })
        
        //接收登录页面传递过来的参数
        var params = decodeURI(location.search);
        params = params.slice(1,12);
        // console.log(params)
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

        //鼠标移入，生成购物车信息
        // $('.active').mouseover(function(){
        //     //读取在详情页所存储的cookie信息
        //     var carList = Cookie.get('carList');
        //     console.log(document.cookie)
        // })

        // 读取cookie信息，，写入购物车列表
        // var goods_l = Cookie.get('cc',{Path:'/html'});
        
        // console.log(goods_l)
    })
});;;require(['config'],function(){
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
});;/** vim: et:ts=4:sw=4:sts=4
 * @license RequireJS 2.3.5 Copyright jQuery Foundation and other contributors.
 * Released under MIT license, https://github.com/requirejs/requirejs/blob/master/LICENSE
 */
//Not using strict: uneven strict support in browsers, #392, and causes
//problems with requirejs.exec()/transpiler plugins that may not be strict.
/*jslint regexp: true, nomen: true, sloppy: true */
/*global window, navigator, document, importScripts, setTimeout, opera */

var requirejs, require, define;
(function (global, setTimeout) {
    var req, s, head, baseElement, dataMain, src,
        interactiveScript, currentlyAddingScript, mainScript, subPath,
        version = '2.3.5',
        commentRegExp = /\/\*[\s\S]*?\*\/|([^:"'=]|^)\/\/.*$/mg,
        cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,
        jsSuffixRegExp = /\.js$/,
        currDirRegExp = /^\.\//,
        op = Object.prototype,
        ostring = op.toString,
        hasOwn = op.hasOwnProperty,
        isBrowser = !!(typeof window !== 'undefined' && typeof navigator !== 'undefined' && window.document),
        isWebWorker = !isBrowser && typeof importScripts !== 'undefined',
        //PS3 indicates loaded and complete, but need to wait for complete
        //specifically. Sequence is 'loading', 'loaded', execution,
        // then 'complete'. The UA check is unfortunate, but not sure how
        //to feature test w/o causing perf issues.
        readyRegExp = isBrowser && navigator.platform === 'PLAYSTATION 3' ?
                      /^complete$/ : /^(complete|loaded)$/,
        defContextName = '_',
        //Oh the tragedy, detecting opera. See the usage of isOpera for reason.
        isOpera = typeof opera !== 'undefined' && opera.toString() === '[object Opera]',
        contexts = {},
        cfg = {},
        globalDefQueue = [],
        useInteractive = false;

    //Could match something like ')//comment', do not lose the prefix to comment.
    function commentReplace(match, singlePrefix) {
        return singlePrefix || '';
    }

    function isFunction(it) {
        return ostring.call(it) === '[object Function]';
    }

    function isArray(it) {
        return ostring.call(it) === '[object Array]';
    }

    /**
     * Helper function for iterating over an array. If the func returns
     * a true value, it will break out of the loop.
     */
    function each(ary, func) {
        if (ary) {
            var i;
            for (i = 0; i < ary.length; i += 1) {
                if (ary[i] && func(ary[i], i, ary)) {
                    break;
                }
            }
        }
    }

    /**
     * Helper function for iterating over an array backwards. If the func
     * returns a true value, it will break out of the loop.
     */
    function eachReverse(ary, func) {
        if (ary) {
            var i;
            for (i = ary.length - 1; i > -1; i -= 1) {
                if (ary[i] && func(ary[i], i, ary)) {
                    break;
                }
            }
        }
    }

    function hasProp(obj, prop) {
        return hasOwn.call(obj, prop);
    }

    function getOwn(obj, prop) {
        return hasProp(obj, prop) && obj[prop];
    }

    /**
     * Cycles over properties in an object and calls a function for each
     * property value. If the function returns a truthy value, then the
     * iteration is stopped.
     */
    function eachProp(obj, func) {
        var prop;
        for (prop in obj) {
            if (hasProp(obj, prop)) {
                if (func(obj[prop], prop)) {
                    break;
                }
            }
        }
    }

    /**
     * Simple function to mix in properties from source into target,
     * but only if target does not already have a property of the same name.
     */
    function mixin(target, source, force, deepStringMixin) {
        if (source) {
            eachProp(source, function (value, prop) {
                if (force || !hasProp(target, prop)) {
                    if (deepStringMixin && typeof value === 'object' && value &&
                        !isArray(value) && !isFunction(value) &&
                        !(value instanceof RegExp)) {

                        if (!target[prop]) {
                            target[prop] = {};
                        }
                        mixin(target[prop], value, force, deepStringMixin);
                    } else {
                        target[prop] = value;
                    }
                }
            });
        }
        return target;
    }

    //Similar to Function.prototype.bind, but the 'this' object is specified
    //first, since it is easier to read/figure out what 'this' will be.
    function bind(obj, fn) {
        return function () {
            return fn.apply(obj, arguments);
        };
    }

    function scripts() {
        return document.getElementsByTagName('script');
    }

    function defaultOnError(err) {
        throw err;
    }

    //Allow getting a global that is expressed in
    //dot notation, like 'a.b.c'.
    function getGlobal(value) {
        if (!value) {
            return value;
        }
        var g = global;
        each(value.split('.'), function (part) {
            g = g[part];
        });
        return g;
    }

    /**
     * Constructs an error with a pointer to an URL with more information.
     * @param {String} id the error ID that maps to an ID on a web page.
     * @param {String} message human readable error.
     * @param {Error} [err] the original error, if there is one.
     *
     * @returns {Error}
     */
    function makeError(id, msg, err, requireModules) {
        var e = new Error(msg + '\nhttp://requirejs.org/docs/errors.html#' + id);
        e.requireType = id;
        e.requireModules = requireModules;
        if (err) {
            e.originalError = err;
        }
        return e;
    }

    if (typeof define !== 'undefined') {
        //If a define is already in play via another AMD loader,
        //do not overwrite.
        return;
    }

    if (typeof requirejs !== 'undefined') {
        if (isFunction(requirejs)) {
            //Do not overwrite an existing requirejs instance.
            return;
        }
        cfg = requirejs;
        requirejs = undefined;
    }

    //Allow for a require config object
    if (typeof require !== 'undefined' && !isFunction(require)) {
        //assume it is a config object.
        cfg = require;
        require = undefined;
    }

    function newContext(contextName) {
        var inCheckLoaded, Module, context, handlers,
            checkLoadedTimeoutId,
            config = {
                //Defaults. Do not set a default for map
                //config to speed up normalize(), which
                //will run faster if there is no default.
                waitSeconds: 7,
                baseUrl: './',
                paths: {},
                bundles: {},
                pkgs: {},
                shim: {},
                config: {}
            },
            registry = {},
            //registry of just enabled modules, to speed
            //cycle breaking code when lots of modules
            //are registered, but not activated.
            enabledRegistry = {},
            undefEvents = {},
            defQueue = [],
            defined = {},
            urlFetched = {},
            bundlesMap = {},
            requireCounter = 1,
            unnormalizedCounter = 1;

        /**
         * Trims the . and .. from an array of path segments.
         * It will keep a leading path segment if a .. will become
         * the first path segment, to help with module name lookups,
         * which act like paths, but can be remapped. But the end result,
         * all paths that use this function should look normalized.
         * NOTE: this method MODIFIES the input array.
         * @param {Array} ary the array of path segments.
         */
        function trimDots(ary) {
            var i, part;
            for (i = 0; i < ary.length; i++) {
                part = ary[i];
                if (part === '.') {
                    ary.splice(i, 1);
                    i -= 1;
                } else if (part === '..') {
                    // If at the start, or previous value is still ..,
                    // keep them so that when converted to a path it may
                    // still work when converted to a path, even though
                    // as an ID it is less than ideal. In larger point
                    // releases, may be better to just kick out an error.
                    if (i === 0 || (i === 1 && ary[2] === '..') || ary[i - 1] === '..') {
                        continue;
                    } else if (i > 0) {
                        ary.splice(i - 1, 2);
                        i -= 2;
                    }
                }
            }
        }

        /**
         * Given a relative module name, like ./something, normalize it to
         * a real name that can be mapped to a path.
         * @param {String} name the relative name
         * @param {String} baseName a real name that the name arg is relative
         * to.
         * @param {Boolean} applyMap apply the map config to the value. Should
         * only be done if this normalization is for a dependency ID.
         * @returns {String} normalized name
         */
        function normalize(name, baseName, applyMap) {
            var pkgMain, mapValue, nameParts, i, j, nameSegment, lastIndex,
                foundMap, foundI, foundStarMap, starI, normalizedBaseParts,
                baseParts = (baseName && baseName.split('/')),
                map = config.map,
                starMap = map && map['*'];

            //Adjust any relative paths.
            if (name) {
                name = name.split('/');
                lastIndex = name.length - 1;

                // If wanting node ID compatibility, strip .js from end
                // of IDs. Have to do this here, and not in nameToUrl
                // because node allows either .js or non .js to map
                // to same file.
                if (config.nodeIdCompat && jsSuffixRegExp.test(name[lastIndex])) {
                    name[lastIndex] = name[lastIndex].replace(jsSuffixRegExp, '');
                }

                // Starts with a '.' so need the baseName
                if (name[0].charAt(0) === '.' && baseParts) {
                    //Convert baseName to array, and lop off the last part,
                    //so that . matches that 'directory' and not name of the baseName's
                    //module. For instance, baseName of 'one/two/three', maps to
                    //'one/two/three.js', but we want the directory, 'one/two' for
                    //this normalization.
                    normalizedBaseParts = baseParts.slice(0, baseParts.length - 1);
                    name = normalizedBaseParts.concat(name);
                }

                trimDots(name);
                name = name.join('/');
            }

            //Apply map config if available.
            if (applyMap && map && (baseParts || starMap)) {
                nameParts = name.split('/');

                outerLoop: for (i = nameParts.length; i > 0; i -= 1) {
                    nameSegment = nameParts.slice(0, i).join('/');

                    if (baseParts) {
                        //Find the longest baseName segment match in the config.
                        //So, do joins on the biggest to smallest lengths of baseParts.
                        for (j = baseParts.length; j > 0; j -= 1) {
                            mapValue = getOwn(map, baseParts.slice(0, j).join('/'));

                            //baseName segment has config, find if it has one for
                            //this name.
                            if (mapValue) {
                                mapValue = getOwn(mapValue, nameSegment);
                                if (mapValue) {
                                    //Match, update name to the new value.
                                    foundMap = mapValue;
                                    foundI = i;
                                    break outerLoop;
                                }
                            }
                        }
                    }

                    //Check for a star map match, but just hold on to it,
                    //if there is a shorter segment match later in a matching
                    //config, then favor over this star map.
                    if (!foundStarMap && starMap && getOwn(starMap, nameSegment)) {
                        foundStarMap = getOwn(starMap, nameSegment);
                        starI = i;
                    }
                }

                if (!foundMap && foundStarMap) {
                    foundMap = foundStarMap;
                    foundI = starI;
                }

                if (foundMap) {
                    nameParts.splice(0, foundI, foundMap);
                    name = nameParts.join('/');
                }
            }

            // If the name points to a package's name, use
            // the package main instead.
            pkgMain = getOwn(config.pkgs, name);

            return pkgMain ? pkgMain : name;
        }

        function removeScript(name) {
            if (isBrowser) {
                each(scripts(), function (scriptNode) {
                    if (scriptNode.getAttribute('data-requiremodule') === name &&
                            scriptNode.getAttribute('data-requirecontext') === context.contextName) {
                        scriptNode.parentNode.removeChild(scriptNode);
                        return true;
                    }
                });
            }
        }

        function hasPathFallback(id) {
            var pathConfig = getOwn(config.paths, id);
            if (pathConfig && isArray(pathConfig) && pathConfig.length > 1) {
                //Pop off the first array value, since it failed, and
                //retry
                pathConfig.shift();
                context.require.undef(id);

                //Custom require that does not do map translation, since
                //ID is "absolute", already mapped/resolved.
                context.makeRequire(null, {
                    skipMap: true
                })([id]);

                return true;
            }
        }

        //Turns a plugin!resource to [plugin, resource]
        //with the plugin being undefined if the name
        //did not have a plugin prefix.
        function splitPrefix(name) {
            var prefix,
                index = name ? name.indexOf('!') : -1;
            if (index > -1) {
                prefix = name.substring(0, index);
                name = name.substring(index + 1, name.length);
            }
            return [prefix, name];
        }

        /**
         * Creates a module mapping that includes plugin prefix, module
         * name, and path. If parentModuleMap is provided it will
         * also normalize the name via require.normalize()
         *
         * @param {String} name the module name
         * @param {String} [parentModuleMap] parent module map
         * for the module name, used to resolve relative names.
         * @param {Boolean} isNormalized: is the ID already normalized.
         * This is true if this call is done for a define() module ID.
         * @param {Boolean} applyMap: apply the map config to the ID.
         * Should only be true if this map is for a dependency.
         *
         * @returns {Object}
         */
        function makeModuleMap(name, parentModuleMap, isNormalized, applyMap) {
            var url, pluginModule, suffix, nameParts,
                prefix = null,
                parentName = parentModuleMap ? parentModuleMap.name : null,
                originalName = name,
                isDefine = true,
                normalizedName = '';

            //If no name, then it means it is a require call, generate an
            //internal name.
            if (!name) {
                isDefine = false;
                name = '_@r' + (requireCounter += 1);
            }

            nameParts = splitPrefix(name);
            prefix = nameParts[0];
            name = nameParts[1];

            if (prefix) {
                prefix = normalize(prefix, parentName, applyMap);
                pluginModule = getOwn(defined, prefix);
            }

            //Account for relative paths if there is a base name.
            if (name) {
                if (prefix) {
                    if (isNormalized) {
                        normalizedName = name;
                    } else if (pluginModule && pluginModule.normalize) {
                        //Plugin is loaded, use its normalize method.
                        normalizedName = pluginModule.normalize(name, function (name) {
                            return normalize(name, parentName, applyMap);
                        });
                    } else {
                        // If nested plugin references, then do not try to
                        // normalize, as it will not normalize correctly. This
                        // places a restriction on resourceIds, and the longer
                        // term solution is not to normalize until plugins are
                        // loaded and all normalizations to allow for async
                        // loading of a loader plugin. But for now, fixes the
                        // common uses. Details in #1131
                        normalizedName = name.indexOf('!') === -1 ?
                                         normalize(name, parentName, applyMap) :
                                         name;
                    }
                } else {
                    //A regular module.
                    normalizedName = normalize(name, parentName, applyMap);

                    //Normalized name may be a plugin ID due to map config
                    //application in normalize. The map config values must
                    //already be normalized, so do not need to redo that part.
                    nameParts = splitPrefix(normalizedName);
                    prefix = nameParts[0];
                    normalizedName = nameParts[1];
                    isNormalized = true;

                    url = context.nameToUrl(normalizedName);
                }
            }

            //If the id is a plugin id that cannot be determined if it needs
            //normalization, stamp it with a unique ID so two matching relative
            //ids that may conflict can be separate.
            suffix = prefix && !pluginModule && !isNormalized ?
                     '_unnormalized' + (unnormalizedCounter += 1) :
                     '';

            return {
                prefix: prefix,
                name: normalizedName,
                parentMap: parentModuleMap,
                unnormalized: !!suffix,
                url: url,
                originalName: originalName,
                isDefine: isDefine,
                id: (prefix ?
                        prefix + '!' + normalizedName :
                        normalizedName) + suffix
            };
        }

        function getModule(depMap) {
            var id = depMap.id,
                mod = getOwn(registry, id);

            if (!mod) {
                mod = registry[id] = new context.Module(depMap);
            }

            return mod;
        }

        function on(depMap, name, fn) {
            var id = depMap.id,
                mod = getOwn(registry, id);

            if (hasProp(defined, id) &&
                    (!mod || mod.defineEmitComplete)) {
                if (name === 'defined') {
                    fn(defined[id]);
                }
            } else {
                mod = getModule(depMap);
                if (mod.error && name === 'error') {
                    fn(mod.error);
                } else {
                    mod.on(name, fn);
                }
            }
        }

        function onError(err, errback) {
            var ids = err.requireModules,
                notified = false;

            if (errback) {
                errback(err);
            } else {
                each(ids, function (id) {
                    var mod = getOwn(registry, id);
                    if (mod) {
                        //Set error on module, so it skips timeout checks.
                        mod.error = err;
                        if (mod.events.error) {
                            notified = true;
                            mod.emit('error', err);
                        }
                    }
                });

                if (!notified) {
                    req.onError(err);
                }
            }
        }

        /**
         * Internal method to transfer globalQueue items to this context's
         * defQueue.
         */
        function takeGlobalQueue() {
            //Push all the globalDefQueue items into the context's defQueue
            if (globalDefQueue.length) {
                each(globalDefQueue, function(queueItem) {
                    var id = queueItem[0];
                    if (typeof id === 'string') {
                        context.defQueueMap[id] = true;
                    }
                    defQueue.push(queueItem);
                });
                globalDefQueue = [];
            }
        }

        handlers = {
            'require': function (mod) {
                if (mod.require) {
                    return mod.require;
                } else {
                    return (mod.require = context.makeRequire(mod.map));
                }
            },
            'exports': function (mod) {
                mod.usingExports = true;
                if (mod.map.isDefine) {
                    if (mod.exports) {
                        return (defined[mod.map.id] = mod.exports);
                    } else {
                        return (mod.exports = defined[mod.map.id] = {});
                    }
                }
            },
            'module': function (mod) {
                if (mod.module) {
                    return mod.module;
                } else {
                    return (mod.module = {
                        id: mod.map.id,
                        uri: mod.map.url,
                        config: function () {
                            return getOwn(config.config, mod.map.id) || {};
                        },
                        exports: mod.exports || (mod.exports = {})
                    });
                }
            }
        };

        function cleanRegistry(id) {
            //Clean up machinery used for waiting modules.
            delete registry[id];
            delete enabledRegistry[id];
        }

        function breakCycle(mod, traced, processed) {
            var id = mod.map.id;

            if (mod.error) {
                mod.emit('error', mod.error);
            } else {
                traced[id] = true;
                each(mod.depMaps, function (depMap, i) {
                    var depId = depMap.id,
                        dep = getOwn(registry, depId);

                    //Only force things that have not completed
                    //being defined, so still in the registry,
                    //and only if it has not been matched up
                    //in the module already.
                    if (dep && !mod.depMatched[i] && !processed[depId]) {
                        if (getOwn(traced, depId)) {
                            mod.defineDep(i, defined[depId]);
                            mod.check(); //pass false?
                        } else {
                            breakCycle(dep, traced, processed);
                        }
                    }
                });
                processed[id] = true;
            }
        }

        function checkLoaded() {
            var err, usingPathFallback,
                waitInterval = config.waitSeconds * 1000,
                //It is possible to disable the wait interval by using waitSeconds of 0.
                expired = waitInterval && (context.startTime + waitInterval) < new Date().getTime(),
                noLoads = [],
                reqCalls = [],
                stillLoading = false,
                needCycleCheck = true;

            //Do not bother if this call was a result of a cycle break.
            if (inCheckLoaded) {
                return;
            }

            inCheckLoaded = true;

            //Figure out the state of all the modules.
            eachProp(enabledRegistry, function (mod) {
                var map = mod.map,
                    modId = map.id;

                //Skip things that are not enabled or in error state.
                if (!mod.enabled) {
                    return;
                }

                if (!map.isDefine) {
                    reqCalls.push(mod);
                }

                if (!mod.error) {
                    //If the module should be executed, and it has not
                    //been inited and time is up, remember it.
                    if (!mod.inited && expired) {
                        if (hasPathFallback(modId)) {
                            usingPathFallback = true;
                            stillLoading = true;
                        } else {
                            noLoads.push(modId);
                            removeScript(modId);
                        }
                    } else if (!mod.inited && mod.fetched && map.isDefine) {
                        stillLoading = true;
                        if (!map.prefix) {
                            //No reason to keep looking for unfinished
                            //loading. If the only stillLoading is a
                            //plugin resource though, keep going,
                            //because it may be that a plugin resource
                            //is waiting on a non-plugin cycle.
                            return (needCycleCheck = false);
                        }
                    }
                }
            });

            if (expired && noLoads.length) {
                //If wait time expired, throw error of unloaded modules.
                err = makeError('timeout', 'Load timeout for modules: ' + noLoads, null, noLoads);
                err.contextName = context.contextName;
                return onError(err);
            }

            //Not expired, check for a cycle.
            if (needCycleCheck) {
                each(reqCalls, function (mod) {
                    breakCycle(mod, {}, {});
                });
            }

            //If still waiting on loads, and the waiting load is something
            //other than a plugin resource, or there are still outstanding
            //scripts, then just try back later.
            if ((!expired || usingPathFallback) && stillLoading) {
                //Something is still waiting to load. Wait for it, but only
                //if a timeout is not already in effect.
                if ((isBrowser || isWebWorker) && !checkLoadedTimeoutId) {
                    checkLoadedTimeoutId = setTimeout(function () {
                        checkLoadedTimeoutId = 0;
                        checkLoaded();
                    }, 50);
                }
            }

            inCheckLoaded = false;
        }

        Module = function (map) {
            this.events = getOwn(undefEvents, map.id) || {};
            this.map = map;
            this.shim = getOwn(config.shim, map.id);
            this.depExports = [];
            this.depMaps = [];
            this.depMatched = [];
            this.pluginMaps = {};
            this.depCount = 0;

            /* this.exports this.factory
               this.depMaps = [],
               this.enabled, this.fetched
            */
        };

        Module.prototype = {
            init: function (depMaps, factory, errback, options) {
                options = options || {};

                //Do not do more inits if already done. Can happen if there
                //are multiple define calls for the same module. That is not
                //a normal, common case, but it is also not unexpected.
                if (this.inited) {
                    return;
                }

                this.factory = factory;

                if (errback) {
                    //Register for errors on this module.
                    this.on('error', errback);
                } else if (this.events.error) {
                    //If no errback already, but there are error listeners
                    //on this module, set up an errback to pass to the deps.
                    errback = bind(this, function (err) {
                        this.emit('error', err);
                    });
                }

                //Do a copy of the dependency array, so that
                //source inputs are not modified. For example
                //"shim" deps are passed in here directly, and
                //doing a direct modification of the depMaps array
                //would affect that config.
                this.depMaps = depMaps && depMaps.slice(0);

                this.errback = errback;

                //Indicate this module has be initialized
                this.inited = true;

                this.ignore = options.ignore;

                //Could have option to init this module in enabled mode,
                //or could have been previously marked as enabled. However,
                //the dependencies are not known until init is called. So
                //if enabled previously, now trigger dependencies as enabled.
                if (options.enabled || this.enabled) {
                    //Enable this module and dependencies.
                    //Will call this.check()
                    this.enable();
                } else {
                    this.check();
                }
            },

            defineDep: function (i, depExports) {
                //Because of cycles, defined callback for a given
                //export can be called more than once.
                if (!this.depMatched[i]) {
                    this.depMatched[i] = true;
                    this.depCount -= 1;
                    this.depExports[i] = depExports;
                }
            },

            fetch: function () {
                if (this.fetched) {
                    return;
                }
                this.fetched = true;

                context.startTime = (new Date()).getTime();

                var map = this.map;

                //If the manager is for a plugin managed resource,
                //ask the plugin to load it now.
                if (this.shim) {
                    context.makeRequire(this.map, {
                        enableBuildCallback: true
                    })(this.shim.deps || [], bind(this, function () {
                        return map.prefix ? this.callPlugin() : this.load();
                    }));
                } else {
                    //Regular dependency.
                    return map.prefix ? this.callPlugin() : this.load();
                }
            },

            load: function () {
                var url = this.map.url;

                //Regular dependency.
                if (!urlFetched[url]) {
                    urlFetched[url] = true;
                    context.load(this.map.id, url);
                }
            },

            /**
             * Checks if the module is ready to define itself, and if so,
             * define it.
             */
            check: function () {
                if (!this.enabled || this.enabling) {
                    return;
                }

                var err, cjsModule,
                    id = this.map.id,
                    depExports = this.depExports,
                    exports = this.exports,
                    factory = this.factory;

                if (!this.inited) {
                    // Only fetch if not already in the defQueue.
                    if (!hasProp(context.defQueueMap, id)) {
                        this.fetch();
                    }
                } else if (this.error) {
                    this.emit('error', this.error);
                } else if (!this.defining) {
                    //The factory could trigger another require call
                    //that would result in checking this module to
                    //define itself again. If already in the process
                    //of doing that, skip this work.
                    this.defining = true;

                    if (this.depCount < 1 && !this.defined) {
                        if (isFunction(factory)) {
                            //If there is an error listener, favor passing
                            //to that instead of throwing an error. However,
                            //only do it for define()'d  modules. require
                            //errbacks should not be called for failures in
                            //their callbacks (#699). However if a global
                            //onError is set, use that.
                            if ((this.events.error && this.map.isDefine) ||
                                req.onError !== defaultOnError) {
                                try {
                                    exports = context.execCb(id, factory, depExports, exports);
                                } catch (e) {
                                    err = e;
                                }
                            } else {
                                exports = context.execCb(id, factory, depExports, exports);
                            }

                            // Favor return value over exports. If node/cjs in play,
                            // then will not have a return value anyway. Favor
                            // module.exports assignment over exports object.
                            if (this.map.isDefine && exports === undefined) {
                                cjsModule = this.module;
                                if (cjsModule) {
                                    exports = cjsModule.exports;
                                } else if (this.usingExports) {
                                    //exports already set the defined value.
                                    exports = this.exports;
                                }
                            }

                            if (err) {
                                err.requireMap = this.map;
                                err.requireModules = this.map.isDefine ? [this.map.id] : null;
                                err.requireType = this.map.isDefine ? 'define' : 'require';
                                return onError((this.error = err));
                            }

                        } else {
                            //Just a literal value
                            exports = factory;
                        }

                        this.exports = exports;

                        if (this.map.isDefine && !this.ignore) {
                            defined[id] = exports;

                            if (req.onResourceLoad) {
                                var resLoadMaps = [];
                                each(this.depMaps, function (depMap) {
                                    resLoadMaps.push(depMap.normalizedMap || depMap);
                                });
                                req.onResourceLoad(context, this.map, resLoadMaps);
                            }
                        }

                        //Clean up
                        cleanRegistry(id);

                        this.defined = true;
                    }

                    //Finished the define stage. Allow calling check again
                    //to allow define notifications below in the case of a
                    //cycle.
                    this.defining = false;

                    if (this.defined && !this.defineEmitted) {
                        this.defineEmitted = true;
                        this.emit('defined', this.exports);
                        this.defineEmitComplete = true;
                    }

                }
            },

            callPlugin: function () {
                var map = this.map,
                    id = map.id,
                    //Map already normalized the prefix.
                    pluginMap = makeModuleMap(map.prefix);

                //Mark this as a dependency for this plugin, so it
                //can be traced for cycles.
                this.depMaps.push(pluginMap);

                on(pluginMap, 'defined', bind(this, function (plugin) {
                    var load, normalizedMap, normalizedMod,
                        bundleId = getOwn(bundlesMap, this.map.id),
                        name = this.map.name,
                        parentName = this.map.parentMap ? this.map.parentMap.name : null,
                        localRequire = context.makeRequire(map.parentMap, {
                            enableBuildCallback: true
                        });

                    //If current map is not normalized, wait for that
                    //normalized name to load instead of continuing.
                    if (this.map.unnormalized) {
                        //Normalize the ID if the plugin allows it.
                        if (plugin.normalize) {
                            name = plugin.normalize(name, function (name) {
                                return normalize(name, parentName, true);
                            }) || '';
                        }

                        //prefix and name should already be normalized, no need
                        //for applying map config again either.
                        normalizedMap = makeModuleMap(map.prefix + '!' + name,
                                                      this.map.parentMap,
                                                      true);
                        on(normalizedMap,
                            'defined', bind(this, function (value) {
                                this.map.normalizedMap = normalizedMap;
                                this.init([], function () { return value; }, null, {
                                    enabled: true,
                                    ignore: true
                                });
                            }));

                        normalizedMod = getOwn(registry, normalizedMap.id);
                        if (normalizedMod) {
                            //Mark this as a dependency for this plugin, so it
                            //can be traced for cycles.
                            this.depMaps.push(normalizedMap);

                            if (this.events.error) {
                                normalizedMod.on('error', bind(this, function (err) {
                                    this.emit('error', err);
                                }));
                            }
                            normalizedMod.enable();
                        }

                        return;
                    }

                    //If a paths config, then just load that file instead to
                    //resolve the plugin, as it is built into that paths layer.
                    if (bundleId) {
                        this.map.url = context.nameToUrl(bundleId);
                        this.load();
                        return;
                    }

                    load = bind(this, function (value) {
                        this.init([], function () { return value; }, null, {
                            enabled: true
                        });
                    });

                    load.error = bind(this, function (err) {
                        this.inited = true;
                        this.error = err;
                        err.requireModules = [id];

                        //Remove temp unnormalized modules for this module,
                        //since they will never be resolved otherwise now.
                        eachProp(registry, function (mod) {
                            if (mod.map.id.indexOf(id + '_unnormalized') === 0) {
                                cleanRegistry(mod.map.id);
                            }
                        });

                        onError(err);
                    });

                    //Allow plugins to load other code without having to know the
                    //context or how to 'complete' the load.
                    load.fromText = bind(this, function (text, textAlt) {
                        /*jslint evil: true */
                        var moduleName = map.name,
                            moduleMap = makeModuleMap(moduleName),
                            hasInteractive = useInteractive;

                        //As of 2.1.0, support just passing the text, to reinforce
                        //fromText only being called once per resource. Still
                        //support old style of passing moduleName but discard
                        //that moduleName in favor of the internal ref.
                        if (textAlt) {
                            text = textAlt;
                        }

                        //Turn off interactive script matching for IE for any define
                        //calls in the text, then turn it back on at the end.
                        if (hasInteractive) {
                            useInteractive = false;
                        }

                        //Prime the system by creating a module instance for
                        //it.
                        getModule(moduleMap);

                        //Transfer any config to this other module.
                        if (hasProp(config.config, id)) {
                            config.config[moduleName] = config.config[id];
                        }

                        try {
                            req.exec(text);
                        } catch (e) {
                            return onError(makeError('fromtexteval',
                                             'fromText eval for ' + id +
                                            ' failed: ' + e,
                                             e,
                                             [id]));
                        }

                        if (hasInteractive) {
                            useInteractive = true;
                        }

                        //Mark this as a dependency for the plugin
                        //resource
                        this.depMaps.push(moduleMap);

                        //Support anonymous modules.
                        context.completeLoad(moduleName);

                        //Bind the value of that module to the value for this
                        //resource ID.
                        localRequire([moduleName], load);
                    });

                    //Use parentName here since the plugin's name is not reliable,
                    //could be some weird string with no path that actually wants to
                    //reference the parentName's path.
                    plugin.load(map.name, localRequire, load, config);
                }));

                context.enable(pluginMap, this);
                this.pluginMaps[pluginMap.id] = pluginMap;
            },

            enable: function () {
                enabledRegistry[this.map.id] = this;
                this.enabled = true;

                //Set flag mentioning that the module is enabling,
                //so that immediate calls to the defined callbacks
                //for dependencies do not trigger inadvertent load
                //with the depCount still being zero.
                this.enabling = true;

                //Enable each dependency
                each(this.depMaps, bind(this, function (depMap, i) {
                    var id, mod, handler;

                    if (typeof depMap === 'string') {
                        //Dependency needs to be converted to a depMap
                        //and wired up to this module.
                        depMap = makeModuleMap(depMap,
                                               (this.map.isDefine ? this.map : this.map.parentMap),
                                               false,
                                               !this.skipMap);
                        this.depMaps[i] = depMap;

                        handler = getOwn(handlers, depMap.id);

                        if (handler) {
                            this.depExports[i] = handler(this);
                            return;
                        }

                        this.depCount += 1;

                        on(depMap, 'defined', bind(this, function (depExports) {
                            if (this.undefed) {
                                return;
                            }
                            this.defineDep(i, depExports);
                            this.check();
                        }));

                        if (this.errback) {
                            on(depMap, 'error', bind(this, this.errback));
                        } else if (this.events.error) {
                            // No direct errback on this module, but something
                            // else is listening for errors, so be sure to
                            // propagate the error correctly.
                            on(depMap, 'error', bind(this, function(err) {
                                this.emit('error', err);
                            }));
                        }
                    }

                    id = depMap.id;
                    mod = registry[id];

                    //Skip special modules like 'require', 'exports', 'module'
                    //Also, don't call enable if it is already enabled,
                    //important in circular dependency cases.
                    if (!hasProp(handlers, id) && mod && !mod.enabled) {
                        context.enable(depMap, this);
                    }
                }));

                //Enable each plugin that is used in
                //a dependency
                eachProp(this.pluginMaps, bind(this, function (pluginMap) {
                    var mod = getOwn(registry, pluginMap.id);
                    if (mod && !mod.enabled) {
                        context.enable(pluginMap, this);
                    }
                }));

                this.enabling = false;

                this.check();
            },

            on: function (name, cb) {
                var cbs = this.events[name];
                if (!cbs) {
                    cbs = this.events[name] = [];
                }
                cbs.push(cb);
            },

            emit: function (name, evt) {
                each(this.events[name], function (cb) {
                    cb(evt);
                });
                if (name === 'error') {
                    //Now that the error handler was triggered, remove
                    //the listeners, since this broken Module instance
                    //can stay around for a while in the registry.
                    delete this.events[name];
                }
            }
        };

        function callGetModule(args) {
            //Skip modules already defined.
            if (!hasProp(defined, args[0])) {
                getModule(makeModuleMap(args[0], null, true)).init(args[1], args[2]);
            }
        }

        function removeListener(node, func, name, ieName) {
            //Favor detachEvent because of IE9
            //issue, see attachEvent/addEventListener comment elsewhere
            //in this file.
            if (node.detachEvent && !isOpera) {
                //Probably IE. If not it will throw an error, which will be
                //useful to know.
                if (ieName) {
                    node.detachEvent(ieName, func);
                }
            } else {
                node.removeEventListener(name, func, false);
            }
        }

        /**
         * Given an event from a script node, get the requirejs info from it,
         * and then removes the event listeners on the node.
         * @param {Event} evt
         * @returns {Object}
         */
        function getScriptData(evt) {
            //Using currentTarget instead of target for Firefox 2.0's sake. Not
            //all old browsers will be supported, but this one was easy enough
            //to support and still makes sense.
            var node = evt.currentTarget || evt.srcElement;

            //Remove the listeners once here.
            removeListener(node, context.onScriptLoad, 'load', 'onreadystatechange');
            removeListener(node, context.onScriptError, 'error');

            return {
                node: node,
                id: node && node.getAttribute('data-requiremodule')
            };
        }

        function intakeDefines() {
            var args;

            //Any defined modules in the global queue, intake them now.
            takeGlobalQueue();

            //Make sure any remaining defQueue items get properly processed.
            while (defQueue.length) {
                args = defQueue.shift();
                if (args[0] === null) {
                    return onError(makeError('mismatch', 'Mismatched anonymous define() module: ' +
                        args[args.length - 1]));
                } else {
                    //args are id, deps, factory. Should be normalized by the
                    //define() function.
                    callGetModule(args);
                }
            }
            context.defQueueMap = {};
        }

        context = {
            config: config,
            contextName: contextName,
            registry: registry,
            defined: defined,
            urlFetched: urlFetched,
            defQueue: defQueue,
            defQueueMap: {},
            Module: Module,
            makeModuleMap: makeModuleMap,
            nextTick: req.nextTick,
            onError: onError,

            /**
             * Set a configuration for the context.
             * @param {Object} cfg config object to integrate.
             */
            configure: function (cfg) {
                //Make sure the baseUrl ends in a slash.
                if (cfg.baseUrl) {
                    if (cfg.baseUrl.charAt(cfg.baseUrl.length - 1) !== '/') {
                        cfg.baseUrl += '/';
                    }
                }

                // Convert old style urlArgs string to a function.
                if (typeof cfg.urlArgs === 'string') {
                    var urlArgs = cfg.urlArgs;
                    cfg.urlArgs = function(id, url) {
                        return (url.indexOf('?') === -1 ? '?' : '&') + urlArgs;
                    };
                }

                //Save off the paths since they require special processing,
                //they are additive.
                var shim = config.shim,
                    objs = {
                        paths: true,
                        bundles: true,
                        config: true,
                        map: true
                    };

                eachProp(cfg, function (value, prop) {
                    if (objs[prop]) {
                        if (!config[prop]) {
                            config[prop] = {};
                        }
                        mixin(config[prop], value, true, true);
                    } else {
                        config[prop] = value;
                    }
                });

                //Reverse map the bundles
                if (cfg.bundles) {
                    eachProp(cfg.bundles, function (value, prop) {
                        each(value, function (v) {
                            if (v !== prop) {
                                bundlesMap[v] = prop;
                            }
                        });
                    });
                }

                //Merge shim
                if (cfg.shim) {
                    eachProp(cfg.shim, function (value, id) {
                        //Normalize the structure
                        if (isArray(value)) {
                            value = {
                                deps: value
                            };
                        }
                        if ((value.exports || value.init) && !value.exportsFn) {
                            value.exportsFn = context.makeShimExports(value);
                        }
                        shim[id] = value;
                    });
                    config.shim = shim;
                }

                //Adjust packages if necessary.
                if (cfg.packages) {
                    each(cfg.packages, function (pkgObj) {
                        var location, name;

                        pkgObj = typeof pkgObj === 'string' ? {name: pkgObj} : pkgObj;

                        name = pkgObj.name;
                        location = pkgObj.location;
                        if (location) {
                            config.paths[name] = pkgObj.location;
                        }

                        //Save pointer to main module ID for pkg name.
                        //Remove leading dot in main, so main paths are normalized,
                        //and remove any trailing .js, since different package
                        //envs have different conventions: some use a module name,
                        //some use a file name.
                        config.pkgs[name] = pkgObj.name + '/' + (pkgObj.main || 'main')
                                     .replace(currDirRegExp, '')
                                     .replace(jsSuffixRegExp, '');
                    });
                }

                //If there are any "waiting to execute" modules in the registry,
                //update the maps for them, since their info, like URLs to load,
                //may have changed.
                eachProp(registry, function (mod, id) {
                    //If module already has init called, since it is too
                    //late to modify them, and ignore unnormalized ones
                    //since they are transient.
                    if (!mod.inited && !mod.map.unnormalized) {
                        mod.map = makeModuleMap(id, null, true);
                    }
                });

                //If a deps array or a config callback is specified, then call
                //require with those args. This is useful when require is defined as a
                //config object before require.js is loaded.
                if (cfg.deps || cfg.callback) {
                    context.require(cfg.deps || [], cfg.callback);
                }
            },

            makeShimExports: function (value) {
                function fn() {
                    var ret;
                    if (value.init) {
                        ret = value.init.apply(global, arguments);
                    }
                    return ret || (value.exports && getGlobal(value.exports));
                }
                return fn;
            },

            makeRequire: function (relMap, options) {
                options = options || {};

                function localRequire(deps, callback, errback) {
                    var id, map, requireMod;

                    if (options.enableBuildCallback && callback && isFunction(callback)) {
                        callback.__requireJsBuild = true;
                    }

                    if (typeof deps === 'string') {
                        if (isFunction(callback)) {
                            //Invalid call
                            return onError(makeError('requireargs', 'Invalid require call'), errback);
                        }

                        //If require|exports|module are requested, get the
                        //value for them from the special handlers. Caveat:
                        //this only works while module is being defined.
                        if (relMap && hasProp(handlers, deps)) {
                            return handlers[deps](registry[relMap.id]);
                        }

                        //Synchronous access to one module. If require.get is
                        //available (as in the Node adapter), prefer that.
                        if (req.get) {
                            return req.get(context, deps, relMap, localRequire);
                        }

                        //Normalize module name, if it contains . or ..
                        map = makeModuleMap(deps, relMap, false, true);
                        id = map.id;

                        if (!hasProp(defined, id)) {
                            return onError(makeError('notloaded', 'Module name "' +
                                        id +
                                        '" has not been loaded yet for context: ' +
                                        contextName +
                                        (relMap ? '' : '. Use require([])')));
                        }
                        return defined[id];
                    }

                    //Grab defines waiting in the global queue.
                    intakeDefines();

                    //Mark all the dependencies as needing to be loaded.
                    context.nextTick(function () {
                        //Some defines could have been added since the
                        //require call, collect them.
                        intakeDefines();

                        requireMod = getModule(makeModuleMap(null, relMap));

                        //Store if map config should be applied to this require
                        //call for dependencies.
                        requireMod.skipMap = options.skipMap;

                        requireMod.init(deps, callback, errback, {
                            enabled: true
                        });

                        checkLoaded();
                    });

                    return localRequire;
                }

                mixin(localRequire, {
                    isBrowser: isBrowser,

                    /**
                     * Converts a module name + .extension into an URL path.
                     * *Requires* the use of a module name. It does not support using
                     * plain URLs like nameToUrl.
                     */
                    toUrl: function (moduleNamePlusExt) {
                        var ext,
                            index = moduleNamePlusExt.lastIndexOf('.'),
                            segment = moduleNamePlusExt.split('/')[0],
                            isRelative = segment === '.' || segment === '..';

                        //Have a file extension alias, and it is not the
                        //dots from a relative path.
                        if (index !== -1 && (!isRelative || index > 1)) {
                            ext = moduleNamePlusExt.substring(index, moduleNamePlusExt.length);
                            moduleNamePlusExt = moduleNamePlusExt.substring(0, index);
                        }

                        return context.nameToUrl(normalize(moduleNamePlusExt,
                                                relMap && relMap.id, true), ext,  true);
                    },

                    defined: function (id) {
                        return hasProp(defined, makeModuleMap(id, relMap, false, true).id);
                    },

                    specified: function (id) {
                        id = makeModuleMap(id, relMap, false, true).id;
                        return hasProp(defined, id) || hasProp(registry, id);
                    }
                });

                //Only allow undef on top level require calls
                if (!relMap) {
                    localRequire.undef = function (id) {
                        //Bind any waiting define() calls to this context,
                        //fix for #408
                        takeGlobalQueue();

                        var map = makeModuleMap(id, relMap, true),
                            mod = getOwn(registry, id);

                        mod.undefed = true;
                        removeScript(id);

                        delete defined[id];
                        delete urlFetched[map.url];
                        delete undefEvents[id];

                        //Clean queued defines too. Go backwards
                        //in array so that the splices do not
                        //mess up the iteration.
                        eachReverse(defQueue, function(args, i) {
                            if (args[0] === id) {
                                defQueue.splice(i, 1);
                            }
                        });
                        delete context.defQueueMap[id];

                        if (mod) {
                            //Hold on to listeners in case the
                            //module will be attempted to be reloaded
                            //using a different config.
                            if (mod.events.defined) {
                                undefEvents[id] = mod.events;
                            }

                            cleanRegistry(id);
                        }
                    };
                }

                return localRequire;
            },

            /**
             * Called to enable a module if it is still in the registry
             * awaiting enablement. A second arg, parent, the parent module,
             * is passed in for context, when this method is overridden by
             * the optimizer. Not shown here to keep code compact.
             */
            enable: function (depMap) {
                var mod = getOwn(registry, depMap.id);
                if (mod) {
                    getModule(depMap).enable();
                }
            },

            /**
             * Internal method used by environment adapters to complete a load event.
             * A load event could be a script load or just a load pass from a synchronous
             * load call.
             * @param {String} moduleName the name of the module to potentially complete.
             */
            completeLoad: function (moduleName) {
                var found, args, mod,
                    shim = getOwn(config.shim, moduleName) || {},
                    shExports = shim.exports;

                takeGlobalQueue();

                while (defQueue.length) {
                    args = defQueue.shift();
                    if (args[0] === null) {
                        args[0] = moduleName;
                        //If already found an anonymous module and bound it
                        //to this name, then this is some other anon module
                        //waiting for its completeLoad to fire.
                        if (found) {
                            break;
                        }
                        found = true;
                    } else if (args[0] === moduleName) {
                        //Found matching define call for this script!
                        found = true;
                    }

                    callGetModule(args);
                }
                context.defQueueMap = {};

                //Do this after the cycle of callGetModule in case the result
                //of those calls/init calls changes the registry.
                mod = getOwn(registry, moduleName);

                if (!found && !hasProp(defined, moduleName) && mod && !mod.inited) {
                    if (config.enforceDefine && (!shExports || !getGlobal(shExports))) {
                        if (hasPathFallback(moduleName)) {
                            return;
                        } else {
                            return onError(makeError('nodefine',
                                             'No define call for ' + moduleName,
                                             null,
                                             [moduleName]));
                        }
                    } else {
                        //A script that does not call define(), so just simulate
                        //the call for it.
                        callGetModule([moduleName, (shim.deps || []), shim.exportsFn]);
                    }
                }

                checkLoaded();
            },

            /**
             * Converts a module name to a file path. Supports cases where
             * moduleName may actually be just an URL.
             * Note that it **does not** call normalize on the moduleName,
             * it is assumed to have already been normalized. This is an
             * internal API, not a public one. Use toUrl for the public API.
             */
            nameToUrl: function (moduleName, ext, skipExt) {
                var paths, syms, i, parentModule, url,
                    parentPath, bundleId,
                    pkgMain = getOwn(config.pkgs, moduleName);

                if (pkgMain) {
                    moduleName = pkgMain;
                }

                bundleId = getOwn(bundlesMap, moduleName);

                if (bundleId) {
                    return context.nameToUrl(bundleId, ext, skipExt);
                }

                //If a colon is in the URL, it indicates a protocol is used and it is just
                //an URL to a file, or if it starts with a slash, contains a query arg (i.e. ?)
                //or ends with .js, then assume the user meant to use an url and not a module id.
                //The slash is important for protocol-less URLs as well as full paths.
                if (req.jsExtRegExp.test(moduleName)) {
                    //Just a plain path, not module name lookup, so just return it.
                    //Add extension if it is included. This is a bit wonky, only non-.js things pass
                    //an extension, this method probably needs to be reworked.
                    url = moduleName + (ext || '');
                } else {
                    //A module that needs to be converted to a path.
                    paths = config.paths;

                    syms = moduleName.split('/');
                    //For each module name segment, see if there is a path
                    //registered for it. Start with most specific name
                    //and work up from it.
                    for (i = syms.length; i > 0; i -= 1) {
                        parentModule = syms.slice(0, i).join('/');

                        parentPath = getOwn(paths, parentModule);
                        if (parentPath) {
                            //If an array, it means there are a few choices,
                            //Choose the one that is desired
                            if (isArray(parentPath)) {
                                parentPath = parentPath[0];
                            }
                            syms.splice(0, i, parentPath);
                            break;
                        }
                    }

                    //Join the path parts together, then figure out if baseUrl is needed.
                    url = syms.join('/');
                    url += (ext || (/^data\:|^blob\:|\?/.test(url) || skipExt ? '' : '.js'));
                    url = (url.charAt(0) === '/' || url.match(/^[\w\+\.\-]+:/) ? '' : config.baseUrl) + url;
                }

                return config.urlArgs && !/^blob\:/.test(url) ?
                       url + config.urlArgs(moduleName, url) : url;
            },

            //Delegates to req.load. Broken out as a separate function to
            //allow overriding in the optimizer.
            load: function (id, url) {
                req.load(context, id, url);
            },

            /**
             * Executes a module callback function. Broken out as a separate function
             * solely to allow the build system to sequence the files in the built
             * layer in the right sequence.
             *
             * @private
             */
            execCb: function (name, callback, args, exports) {
                return callback.apply(exports, args);
            },

            /**
             * callback for script loads, used to check status of loading.
             *
             * @param {Event} evt the event from the browser for the script
             * that was loaded.
             */
            onScriptLoad: function (evt) {
                //Using currentTarget instead of target for Firefox 2.0's sake. Not
                //all old browsers will be supported, but this one was easy enough
                //to support and still makes sense.
                if (evt.type === 'load' ||
                        (readyRegExp.test((evt.currentTarget || evt.srcElement).readyState))) {
                    //Reset interactive script so a script node is not held onto for
                    //to long.
                    interactiveScript = null;

                    //Pull out the name of the module and the context.
                    var data = getScriptData(evt);
                    context.completeLoad(data.id);
                }
            },

            /**
             * Callback for script errors.
             */
            onScriptError: function (evt) {
                var data = getScriptData(evt);
                if (!hasPathFallback(data.id)) {
                    var parents = [];
                    eachProp(registry, function(value, key) {
                        if (key.indexOf('_@r') !== 0) {
                            each(value.depMaps, function(depMap) {
                                if (depMap.id === data.id) {
                                    parents.push(key);
                                    return true;
                                }
                            });
                        }
                    });
                    return onError(makeError('scripterror', 'Script error for "' + data.id +
                                             (parents.length ?
                                             '", needed by: ' + parents.join(', ') :
                                             '"'), evt, [data.id]));
                }
            }
        };

        context.require = context.makeRequire();
        return context;
    }

    /**
     * Main entry point.
     *
     * If the only argument to require is a string, then the module that
     * is represented by that string is fetched for the appropriate context.
     *
     * If the first argument is an array, then it will be treated as an array
     * of dependency string names to fetch. An optional function callback can
     * be specified to execute when all of those dependencies are available.
     *
     * Make a local req variable to help Caja compliance (it assumes things
     * on a require that are not standardized), and to give a short
     * name for minification/local scope use.
     */
    req = requirejs = function (deps, callback, errback, optional) {

        //Find the right context, use default
        var context, config,
            contextName = defContextName;

        // Determine if have config object in the call.
        if (!isArray(deps) && typeof deps !== 'string') {
            // deps is a config object
            config = deps;
            if (isArray(callback)) {
                // Adjust args if there are dependencies
                deps = callback;
                callback = errback;
                errback = optional;
            } else {
                deps = [];
            }
        }

        if (config && config.context) {
            contextName = config.context;
        }

        context = getOwn(contexts, contextName);
        if (!context) {
            context = contexts[contextName] = req.s.newContext(contextName);
        }

        if (config) {
            context.configure(config);
        }

        return context.require(deps, callback, errback);
    };

    /**
     * Support require.config() to make it easier to cooperate with other
     * AMD loaders on globally agreed names.
     */
    req.config = function (config) {
        return req(config);
    };

    /**
     * Execute something after the current tick
     * of the event loop. Override for other envs
     * that have a better solution than setTimeout.
     * @param  {Function} fn function to execute later.
     */
    req.nextTick = typeof setTimeout !== 'undefined' ? function (fn) {
        setTimeout(fn, 4);
    } : function (fn) { fn(); };

    /**
     * Export require as a global, but only if it does not already exist.
     */
    if (!require) {
        require = req;
    }

    req.version = version;

    //Used to filter out dependencies that are already paths.
    req.jsExtRegExp = /^\/|:|\?|\.js$/;
    req.isBrowser = isBrowser;
    s = req.s = {
        contexts: contexts,
        newContext: newContext
    };

    //Create default context.
    req({});

    //Exports some context-sensitive methods on global require.
    each([
        'toUrl',
        'undef',
        'defined',
        'specified'
    ], function (prop) {
        //Reference from contexts instead of early binding to default context,
        //so that during builds, the latest instance of the default context
        //with its config gets used.
        req[prop] = function () {
            var ctx = contexts[defContextName];
            return ctx.require[prop].apply(ctx, arguments);
        };
    });

    if (isBrowser) {
        head = s.head = document.getElementsByTagName('head')[0];
        //If BASE tag is in play, using appendChild is a problem for IE6.
        //When that browser dies, this can be removed. Details in this jQuery bug:
        //http://dev.jquery.com/ticket/2709
        baseElement = document.getElementsByTagName('base')[0];
        if (baseElement) {
            head = s.head = baseElement.parentNode;
        }
    }

    /**
     * Any errors that require explicitly generates will be passed to this
     * function. Intercept/override it if you want custom error handling.
     * @param {Error} err the error object.
     */
    req.onError = defaultOnError;

    /**
     * Creates the node for the load command. Only used in browser envs.
     */
    req.createNode = function (config, moduleName, url) {
        var node = config.xhtml ?
                document.createElementNS('http://www.w3.org/1999/xhtml', 'html:script') :
                document.createElement('script');
        node.type = config.scriptType || 'text/javascript';
        node.charset = 'utf-8';
        node.async = true;
        return node;
    };

    /**
     * Does the request to load a module for the browser case.
     * Make this a separate function to allow other environments
     * to override it.
     *
     * @param {Object} context the require context to find state.
     * @param {String} moduleName the name of the module.
     * @param {Object} url the URL to the module.
     */
    req.load = function (context, moduleName, url) {
        var config = (context && context.config) || {},
            node;
        if (isBrowser) {
            //In the browser so use a script tag
            node = req.createNode(config, moduleName, url);

            node.setAttribute('data-requirecontext', context.contextName);
            node.setAttribute('data-requiremodule', moduleName);

            //Set up load listener. Test attachEvent first because IE9 has
            //a subtle issue in its addEventListener and script onload firings
            //that do not match the behavior of all other browsers with
            //addEventListener support, which fire the onload event for a
            //script right after the script execution. See:
            //https://connect.microsoft.com/IE/feedback/details/648057/script-onload-event-is-not-fired-immediately-after-script-execution
            //UNFORTUNATELY Opera implements attachEvent but does not follow the script
            //script execution mode.
            if (node.attachEvent &&
                    //Check if node.attachEvent is artificially added by custom script or
                    //natively supported by browser
                    //read https://github.com/requirejs/requirejs/issues/187
                    //if we can NOT find [native code] then it must NOT natively supported.
                    //in IE8, node.attachEvent does not have toString()
                    //Note the test for "[native code" with no closing brace, see:
                    //https://github.com/requirejs/requirejs/issues/273
                    !(node.attachEvent.toString && node.attachEvent.toString().indexOf('[native code') < 0) &&
                    !isOpera) {
                //Probably IE. IE (at least 6-8) do not fire
                //script onload right after executing the script, so
                //we cannot tie the anonymous define call to a name.
                //However, IE reports the script as being in 'interactive'
                //readyState at the time of the define call.
                useInteractive = true;

                node.attachEvent('onreadystatechange', context.onScriptLoad);
                //It would be great to add an error handler here to catch
                //404s in IE9+. However, onreadystatechange will fire before
                //the error handler, so that does not help. If addEventListener
                //is used, then IE will fire error before load, but we cannot
                //use that pathway given the connect.microsoft.com issue
                //mentioned above about not doing the 'script execute,
                //then fire the script load event listener before execute
                //next script' that other browsers do.
                //Best hope: IE10 fixes the issues,
                //and then destroys all installs of IE 6-9.
                //node.attachEvent('onerror', context.onScriptError);
            } else {
                node.addEventListener('load', context.onScriptLoad, false);
                node.addEventListener('error', context.onScriptError, false);
            }
            node.src = url;

            //Calling onNodeCreated after all properties on the node have been
            //set, but before it is placed in the DOM.
            if (config.onNodeCreated) {
                config.onNodeCreated(node, config, moduleName, url);
            }

            //For some cache cases in IE 6-8, the script executes before the end
            //of the appendChild execution, so to tie an anonymous define
            //call to the module name (which is stored on the node), hold on
            //to a reference to this node, but clear after the DOM insertion.
            currentlyAddingScript = node;
            if (baseElement) {
                head.insertBefore(node, baseElement);
            } else {
                head.appendChild(node);
            }
            currentlyAddingScript = null;

            return node;
        } else if (isWebWorker) {
            try {
                //In a web worker, use importScripts. This is not a very
                //efficient use of importScripts, importScripts will block until
                //its script is downloaded and evaluated. However, if web workers
                //are in play, the expectation is that a build has been done so
                //that only one script needs to be loaded anyway. This may need
                //to be reevaluated if other use cases become common.

                // Post a task to the event loop to work around a bug in WebKit
                // where the worker gets garbage-collected after calling
                // importScripts(): https://webkit.org/b/153317
                setTimeout(function() {}, 0);
                importScripts(url);

                //Account for anonymous modules
                context.completeLoad(moduleName);
            } catch (e) {
                context.onError(makeError('importscripts',
                                'importScripts failed for ' +
                                    moduleName + ' at ' + url,
                                e,
                                [moduleName]));
            }
        }
    };

    function getInteractiveScript() {
        if (interactiveScript && interactiveScript.readyState === 'interactive') {
            return interactiveScript;
        }

        eachReverse(scripts(), function (script) {
            if (script.readyState === 'interactive') {
                return (interactiveScript = script);
            }
        });
        return interactiveScript;
    }

    //Look for a data-main script attribute, which could also adjust the baseUrl.
    if (isBrowser && !cfg.skipDataMain) {
        //Figure out baseUrl. Get it from the script tag with require.js in it.
        eachReverse(scripts(), function (script) {
            //Set the 'head' where we can append children by
            //using the script's parent.
            if (!head) {
                head = script.parentNode;
            }

            //Look for a data-main attribute to set main script for the page
            //to load. If it is there, the path to data main becomes the
            //baseUrl, if it is not already set.
            dataMain = script.getAttribute('data-main');
            if (dataMain) {
                //Preserve dataMain in case it is a path (i.e. contains '?')
                mainScript = dataMain;

                //Set final baseUrl if there is not already an explicit one,
                //but only do so if the data-main value is not a loader plugin
                //module ID.
                if (!cfg.baseUrl && mainScript.indexOf('!') === -1) {
                    //Pull off the directory of data-main for use as the
                    //baseUrl.
                    src = mainScript.split('/');
                    mainScript = src.pop();
                    subPath = src.length ? src.join('/')  + '/' : './';

                    cfg.baseUrl = subPath;
                }

                //Strip off any trailing .js since mainScript is now
                //like a module name.
                mainScript = mainScript.replace(jsSuffixRegExp, '');

                //If mainScript is still a path, fall back to dataMain
                if (req.jsExtRegExp.test(mainScript)) {
                    mainScript = dataMain;
                }

                //Put the data-main script in the files to load.
                cfg.deps = cfg.deps ? cfg.deps.concat(mainScript) : [mainScript];

                return true;
            }
        });
    }

    /**
     * The function that handles definitions of modules. Differs from
     * require() in that a string for the module should be the first argument,
     * and the function to execute after dependencies are loaded should
     * return a value to define the module corresponding to the first argument's
     * name.
     */
    define = function (name, deps, callback) {
        var node, context;

        //Allow for anonymous modules
        if (typeof name !== 'string') {
            //Adjust args appropriately
            callback = deps;
            deps = name;
            name = null;
        }

        //This module may not have dependencies
        if (!isArray(deps)) {
            callback = deps;
            deps = null;
        }

        //If no name, and callback is a function, then figure out if it a
        //CommonJS thing with dependencies.
        if (!deps && isFunction(callback)) {
            deps = [];
            //Remove comments from the callback string,
            //look for require calls, and pull them into the dependencies,
            //but only if there are function args.
            if (callback.length) {
                callback
                    .toString()
                    .replace(commentRegExp, commentReplace)
                    .replace(cjsRequireRegExp, function (match, dep) {
                        deps.push(dep);
                    });

                //May be a CommonJS thing even without require calls, but still
                //could use exports, and module. Avoid doing exports and module
                //work though if it just needs require.
                //REQUIRES the function to expect the CommonJS variables in the
                //order listed below.
                deps = (callback.length === 1 ? ['require'] : ['require', 'exports', 'module']).concat(deps);
            }
        }

        //If in IE 6-8 and hit an anonymous define() call, do the interactive
        //work.
        if (useInteractive) {
            node = currentlyAddingScript || getInteractiveScript();
            if (node) {
                if (!name) {
                    name = node.getAttribute('data-requiremodule');
                }
                context = contexts[node.getAttribute('data-requirecontext')];
            }
        }

        //Always save off evaluating the def call until the script onload handler.
        //This allows multiple modules to be in a file without prematurely
        //tracing dependencies, and allows for anonymous module support,
        //where the module name is not known until the script onload event
        //occurs. If no context, use the global queue, and get it processed
        //in the onscript load callback.
        if (context) {
            context.defQueue.push([name, deps, callback]);
            context.defQueueMap[name] = true;
        } else {
            globalDefQueue.push([name, deps, callback]);
        }
    };

    define.amd = {
        jQuery: true
    };

    /**
     * Executes the text. Normally just uses eval, but can be modified
     * to use a better, environment-specific call. Only used for transpiling
     * loader plugins, not for plain JS modules.
     * @param {String} text the text to execute/evaluate.
     */
    req.exec = function (text) {
        /*jslint evil: true */
        return eval(text);
    };

    //Set up with config info.
    req(cfg);
}(this, (typeof setTimeout === 'undefined' ? undefined : setTimeout)));
;;require(['config'],function(){
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
});