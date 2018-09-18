
//引入模块
require(['config'],function(){
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
})